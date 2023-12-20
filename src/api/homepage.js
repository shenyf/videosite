import request from '@/utils/request'
export function listSubjects(query) {
  return request({
    url: `/homepage/subjects`,
    data: query,
    method: 'post'
  })
}
