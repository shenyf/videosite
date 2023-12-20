import request from '@/utils/request'

export function pageColors (query) {
  return request({
    url: `/system/colors/page`,
    data: query,
    method: 'post'
  })
}

export function listColors(query) {
  return request({
    url: `/system/colors/list`,
    data: query,
    method: 'post'
  })
}
export function removeColor(id){
  return request({
    url: `/system/colors/${id}`,
    method: 'delete'
  })
}

export function removeColors(ids){
  return request({
    url: `/system/colors`,
    data: ids,
    method: 'delete'
  })
}

export function getColor(id){
  return request({
    url: `/system/colors/${id}`,
    method: 'get'
  })
}

export function updateColor(id, color){
  return request({
    url: `/system/colors/${id}`,
    data: color,
    method: 'put'
  })
}

export function createColor(color){
  return request({
    url: `/system/colors`,
    data: color,
    method: 'post'
  })
}
