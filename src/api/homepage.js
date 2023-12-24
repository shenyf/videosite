import request from '@/utils/request'
export function listCourses(query) {
  return request({
    url: `/homepage/courses`,
    data: query,
    method: 'post'
  })
}
