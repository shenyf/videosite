import request from '@/utils/request'

export const STANDARD_SPEED_UNITS = {
  'MINUTE': '分钟',
  'METER_PER_MINUTE': '米/分钟'
}

export const STANDARD_SPEED_UNITS_OPTIONS = Object.entries(STANDARD_SPEED_UNITS).map(([key,value])=> {return {value: key, label: value}})

export function pageProcesses (query) {
  return request({
    url: `/system/processes/page`,
    data: query,
    method: 'post'
  })
}

export function listProcesses(query) {
  return request({
    url: `/system/processes/list`,
    data: query,
    method: 'post'
  })
}
export function removeProcess(id){
  return request({
    url: `/system/processes/${id}`,
    method: 'delete'
  })
}

export function removeProcesses(ids){
  return request({
    url: `/system/processes`,
    data: ids,
    method: 'delete'
  })
}

export function getProcess(id){
  return request({
    url: `/system/processes/${id}`,
    method: 'get'
  })
}

export function updateProcess(id, process){
  return request({
    url: `/system/processes/${id}`,
    data: process,
    method: 'put'
  })
}

export function createProcess(process){
  return request({
    url: `/system/processes`,
    data: process,
    method: 'post'
  })
}
