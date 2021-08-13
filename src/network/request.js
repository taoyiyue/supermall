import axios from 'axios'

export function request(config) {

  // 1.创建 axios 实例
  const instance = axios.create({
    baseURL: 'http://152.136.185.210:7878/api/m5',
    timeout: 5000
  })

  // 请求拦截器
  instance.interceptors.request.use(res => {
    return res
  }, err => {
    console.log(err);
  })
  // 响应拦截
  instance.interceptors.response.use(res => {
    return res.data
  }, err => {
    console.log(err);
    
  })


  //  3.发送真正的网络请求
  return instance(config) // 本身返回的就是 Promise 所以不需要 Promise

}



















// export function request(config) {
//  return new Promise((resolve,reject)=>{
//     // 1.创建 axios 实例
//   const instance = axios.create({
//     baseURL: 'http://123.207.32.32:8000',
//     timeout: 5000
//   })

//   instance(config).then( res => {
//     resolve(res)

//   }).catch(err => {
//     reject(err)
//   })
//  })
// }



// export function request(config) {
//   // 1.创建 axios 实例
//   const instance = axios.create({
//     baseURL: 'http://123.207.32.32:8000',
//     timeout: 5000
//   })

//   instance(config.baseconfig).then( res => {
//     config.success(res)

//   }).catch(err => {
//     console.log(err);
//     config.failure(err)
//   })
// }


// export function request(config, success, failure) {
//   // 1.创建 axios 实例
//   const instance = axios.create({
//     baseURL: 'http://123.207.32.32:8000',
//     timeout: 5000
//   })

//   instance(config).then( a => {
//     success(a)

//   }).catch(err => {
//     console.log(err);
//     failure(err)
//   })
// }
