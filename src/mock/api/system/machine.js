import Mock from 'mockjs2'
import { builder,handlePage, handleList, handleDelete, handleBatchDelete, handleGet, handleUpdate, handleCreate } from '../../util'

export const records = []
for(let i=1;i<20;i++){
  const record = {
    id: i,
    name: '染缸'+i,
    code: 'D0000'+i,
    machineType: 'DYEVAT',
    tubes: 2**((i-1)%4),
    brandId: 1,
    brand: {
      id: 1,
      name: '东宝'
    },
    maxCapacity: 500.00,
    minCapacity: 50.00,
    maxFabricWidth: 150,
    minFabricWidth: 100,
    status: 'NORMAL',
    note: '',
    createdAt: new Date().getTime(),
    updatedAt: new Date().getTime(),
  }
  records.push(record)
}
for(let i=100;i<120;i++){
  const record = {
    id: i,
    name: '定型机'+i,
    code: 'S0000'+i,
    machineType: 'STENTER',
    brandId: 11,
    brand: {
      id: 11,
      name: '知名品牌'
    },
    status: 'NORMAL',
    note: '',
    createdAt: new Date().getTime(),
    updatedAt: new Date().getTime(),
  }
  records.push(record)
}

const pageRes = (options)=>{
  const request = JSON.parse(options.body)
  const filter = (request && request.conditions && request.conditions.searchText!==undefined && request.conditions.searchText!=='') ? item=>item.machineType === request.conditions.machineType && (item.name.indexOf(request.conditions.searchText)!=-1) : null
  return handlePage(options, records.filter(item=>item.machineType === request.conditions.machineType), request,filter)
}

const listRes = (options)=>{
  const request = JSON.parse(options.body)
  const filter = (request && request.conditions && request.conditions.searchText!==undefined && request.conditions.searchText!=='') ? item=>item.machineType === request.conditions.machineType && (item.name.indexOf(request.conditions.searchText)!=-1) : null
  const ret =  handleList(options, records.filter(item=>item.machineType === request.conditions.machineType), request, filter)
  return ret;
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

Mock.mock(/\/api\/system\/machines\/page/, 'post', pageRes)
Mock.mock(/\/api\/system\/machines\/list/, 'post', listRes)
Mock.mock(/\/api\/system\/machines\/\d+/, 'delete', deleteRes)
Mock.mock(/\/api\/system\/machines\/\d+/, 'get', getRes)
Mock.mock(/\/api\/system\/machines\/\d+/, 'put', updateRes)
Mock.mock(/\/api\/system\/machines/,'post', createRes)
Mock.mock(/\/api\/system\/machines/,'delete', batchDeleteRes)

