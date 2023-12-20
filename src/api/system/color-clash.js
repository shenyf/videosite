import request from '@/utils/request'

export function listRules() {
  return request({
    url: `/system/color-clashes/list`,
    method: 'get'
  })
}

export function saveRule(data){
  return request({
    url: `/system/color-clashes`,
    data: data,
    method: 'put'
  })
}
