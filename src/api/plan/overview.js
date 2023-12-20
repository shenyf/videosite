import request from '@/utils/request'

export function list(query) {
  return request({
    url: `/plan/overview/list`,
    params: query,
    method: 'get'
  })
}
