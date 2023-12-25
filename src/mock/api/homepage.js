import Mock from 'mockjs2'
import { builder,handlePage, handleList, handleDelete, handleBatchDelete, handleGet, handleUpdate, handleCreate } from '../util'

const lessons = [{
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
    name: '初级'
  },
  lessons: 10,
  watchers: 100,
  coverPictureUrl: 'https://i0.hdslb.com/bfs/archive/8cca6513ddd64e0a6415ed615a519f7b80e3b1a3.jpg@672w_378h_1c_!web-search-common-cover.avif',
}, {
  id: 2,
  name: '深度强化学习',
  subjectId: 1,
  subject: {
    id: 1,
    name: '人工智能',
  },
  categoryId: 2,
  category: {
    id: 2,
    name: '中级'
  },
  lessons: 10,
  watchers: 100,
  coverPictureUrl: 'https://i0.hdslb.com/bfs/archive/8cca6513ddd64e0a6415ed615a519f7b80e3b1a3.jpg@672w_378h_1c_!web-search-common-cover.avif',
}, {
  id: 3,
  name: '深度强化学习',
  subjectId: 1,
  subject: {
    id: 1,
    name: '人工智能',
  },
  categoryId: 3,
  category: {
    id: 3,
    name: '高级'
  },
  lessons: 10,
  watchers: 100,
  coverPictureUrl: 'https://i0.hdslb.com/bfs/archive/8cca6513ddd64e0a6415ed615a519f7b80e3b1a3.jpg@672w_378h_1c_!web-search-common-cover.avif',
}, {
  id: 4,
  name: '深度强化学习',
  subjectId: 1,
  subject: {
    id: 1,
    name: '人工智能',
  },
  categoryId: 1,
  category: {
    id: 1,
    name: '初级'
  },
  lessons: 10,
  watchers: 100,
  coverPictureUrl: 'https://i0.hdslb.com/bfs/archive/8cca6513ddd64e0a6415ed615a519f7b80e3b1a3.jpg@672w_378h_1c_!web-search-common-cover.avif',
}, {
  id: 5,
  name: '深度强化学习',
  subjectId: 1,
  subject: {
    id: 1,
    name: '人工智能',
  },
  categoryId: 3,
  category: {
    id: 3,
    name: '高级'
  },
  lessons: 10,
  watchers: 100,
  coverPictureUrl: 'https://i0.hdslb.com/bfs/archive/8cca6513ddd64e0a6415ed615a519f7b80e3b1a3.jpg@672w_378h_1c_!web-search-common-cover.avif',
}, {
  id: 6,
  name: '深度强化学习',
  subjectId: 1,
  subject: {
    id: 1,
    name: '人工智能',
  },
  categoryId: 3,
  category: {
    id: 3,
    name: '高级'
  },
  lessons: 10,
  watchers: 100,
  coverPictureUrl: 'https://i0.hdslb.com/bfs/archive/8cca6513ddd64e0a6415ed615a519f7b80e3b1a3.jpg@672w_378h_1c_!web-search-common-cover.avif',
}, {
  id: 7,
  name: '深度强化学习',
  subjectId: 1,
  subject: {
    id: 1,
    name: '人工智能',
  },
  categoryId: 3,
  category: {
    id: 3,
    name: '高级'
  },
  lessons: 10,
  watchers: 100,
  coverPictureUrl: 'https://i0.hdslb.com/bfs/archive/8cca6513ddd64e0a6415ed615a519f7b80e3b1a3.jpg@672w_378h_1c_!web-search-common-cover.avif',
}, {
  id: 8,
  name: '深度强化学习',
  subjectId: 1,
  subject: {
    id: 1,
    name: '人工智能',
  },
  categoryId: 3,
  category: {
    id: 3,
    name: '高级'
  },
  lessons: 10,
  watchers: 100,
  coverPictureUrl: 'https://i0.hdslb.com/bfs/archive/8cca6513ddd64e0a6415ed615a519f7b80e3b1a3.jpg@672w_378h_1c_!web-search-common-cover.avif',
}, {
  id: 9,
  name: '深度强化学习',
  subjectId: 1,
  subject: {
    id: 1,
    name: '人工智能',
  },
  categoryId: 3,
  category: {
    id: 3,
    name: '高级'
  },
  lessons: 10,
  watchers: 100,
  coverPictureUrl: 'https://i0.hdslb.com/bfs/archive/8cca6513ddd64e0a6415ed615a519f7b80e3b1a3.jpg@672w_378h_1c_!web-search-common-cover.avif',
}, {
  id: 10,
  name: '深度强化学习',
  subjectId: 1,
  subject: {
    id: 1,
    name: '人工智能',
  },
  categoryId: 3,
  category: {
    id: 3,
    name: '高级'
  },
  lessons: 10,
  watchers: 100,
  coverPictureUrl: 'https://i0.hdslb.com/bfs/archive/8cca6513ddd64e0a6415ed615a519f7b80e3b1a3.jpg@672w_378h_1c_!web-search-common-cover.avif',
}, {
  id: 11,
  name: '深度强化学习',
  subjectId: 1,
  subject: {
    id: 1,
    name: '人工智能',
  },
  categoryId: 3,
  category: {
    id: 3,
    name: '高级'
  },
  lessons: 10,
  watchers: 100,
  coverPictureUrl: 'https://i0.hdslb.com/bfs/archive/8cca6513ddd64e0a6415ed615a519f7b80e3b1a3.jpg@672w_378h_1c_!web-search-common-cover.avif',
}, {
  id: 12,
  name: '深度强化学习',
  subjectId: 1,
  subject: {
    id: 1,
    name: '人工智能',
  },
  categoryId: 3,
  category: {
    id: 3,
    name: '高级'
  },
  lessons: 10,
  watchers: 100,
  coverPictureUrl: 'https://i0.hdslb.com/bfs/archive/8cca6513ddd64e0a6415ed615a519f7b80e3b1a3.jpg@672w_378h_1c_!web-search-common-cover.avif',
}]
const lessonsRes = (options)=>{
  const request = JSON.parse(options.body)
  const filter = (request && request.conditions && request.conditions.searchText!==undefined && request.conditions.searchText!=='') ? item=>item.name.indexOf(request.conditions.searchText)!=-1 || item.code.indexOf(request.conditions.searchText)!=-1 : null
  return handleList(options, lessons, request, filter)
}


Mock.mock(/\/api\/homepage\/lessons/, 'post', lessonsRes)
