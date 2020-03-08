import Vue from 'vue'
// import store from '@/store/index.js'
import IFetch from './iFetch'
import apiConfig from './apiConfig.js'
// console.log('apiConfig')
// console.log(apiConfig)
// apiConfig.url='http://172.16.103.19:9901'
const myfetch = new IFetch(apiConfig,Vue.prototype.$serverErrNotify)

export default myfetch