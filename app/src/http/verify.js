/*
* 验证约定的后端返回代码
*/
import * as Sentry from '@sentry/browser'
const SUCCESS_CODE = null

export default (body, success, error, dealResData, alertServerErrMsg, api) => {
  if (body.error === SUCCESS_CODE || body.error === "ErrNotFound") {
    let data = body.result
    if (dealResData) {
      data = dealResData(data)
    }
    success && success(data)
  } else if (error) {
    Sentry.captureMessage('url:',api, 'error:', body.error)
    error(body)
  } else {
    Sentry.captureMessage('url:',api, 'error:', body.error)
    alertServerErrMsg(body.error)
  }
  return null
}