import verifyResData from './verify.js'
// import store from '@/store/index.js'


export const oldapiPrefix = 'http://114.55.11.139:1217'
export const apiPrefix = 'http://114.55.11.139:1217'
// export const apiPrefix = 'http://139.196.158.18:8901'
// export const oldapiPrefix = 'http://139.196.158.18:8901'

let apiConfigs = {
    ListOrder:{
        rpcmethod: 'ListOrder',
        oldBlock: false
    },
}

/**
 * reject common api config for iFetch
 *
 * @param {Object} config
 * @returns
 */
function rejectRpcRequestConfig(config = {}) {
    // console.log('进入rejectRpcRequestConfig')
    // if (config.mockOn && !config.mockDataPath) {
    //   // the path should be relative to the iFetch.js file or absolute
    //   config.mockDataPath = `./apiConfig/chain33/debugdata/${config.mockFileName || config.rpcmethod}.js`
    // }
    // console.log('323232')
    // console.log(config)
    // console.log({
    //     url: (config.oldBlock&&config.oldBlock === true) ? `${oldapiPrefix}` : `${apiPrefix}`,
    //     dealReqData: rejectRpcRequestBody.bind(config),
    //     verifyResData: verifyResData,
    //     ...config
    // })
    return {
        url: (config.oldBlock&&config.oldBlock === true) ? `${oldapiPrefix}` : `${apiPrefix}`,
        dealReqData: rejectRpcRequestBody.bind(config),
        verifyResData: verifyResData,
        ...config
    }
}

/**
 * reject common params in http request body
 *
 * @param {Object} postdata
 * @returns
 */
function rejectRpcRequestBody(postdata = {}) {
    // 'this' is reject from single config
    const rpcmethod = this.rpcmethod
    // console.log('+++++++++++')
    // console.log({
    //     id: +new Date(),
    //     jsonrpc: '2.0',
    //     method: `Chain33.${rpcmethod}`,
    //     params: [],
    //     ...postdata
    // })
    return {
        id: +new Date(),
        jsonrpc: '2.0',
        // method: `Chain33.${rpcmethod}`,
        method: `Trade.${rpcmethod}`,
        params: [],
        ...postdata
    }
}

/*
* reject then export
* */
for (const key in apiConfigs) {
    apiConfigs[key] = rejectRpcRequestConfig(apiConfigs[key])
    // console.log(apiConfigs[key])
    // console.log('-=-=-')
}

export default apiConfigs