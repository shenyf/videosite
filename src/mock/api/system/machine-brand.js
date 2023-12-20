import Mock from 'mockjs2'
import { builder,handlePage, handleList, handleDelete, handleBatchDelete, handleGet, handleUpdate, handleCreate } from '../../util'

const records = [{
  id: 1,
  name: '东宝',
  machineType: 'DYEVAT',
  status: 'NORMAL',
  note: '',
  createdAt: new Date().getTime(),
  updatedAt: new Date().getTime(),
}, {
  id: 2,
  name: '盛格',
  machineType: 'DYEVAT',
  status: 'NORMAL',
  note: '',
  createdAt: new Date().getTime(),
  updatedAt: new Date().getTime(),
}, {
  id: 11,
  name: '知名定型机品牌1',
  machineType: 'STENTER',
  status: 'NORMAL',
  note: '',
  createdAt: new Date().getTime(),
  updatedAt: new Date().getTime(),
}, {
  id: 12,
  name: '知名定型机品牌2',
  machineType: 'STENTER',
  status: 'NORMAL',
  note: '',
  createdAt: new Date().getTime(),
  updatedAt: new Date().getTime(),
}]


const pageRes = (options)=>{
  const request = JSON.parse(options.body)
  const filter = (request && request.conditions && request.conditions.searchText!==undefined && request.conditions.searchText!=='') ? item=>item.machineType === request.conditions.machineType && (item.name.indexOf(request.conditions.searchText)!=-1) : null
  return handlePage(options, records.filter(item=>item.machineType === request.conditions.machineType), request,filter)
}

const listRes = (options)=>{
  const request = JSON.parse(options.body)
  const filter = (request && request.conditions && request.conditions.searchText!==undefined && request.conditions.searchText!=='') ? item=>item.machineType === request.conditions.machineType && (item.name.indexOf(request.conditions.searchText)!=-1) : null
  return handleList(options, records.filter(item=>item.machineType === request.conditions.machineType), request, filter)
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

Mock.mock(/\/api\/system\/machine-brands\/page/, 'post', pageRes)
Mock.mock(/\/api\/system\/machine-brands\/list/, 'post', listRes)
Mock.mock(/\/api\/system\/machine-brands\/\d+/, 'delete', deleteRes)
Mock.mock(/\/api\/system\/machine-brands\/\d+/, 'get', getRes)
Mock.mock(/\/api\/system\/machine-brands\/\d+/, 'put', updateRes)
Mock.mock(/\/api\/system\/machine-brands/,'post', createRes)
Mock.mock(/\/api\/system\/machine-brands/,'delete', batchDeleteRes)

