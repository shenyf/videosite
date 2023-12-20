import request from '@/utils/request'

export const STATUS = {
  PENDING: {
    text: '待定',
    color: 'warning',
  },
  ADOPTED: {
    text: '已采用',
    color: 'green'
  },
  DISCARDED: {
    text: '未采用',
    color: 'grey'
  }
}

export function pageSchemes (query) {
  return request({
    url: `/plan/schemes/page`,
    data: query,
    method: 'post'
  })
}

export function listSchemes(query) {
  return request({
    url: `/plan/schemes/list`,
    data: query,
    method: 'post'
  })
}
export function removeScheme(id){
  return request({
    url: `/plan/schemes/${id}`,
    method: 'delete'
  })
}

export function removeSchemes(ids){
  return request({
    url: `/plan/schemes`,
    data: ids,
    method: 'delete'
  })
}

export function getScheme(id){
  return request({
    url: `/plan/schemes/${id}`,
    method: 'get'
  })
}

export function updateScheme(id, scheme){
  return request({
    url: `/plan/schemes/${id}`,
    data: scheme,
    method: 'put'
  })
}

export function createScheme(scheme){
  return request({
    url: `/plan/schemes`,
    data: scheme,
    method: 'post'
  })
}

export function applyScheme(scheme){
  return request({
    url: `/plan/schemes/${id}/apply`,
    method: 'put'
  })
}
