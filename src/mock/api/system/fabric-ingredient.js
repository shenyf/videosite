import Mock from 'mockjs2'
import { builder,handlePage, handleList, handleDelete, handleBatchDelete, handleGet, handleUpdate, handleCreate } from '../../util'

export const records = [{
  id: 1,
  name: '棉',
  code: 'C',
  dyeTypeId:2,
  dyeType: {
    id: 2,
    name: '活性染料'
  },
  status: 'NORMAL',
  note: '',
  createdAt: new Date().getTime(),
  updatedAt: new Date().getTime(),
}, {
  id: 2,
  name: '腈纶',
  code: 'A',
  dyeTypeId: 1,
  dyeType: {
    id: 1,
    name: '阳离子染料'
  },
  status: 'NORMAL',
  note: '',
  createdAt: new Date().getTime(),
  updatedAt: new Date().getTime(),
}]

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

Mock.mock(/\/api\/system\/fabric-ingredients\/page/, 'post', pageRes)
Mock.mock(/\/api\/system\/fabric-ingredients\/list/, 'post', listRes)
Mock.mock(/\/api\/system\/fabric-ingredients\/\d+/, 'delete', deleteRes)
Mock.mock(/\/api\/system\/fabric-ingredients\/\d+/, 'get', getRes)
Mock.mock(/\/api\/system\/fabric-ingredients\/\d+/, 'put', updateRes)
Mock.mock(/\/api\/system\/fabric-ingredients/,'post', createRes)
Mock.mock(/\/api\/system\/fabric-ingredients/,'delete', batchDeleteRes)

