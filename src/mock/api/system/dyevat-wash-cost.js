import Mock from 'mockjs2'
import { builder,handlePage, handleList, handleDelete, handleBatchDelete, handleGet, handleUpdate, handleCreate } from '../../util'

export const records = [{
  id: 1,
  dyevatBrandId: 1,
  dyevatBrand: {
    id: 1,
    name: '东宝'
  },
  dyevatCategory: "OVERFLOW",
  tubes: 2,
  dyevatWashTypeId: 1,
  dyevatWashType: {
    id: 1,
    name: '冲缸',
  },
  takeTime: 10,
  electricity: 10.0,
  gas: 20.0,
  water: 30.0,
  accessory: 200.0,
  note: '',
  createdAt: new Date().getTime(),
  updatedAt: new Date().getTime(),
}, {
  id: 2,
  dyevatBrandId: 2,
  dyevatBrand: {
    id: 2,
    name: '盛格'
  },
  dyevatCategory: "AIRFLOW",
  tubes: 8,
  dyevatWashTypeId: 2,
  dyevatWashType: {
    id: 2,
    name: '跑缸',
  },
  takeTime: 50,
  electricity: 15.0,
  gas: 26.0,
  water: 33.0,
  accessory: 500.0,
  note: '',
  createdAt: new Date().getTime(),
  updatedAt: new Date().getTime(),
}]

const pageRes = (options)=>{
  const request = JSON.parse(options.body)
  const filter = (request && request.conditions && request.conditions.searchText!==undefined && request.conditions.searchText!=='') ? item=>item.name.indexOf(request.conditions.searchText)!=-1 : null
  return handlePage(options, records, request,filter)
}

const listRes = (options)=>{
  const request = JSON.parse(options.body)
  const filter = (request && request.conditions && request.conditions.searchText!==undefined && request.conditions.searchText!=='') ? item=>item.name.indexOf(request.conditions.searchText)!=-1  : null
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

Mock.mock(/\/api\/system\/dyevat-wash-costs\/page/, 'post', pageRes)
Mock.mock(/\/api\/system\/dyevat-wash-costs\/list/, 'post', listRes)
Mock.mock(/\/api\/system\/dyevat-wash-costs\/\d+/, 'delete', deleteRes)
Mock.mock(/\/api\/system\/dyevat-wash-costs\/\d+/, 'get', getRes)
Mock.mock(/\/api\/system\/dyevat-wash-costs\/\d+/, 'put', updateRes)
Mock.mock(/\/api\/system\/dyevat-wash-costs/,'post', createRes)
Mock.mock(/\/api\/system\/dyevat-wash-costs/,'delete', batchDeleteRes)

