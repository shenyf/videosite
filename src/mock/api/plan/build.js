import Mock from 'mockjs2'
import { builder,handlePage, handleList, handleDelete, handleBatchDelete, handleGet, handleUpdate, handleCreate } from '../../util'

export const records = []

for(let i=0;i<20;i++){
  const record = {
    id: i,
    status: i==0 ? 'GENERATING' : i==1 ? 'PENDING' : i%5==0? 'EXPIRED': 'APPLIED',
    note: null,
    createdAt: new Date(new Date().getTime()-(i+1)*24*3600*1000).getTime(),
    updatedAt: new Date().getTime(),
    appliedAt: new Date().getTime(),
  }
  records.push(record)
}

const pageRes = (options)=>{
  const request = JSON.parse(options.body)
  const filter = (request && request.conditions && request.conditions.searchText!==undefined && request.conditions.searchText!=='') ? item=>item.name.indexOf(request.conditions.searchText)!=-1 || item.code.indexOf(request.conditions.searchText)!=-1 : null
  return handlePage(options, records, request,filter)
}

const listRes = (options)=>{
  const request = JSON.parse(options.body)
  const filter = (request && request.conditions && request.conditions.searchText!==undefined && request.conditions.searchText!=='') ? item=>item.name.indexOf(request.conditions.searchText)!=-1 || item.code.indexOf(request.conditions.searchText)!=-1 : null
  return handleList(options, records, request, filter)
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

Mock.mock(/\/api\/plan\/builds\/page/, 'post', pageRes)
Mock.mock(/\/api\/plan\/builds\/list/, 'post', listRes)
Mock.mock(/\/api\/plan\/builds\/\d+/, 'delete', deleteRes)
Mock.mock(/\/api\/plan\/builds\/\d+/, 'get', getRes)
Mock.mock(/\/api\/plan\/builds\/\d+/, 'put', updateRes)
Mock.mock(/\/api\/plan\/builds/,'post', createRes)
Mock.mock(/\/api\/plan\/builds/,'delete', batchDeleteRes)

