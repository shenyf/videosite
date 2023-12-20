import Mock from 'mockjs2'
import { builder,handlePage, handleList, handleDelete, handleBatchDelete, handleGet, handleUpdate, handleCreate } from '../../util'

export const records = []

for(let i=0;i<20;i++){
  const record = {
    id: i,
    otdRate: parseInt(Math.random()*100),
    dyevatWashCount: parseInt(Math.random()*10),
    status: i==0 ? 'PENDING' : i==1 ? 'ADOPTED' : 'DISCARDED',
    note: null,
    createdAt: new Date(new Date().getTime()-(i+1)*24*3600*1000).getTime(),
    updatedAt: new Date().getTime(),
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

const applyRes = (options)=>{
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

Mock.mock(/\/api\/plan\/schemes\/page/, 'post', pageRes)
Mock.mock(/\/api\/plan\/schemes\/list/, 'post', listRes)
Mock.mock(/\/api\/plan\/schemes\/\d+/, 'delete', deleteRes)
Mock.mock(/\/api\/plan\/schemes\/\d+/, 'get', getRes)
Mock.mock(/\/api\/plan\/schemes\/\d+\/apply/, 'put', applyRes)
Mock.mock(/\/api\/plan\/schemes\/\d+/, 'put', updateRes)
Mock.mock(/\/api\/plan\/schemes/,'post', createRes)
Mock.mock(/\/api\/plan\/schemes/,'delete', batchDeleteRes)

