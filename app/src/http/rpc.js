import myFetch from './myfetch.js'
const url = 'http://114.55.11.139:1217'
// const url = 'http://139.196.158.18:8901'


function normal(apiName,execer,actionName,payload){
    // let param = {
    //     id:+new Date(),
    //     jsonrpc: '2.0',
    //     method: `Chain33.${apiName}`,
    //     params:[
    //         {
    //             'execer':execer,
    //             'actionName':actionName,
    //             'payload':payload
    //         }
    //     ]
    // }
    // console.log(param)
    return new Promise((resolve,reject)=>{
        myFetch({
            url,
            apiName,
            postdata:{
                params:[{
                    'execer':execer,
                    'funcName':actionName,
                    'payload':payload
                }]
            },
            success: (res) => {
                // console.log('getLotteryRecords res111')
                // console.log(res)
                resolve(res)
            },
            error: (err) => {
                reject(err)
            },
            complete: () => {
                // this.resultloading = false
                // if (this.moreLoading) {
                //   this.moreLoading = false
                // }
            }
        })
    })
}
function normal1(apiName,execer,actionName,payload){
    // let param = {
    //     id:+new Date(),
    //     jsonrpc: '2.0',
    //     method: `Chain33.${apiName}`,
    //     params:[
    //         {
    //             'execer':execer,
    //             'actionName':actionName,
    //             'payload':payload
    //         }
    //     ]
    // }
    // console.log(param)
    return new Promise((resolve,reject)=>{
        myFetch({
            url,
            apiName,
            postdata:{
                params:[{
                    'execer':execer,
                    'actionName':actionName,
                    'payload':payload
                }]
            },
            success: (res) => {
                // console.log('getLotteryRecords res111')
                // console.log(res)
                resolve(res)
            },
            error: (err) => {
                reject(err)
            },
            complete: () => {
                // this.resultloading = false
                // if (this.moreLoading) {
                //   this.moreLoading = false
                // }
            }
        })
    })
}
function tttt(apiName,payload){
    return new Promise((resolve,reject)=>{
        myFetch({
            // url:'http://139.196.158.18:9991/user.p.testuwallet.',
            url:'https://biqianbao.net/dyd/externaldb/user.p.testuwallet.',
            // url:'http://114.55.11.139:1243/user.p.collateralize.',
            apiName,
            postdata:{
                params:[payload]
            },
            success: (res) => {
                // console.log('getLotteryRecords res111')
                // console.log(res)
                resolve(res)
            },
            error: (err) => {
                reject(err)
            },
            complete: () => {
                // this.resultloading = false
                // if (this.moreLoading) {
                //   this.moreLoading = false
                // }
            }
        })
    })
}

// 查询trade合约上挂单
export const ListOrder = (payload)=>{
    return tttt('ListOrder',payload)
}