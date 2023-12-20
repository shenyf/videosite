import axios from 'axios'
import store from '@/store'
import { Notify } from 'quasar'
import { VueAxios } from './axios'
import { ACCESS_TOKEN } from '@/store/mutation-types'
// import { getBaseUrl } from '@/utils/baseUrl'
import moment from 'moment'
import { sleep } from '@/utils/util'

// const myBaseUrl = getBaseUrl()

// 创建 axios 实例
const request = axios.create({
  // API 请求的默认前缀
  baseURL: `${process.env.API}`,
  timeout: 15000 // 请求超时时间
})

request.interceptors.request.use(function (config) {
  // console.log('serverRequest-begin', config)
  let dataType = null
  if (config.params) {
    dataType = config.params.dataType
    delete config.params.dataType
  }
  // 在发送请求之前做些什么
  if (config.data && dataType === 'form') {
    const params = new URLSearchParams()
    for (var p in config.data) {
      params.append(p, config.data[p])
    }
    config.data = params
  } else if (config.data && dataType === 'file') {
    config.headers['Content-Type'] = 'multipart/form-data'
    console.log('request===', config.headers['Content-Type'])
    // config.contentType =
  } else {
    if (config.data instanceof URLSearchParams) {
      return config
    }
    if (config.data) {
      if (config.data instanceof Array) {
      } else {
        config.data = Object.assign({}, config.data)
        Object.keys(config.data).forEach(r => {
          let prop = config.data[r]
          if (r.endsWith('Date') && prop && prop !== '') {
            if (!(prop instanceof moment)) {
              prop = moment(prop)
            }
          }
          if (prop instanceof moment) {
            config.data[r] = prop.format('YYYY-MM-DD HH:mm:ss')
          }
          if (prop instanceof Object) {
            if (Object.keys(prop).length === 0) {
              delete config.data[r]
              prop = null
            }
          }
        })
      }
    }
  }
  // console.log('serverRequest-end', config)
  return config
}, function (error) {
  // 对请求错误做些什么
  return Promise.reject(error)
})

// 异常拦截处理器
const errorHandler = (error) => {
  console.log('serverRequest-errorHandler:', error)
  if (error.response) {
    const data = error.response.data
    // 从 localstorage 获取 token
    const token = sessionStorage.getItem(ACCESS_TOKEN)
    if (error.response.status === 403) {
      Notify.create({
        type: 'negative',
        //caption: 'Forbidden',
        message: data.message
      })
    }
    if (error.response.status === 401 && !(data.result && data.result.isLogin)) {
      Notify.create({
        type: 'negative',
        //caption: '未授权',
        message: data.message
      })
      if (token) {
        sleep(100).then(() => {
          store.dispatch('Logout').then(() => {
            setTimeout(() => {
              window.location.reload()
            }, 500)
          })
        })
      }
    }
  }
  return Promise.reject(error)
}

// request interceptor
request.interceptors.request.use(config => {
  const token = sessionStorage.getItem(ACCESS_TOKEN)
  // 如果 token 存在
  // 让每个请求携带自定义 token 请根据实际情况自行修改
  if (token) {
    config.headers['Access-Token'] = token
  }
  return config
}, errorHandler)

// response interceptor
request.interceptors.response.use((response) => {
  return response.data
}, errorHandler)

const installer = {
  vm: {},
  install (Vue) {
    Vue.use(VueAxios, request)
  }
}

export default request

export {
  installer as VueAxios,
  request as axios
}
