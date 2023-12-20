import request from '@/utils/request'

export const STATUS = {
  GENERATING: {
    text: '生成中',
    color: 'warning',
  },
  PENDING: {
    text: '待应用',
    color: 'blue',
  },
  APPLIED: {
    text: '已应用',
    color: 'green'
  },
  EXPIRED: {
    text: '已失效',
    color: 'grey',
  }
}

export function pageBuilds (query) {
  return request({
    url: `/plan/builds/page`,
    data: query,
    method: 'post'
  })
}

export function listBuilds(query) {
  return request({
    url: `/plan/builds/list`,
    data: query,
    method: 'post'
  })
}
export function removeBuild(id){
  return request({
    url: `/plan/builds/${id}`,
    method: 'delete'
  })
}

export function removeBuilds(ids){
  return request({
    url: `/plan/builds`,
    data: ids,
    method: 'delete'
  })
}

export function getBuild(id){
  return request({
    url: `/plan/builds/${id}`,
    method: 'get'
  })
}

export function updateBuild(id, build){
  return request({
    url: `/plan/builds/${id}`,
    data: build,
    method: 'put'
  })
}

export function createBuild(build){
  return request({
    url: `/plan/builds`,
    data: build,
    method: 'post'
  })
}
