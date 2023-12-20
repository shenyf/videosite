import request from '@/utils/request'
import { ACCESS_TOKEN } from '@/store/mutation-types'
// import baseURL from '@/utils/baseUrl'

export function getIdentity () {
  return request({
    url: `/user/identity`,
    method: 'get'
  }).then(r => {
    // r.result = Object.assign({}, defaultUser, r.result)
    return r
  })
}

export function login(params){
  return request({
    url: `/user/login`,
    method: 'post',
    data: params
  })
}

export function logout () {
  return request({
    url: `/logout`,
    method: 'get'
  })
}
