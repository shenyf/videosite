import Mock from 'mockjs2'
import { builder,handlePage, handleDelete, handleBatchDelete, handleGet, handleUpdate, handleCreate } from '../../util'

const records = [{
  id: 1,
  name: '保暖布',
  code: '10020420-1',
  status: 'enabled',
  note: '',
  createdAt: new Date().getTime(),
  updatedAt: new Date().getTime(),
  processes: [{
    id: 1,
    name: '梳毛',
    code: '12171',
    standardSpeed: 10,
    standardSpeedUnit: 'METER/MINUTE',
    leadTime: 20,
    postTime: 10,
  }, {
    id: 2,
    name: '剪毛',
    code: '1223',
    standardSpeed: 20,
    standardSpeedUnit: 'METER/MINUTE',
    leadTime: 20,
    postTime: 10,
  }, {
    id: 3,
    name: '工序3',
    code: '0000003',
    standardSpeed: 30,
    standardSpeedUnit: 'MINUTE',
    leadTime: 20,
    postTime: 10,
  }, {
    id: 5,
    name: '工序5',
    code: '0000005',
    standardSpeed: 30,
    standardSpeedUnit: 'MINUTE',
    leadTime: 20,
    postTime: 10,
  }]
}, {
  id: 2,
  name: '压料定型',
  code: '100811',
  status: 'NORMAL',
  note: '',
  createdAt: new Date().getTime(),
  updatedAt: new Date().getTime(),
  processes: [{
    id: 2,
    name: '剪毛',
    code: '1223',
    standardSpeed: 30,
    standardSpeedUnit: 'MINUTE',
    leadTime: 20,
    postTime: 10,
  }, {
    id: 3,
    name: '工序3',
    code: '0000003',
    standardSpeed: 30,
    standardSpeedUnit: 'MINUTE',
    leadTime: 20,
    postTime: 10,
  }, {
    id: 4,
    name: '工序4',
    code: '0000004',
    standardSpeed: 30,
    standardSpeedUnit: 'MINUTE',
    leadTime: 20,
    postTime: 10,
  }]
}]

for(let i=3;i<20;i++){
  const record = {
    id: i,
    name: '工艺'+i,
    code: '000000'+i,
    status: 'NORMAL',
    note: null,
    createdAt: new Date().getTime(),
    updatedAt: new Date().getTime(),
    processes: [{
      id: 3,
      name: '工序3',
      code: '0000003',
      standardSpeed: 30,
      standardSpeedUnit: 'MINUTE',
      leadTime: 20,
      postTime: 10,
    }, {
      id: 4,
      name: '工序4',
      code: '0000004',
      standardSpeed: 30,
      standardSpeedUnit: 'MINUTE',
      leadTime: 20,
      postTime: 10,
    }, {
      id: 5,
      name: '工序5',
      code: '0000005',
      standardSpeed: 30,
      standardSpeedUnit: 'MINUTE',
      leadTime: 20,
      postTime: 10,
    }]
  }
  records.push(record)
}

const pageRes = (options)=>{
  const request = JSON.parse(options.body)
  const filter = (request && request.conditions && request.conditions.searchText!==undefined && request.conditions.searchText!=='') ? item=>item.name.indexOf(request.conditions.searchText)!=-1 || item.code.indexOf(request.conditions.searchText)!=-1 : null
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

Mock.mock(/\/api\/system\/flows\/page/, 'post', pageRes)
Mock.mock(/\/api\/system\/flows\/\d+/, 'delete', deleteRes)
Mock.mock(/\/api\/system\/flows\/\d+/, 'get', getRes)
Mock.mock(/\/api\/system\/flows\/\d+/, 'put', updateRes)
Mock.mock(/\/api\/system\/flows/,'post', createRes)
Mock.mock(/\/api\/system\/flows/,'delete', batchDeleteRes)

