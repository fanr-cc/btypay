/*
 * A simple wrap of native fetch
 * */
import * as Sentry from '@sentry/browser'
import 'whatwg-fetch'
// if ( !window.fetch ) {
  // window.fetch = require('whatwg-fetch').default
// }

class IFetch {
  constructor (apiConfig, alertServerErrMsg, injectAuth) {
    if (!apiConfig) {
      throw new Error('apiConfig is required, please refer to the apiConfig folder')
    }
    this.apiConfig = apiConfig
    // console.log('=============')
    // console.log(apiConfig)
    // console.log('=============')
    if (!alertServerErrMsg) {
      console.info('better alert better experience~')
      alertServerErrMsg = window.alert
    }

    if (injectAuth) {
      this.injectAuth = injectAuth
    }

    this.alertServerErrMsg = alertServerErrMsg

    return this.doFetch.bind(this)
  }

  parseJSON (response) {
    return response.json()
  }

  checkStatus (response) {
    if (response.status >= 200 && response.status < 300) {
      return response
    } else {
      var error = new Error(response.statusText)
      error.response = response
      throw error
    }
  }

  doFetch (config = {}) {
    // reject all the default config
    if (config.apiName && this.apiConfig[config.apiName]) {
      config = { ...this.apiConfig[config.apiName], ...config }
    }
    // console.log('---------------------------')
    // console.log(config)
    // console.log(this.apiConfig)
    // console.log('---------------------------')
    const { success,
      error,
      failed,
      complete,
      httpHeaders = {},
      method,
      dealReqUrl,
      dealReqData,
      dealReqConfig,
      dealResData,
      mockOn,
      mockDataPath,
      notNeedAuth,
      notNeedVerify,
      verifyResData
    } = config
    let { url, postdata } = config

    if (mockOn) {
      if (!mockDataPath) throw new Error('mockOn need a mockDataPath!')
      try {
        let res = require(`./mock/${mockDataPath}`)
        res = res.default.data
        setTimeout(() => {
          if (notNeedVerify) {
            success && success(res)
          } else {
            verifyResData(res, success, error, dealResData, this.alertServerErrMsg)
          }
        }, 300)
      } catch (error) {
        if (failed) {
          failed(error)
        } else {
          throw error
        }
      }
      complete && complete()
      return
    }
    if (!url) {
      return console.error('please set request url or apiName')
    }

    if (dealReqUrl) {
      url = dealReqUrl(url, postdata)
    }

    if (dealReqData) {
      // console.log('[[[[[[[[[[[[[dealReqData]]]]]]]]]]]]]]]]]]]]]]]]]]]]')
      postdata = dealReqData(postdata)
      // console.log(postdata)
    }

    if (method === 'GET' && postdata) {
      let queryArr = []
      Object.keys(postdata).forEach(q => queryArr.push(`${q}=${postdata[q]}`))
      url = `${url}?${queryArr.join('&')}`
      postdata = false
    }

    let requestConfig = {
      method: method || 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        ...httpHeaders
      },
      redirect: 'follow'
    }

    if (!notNeedAuth && this.injectAuth) {
      requestConfig = this.injectAuth(requestConfig)
    }

    if (dealReqConfig) {
      requestConfig = dealReqConfig(requestConfig)
    }

    if (postdata) {
      if (requestConfig.headers['Content-Type'] && /json/.test(requestConfig.headers['Content-Type'])) {
        requestConfig['body'] = JSON.stringify(postdata)
      } else {
        requestConfig['body'] = postdata
      }
    }
    let r = fetch(url, requestConfig).then(this.checkStatus)
      .then(this.parseJSON)
      .then((data) => {
        complete && complete()
        if (notNeedVerify) {
          dealResData && dealResData(data)
          success && success(data)
          return null
        } else {
          return verifyResData(data, success, error, dealResData, this.alertServerErrMsg, url)
        }
      })
      .catch(e => {
        console.log(e, 'catch error!')
        Sentry.captureMessage('url:',url, 'error:', e.message)
        complete && complete()
        if (failed) {
          failed(e)
        } else {
          this.alertServerErrMsg(e.message)
        }
      })

    return r
  }
}

export default IFetch
