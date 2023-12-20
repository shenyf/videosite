import request from '@/utils/request'

export function pageUsers (query) {
  return request({
    url: `/system/users/page`,
    data: query,
    method: 'post'
  })
}
export function removeUser(id){
  return request({
    url: `/system/users/${id}`,
    method: 'delete'
  })
}

export function removeUsers(ids){
  return request({
    url: `/system/users`,
    data: ids,
    method: 'delete'
  })
}

export function getUser(id){
  return request({
    url: `/system/users/${id}`,
    method: 'get'
  })
}

export function updateUser(id, user){
  return request({
    url: `/system/users/${id}`,
    data: user,
    method: 'put'
  })
}

export function updateUserPassword(id, password){
  return request({
    url: `/system/users/${id}/password`,
    data: {password: password},
    method: 'put'
  })
}

export function updateUserAuth(id, auth){
  return request({
    url: `/system/users/${id}/auth`,
    data: auth,
    method: 'put'
  })
}

export function createUser(user){
  return request({
    url: `/system/users`,
    data: user,
    method: 'post'
  })
}
