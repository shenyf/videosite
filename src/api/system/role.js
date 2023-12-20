import request from '@/utils/request'

export function listRoles() {
  return request({
    url: `/system/roles`,
    method: 'get'
  })
}
