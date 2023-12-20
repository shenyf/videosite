import request from '@/utils/request'

export function pageFlowes (query) {
  return request({
    url: `/system/flowes/page`,
    data: query,
    method: 'post'
  })
}
export function removeFlow(id){
  return request({
    url: `/system/flowes/${id}`,
    method: 'delete'
  })
}

export function removeFlowes(ids){
  return request({
    url: `/system/flowes`,
    data: ids,
    method: 'delete'
  })
}

export function getFlow(id){
  return request({
    url: `/system/flowes/${id}`,
    method: 'get'
  })
}

export function updateFlow(id, flow){
  return request({
    url: `/system/flowes/${id}`,
    data: flow,
    method: 'put'
  })
}

export function createFlow(flow){
  return request({
    url: `/system/flowes`,
    data: flow,
    method: 'post'
  })
}
