import Mock from 'mockjs2'
import { builder,handlePage, handleList, handleDelete, handleBatchDelete, handleGet, handleUpdate, handleCreate } from '../../util'

const records = [{
  id: 1,
  name: '单管缸',
  machineType: 'DYEVAT',
  status: 'NORMAL',
  note: '',
  createdAt: new Date().getTime(),
  updatedAt: new Date().getTime(),
}, {
  id: 2,
  name: '二管缸',
  machineType: 'DYEVAT',
  status: 'NORMAL',
  note: '',
  createdAt: new Date().getTime(),
  updatedAt: new Date().getTime(),
}, {
  id: 3,
  name: '四管缸',
  machineType: 'DYEVAT',
  status: 'NORMAL',
  note: '',
  createdAt: new Date().getTime(),
  updatedAt: new Date().getTime(),
}, {
  id: 4,
  name: '八管缸',
  machineType: 'DYEVAT',
  status: 'NORMAL',
  note: '',
  createdAt: new Date().getTime(),
  updatedAt: new Date().getTime(),
}, {
  id: 5,
  name: '东宝缸',
  machineType: 'DYEVAT',
  status: 'NORMAL',
  note: '',
  createdAt: new Date().getTime(),
  updatedAt: new Date().getTime(),
}, {
  id: 101,
  name: '定型机组1',
  machineType: 'STENTER',
  status: 'NORMAL',
  note: '',
  createdAt: new Date().getTime(),
  updatedAt: new Date().getTime(),
}, {
  id: 102,
  name: '定型机组2',
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

Mock.mock(/\/api\/system\/machine-groups\/page/, 'post', pageRes)
Mock.mock(/\/api\/system\/machine-groups\/list/, 'post', listRes)
Mock.mock(/\/api\/system\/machine-groups\/\d+/, 'delete', deleteRes)
Mock.mock(/\/api\/system\/machine-groups\/\d+/, 'get', getRes)
Mock.mock(/\/api\/system\/machine-groups\/\d+/, 'put', updateRes)
Mock.mock(/\/api\/system\/machine-groups/,'post', createRes)
Mock.mock(/\/api\/system\/machine-groups/,'delete', batchDeleteRes)

