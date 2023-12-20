import request from '@/utils/request'

export function pageDevices (query) {
  return request({
    url: `/system/machines/page`,
    data: query,
    method: 'post'
  })
}

export function listDevices(query) {
  return request({
    url: `/system/machines/list`,
    data: query,
    method: 'post'
  })
}
export function removeDevice(id){
  return request({
    url: `/system/machines/${id}`,
    method: 'delete'
  })
}

export function removeDevices(ids){
  return request({
    url: `/system/machines`,
    data: ids,
    method: 'delete'
  })
}

export function getDevice(id){
  return request({
    url: `/system/machines/${id}`,
    method: 'get'
  })
}

export function updateDevice(id, machine){
  return request({
    url: `/system/machines/${id}`,
    data: machine,
    method: 'put'
  })
}

export function createDevice(machine){
  return request({
    url: `/system/machines`,
    data: machine,
    method: 'post'
  })
}
