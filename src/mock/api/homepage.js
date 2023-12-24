import Mock from 'mockjs2'
import { builder,handlePage, handleList, handleDelete, handleBatchDelete, handleGet, handleUpdate, handleCreate } from '../util'

const courses = [{
  id: 1,
  name: '深度强化学习',
  subjectId: 1,
  subject: {
    id: 1,
    name: '人工智能',
  },
  categoryId: 1,
  category: {
    id: 1,
    name: '基础'
  },
  coverPictureUrl: 'https://i0.hdslb.com/bfs/archive/8cca6513ddd64e0a6415ed615a519f7b80e3b1a3.jpg@672w_378h_1c_!web-search-common-cover.avif',
}]
const coursesRes = (options)=>{
  const request = JSON.parse(options.body)
  const filter = (request && request.conditions && request.conditions.searchText!==undefined && request.conditions.searchText!=='') ? item=>item.name.indexOf(request.conditions.searchText)!=-1 || item.code.indexOf(request.conditions.searchText)!=-1 : null
  return handleList(options, courses, request, filter)
}


Mock.mock(/\/api\/homepage\/courses/, 'post', coursesRes)
