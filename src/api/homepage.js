import request from '@/utils/request'
export function listLessons(query) {
  return request({
    url: `/homepage/lessons`,
    data: query,
    method: 'post'
  })
}
