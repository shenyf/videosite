import Mock from 'mockjs2'
import { builder,handlePage, handleList, handleDelete, handleBatchDelete, handleGet, handleUpdate, handleCreate } from '../util'

const subjects = [{
  id: 1,
  name: '人工智能',
  series: [{
    id: 1,
    title: '入门篇',
    watches: 123,
    updatedAt: '2023-12-10',
    description: '讲解了：AI 、机器学习、深度学习是怎么回事，他们之间的关系，常见的 AI 算法等知识。「人工智能入门」AI 是什么？',
  }, {
    id: 2,
    title: '进阶篇',
    watches: 456,
    updatedAt: '2023-12-10',
    description: '讲解了：深度学习的概念，它是如何运作的？当有人问你这些概念的时候，你可以通熟易懂地讲解了。「人工智能入门」深度学习是如何工作的？',
  }, {
    id: 3,
    title: '高级篇',
    watches: 789,
    updatedAt: '2023-12-10',
    description: 'AI 为什么这么重要，以至于大家都在谈论，对此寄予厚望；为什么 AI 的爆发正好在当下，明天的生活会因此发生什么改变。'
  }]
}]

const subjectsRes = (options)=>{
  const request = JSON.parse(options.body)
  const filter = (request && request.conditions && request.conditions.searchText!==undefined && request.conditions.searchText!=='') ? item=>item.name.indexOf(request.conditions.searchText)!=-1 || item.code.indexOf(request.conditions.searchText)!=-1 : null
  return handleList(options, subjects, request, filter)
}


Mock.mock(/\/api\/homepage\/subjects/, 'post', subjectsRes)
