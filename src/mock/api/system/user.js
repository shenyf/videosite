import Mock from 'mockjs2'
import { builder,handlePage, handleDelete, handleBatchDelete, handleGet, handleUpdate, handleCreate } from '../../util'

const records = [{
  id: 1,
  name: '张三疯',
  login: 'sam',
  mobile: '13838385238',
  status: 'NORMAL',
  note: '他真的疯了',
  createdAt: new Date().getTime(),
  updatedAt: new Date().getTime(),
  roleIds: [1,2],
}, {
  id: 2,
  name: '李四娘',
  login: 'zoya',
  mobile: '13838385438',
  status: 'NORMAL',
  note: '四娘半老',
  createdAt: new Date().getTime(),
  updatedAt: new Date().getTime(),
}]

for(let i=3;i<20;i++){
  const record = {
    id: i,
    name: 'user'+i,
    login: 'user'+i,
    mobile: '1383838333'+i,
    status: 'NORMAL',
    note: null,
    createdAt: new Date().getTime(),
    updatedAt: new Date().getTime(),
    roleIds: []
  }
  records.push(record)
}

const pageRes = (options)=>{
  const request = JSON.parse(options.body)
  const filter = (request && request.conditions && request.conditions.searchText!==undefined && request.conditions.searchText!=='') ? item=>item.name.indexOf(request.conditions.searchText)!=-1 || item.login.indexOf(request.conditions.searchText)!=-1 || item.mobile.indexOf(request.conditions.searchText)!=-1 : null
  return handlePage(options, records, request,filter)
}

const getRes = (options) =>{
  return handleGet(options, records)
}
const updateRes = (options)=>{
  return handleUpdate(options, records)
}
const createRes = (options)=>{
  return handleCreate(options, records)
}
const deleteRes = (options)=>{
  return handleDelete(options, records)
}
const batchDeleteRes = (options)=>{
  return handleBatchDelete(options, records)
}
const updatePasswordRes = (options)=>{
  return builder()
}
const updateAuthRes = (options)=>{
  const id = parseInt(options.url.match(/.*\/(\d+)/)[1])
  const record = records.find(item=>item.id === id)
  const auth = JSON.parse(options.body)
  record.roleIds = auth.roleIds
  return builder()
}

Mock.mock(/\/api\/system\/users\/page/, 'post', pageRes)
Mock.mock(/\/api\/system\/users\/\d+/, 'get', getRes)
Mock.mock(/\/api\/system\/users/,'post', createRes)
Mock.mock(/\/api\/system\/users\/\d+/, 'delete', deleteRes)
Mock.mock(/\/api\/system\/users/,'delete', batchDeleteRes)
Mock.mock(/\/api\/system\/users\/\d+\/password/, 'put', updatePasswordRes)
Mock.mock(/\/api\/system\/users\/\d+\/auth/, 'put', updateAuthRes)
Mock.mock(/\/api\/system\/users\/\d+/, 'put', updateRes)

