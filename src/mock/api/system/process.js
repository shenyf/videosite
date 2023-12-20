import Mock from 'mockjs2'
import { builder,handlePage, handleList, handleDelete, handleBatchDelete, handleGet, handleUpdate, handleCreate } from '../../util'

const records = [{
  id: 1,
  name: '翻布缝头',
  code: '000001',
  standardTime: 10,
  timeUnit: 'MINUTE',
  leadTime: 20,
  postTime: 10,
  status: 'NORMAL',
  note: '',
  createdAt: new Date().getTime(),
  updatedAt: new Date().getTime(),
}, {
  id: 2,
  name: '汽蒸',
  code: '000002',
  standardTime: 10,
  timeUnit: 'MINUTE',
  leadTime: 20,
  postTime: 10,
  status: 'NORMAL',
  note: '',
  createdAt: new Date().getTime(),
  updatedAt: new Date().getTime(),
}, {
  id: 3,
  name: '预定型',
  code: '000003',
  standardTime: 1.2,
  timeUnit: 'METER_PER_MINUTE',
  leadTime: 20,
  postTime: 10,
  status: 'NORMAL',
  note: '',
  createdAt: new Date().getTime(),
  updatedAt: new Date().getTime(),
}, {
  id: 4,
  name: '分散配方',
  code: '000004',
  standardTime: 10,
  timeUnit: 'MINUTE',
  leadTime: 20,
  postTime: 10,
  status: 'NORMAL',
  note: '',
  createdAt: new Date().getTime(),
  updatedAt: new Date().getTime(),
}, {
  id: 5,
  name: '分散进缸',
  code: '000005',
  standardTime: 10,
  timeUnit: 'MINUTE',
  leadTime: 20,
  postTime: 10,
  status: 'NORMAL',
  note: '',
  createdAt: new Date().getTime(),
  updatedAt: new Date().getTime(),
}, {
  id: 6,
  name: '分散出缸',
  code: '000006',
  standardTime: 1.5,
  timeUnit: 'METER_PER_MINUTE',
  leadTime: 20,
  postTime: 10,
  status: 'NORMAL',
  note: '',
  createdAt: new Date().getTime(),
  updatedAt: new Date().getTime(),
}, {
  id: 7,
  name: '开幅',
  code: '000007',
  standardTime: 10,
  timeUnit: 'MINUTE',
  leadTime: 20,
  postTime: 10,
  status: 'NORMAL',
  note: '',
  createdAt: new Date().getTime(),
  updatedAt: new Date().getTime(),
}, {
  id: 8,
  name: '中定',
  code: '000008',
  standardTime: 1.1,
  timeUnit: 'METER_PER_MINUTE',
  leadTime: 20,
  postTime: 10,
  status: 'NORMAL',
  note: '',
  createdAt: new Date().getTime(),
  updatedAt: new Date().getTime(),
}, {
  id: 9,
  name: '还原清洗',
  code: '000009',
  standardTime: 10,
  timeUnit: 'MINUTE',
  leadTime: 20,
  postTime: 10,
  status: 'NORMAL',
  note: '',
  createdAt: new Date().getTime(),
  updatedAt: new Date().getTime(),
}, {
  id: 10,
  name: '活性配方',
  code: '000010',
  standardTime: 10,
  timeUnit: 'MINUTE',
  leadTime: 20,
  postTime: 10,
  status: 'NORMAL',
  note: '',
  createdAt: new Date().getTime(),
  updatedAt: new Date().getTime(),
}, {
  id: 11,
  name: '活性进缸',
  code: '000011',
  standardTime: 10,
  timeUnit: 'MINUTE',
  leadTime: 20,
  postTime: 10,
  status: 'NORMAL',
  note: '',
  createdAt: new Date().getTime(),
  updatedAt: new Date().getTime(),
}, {
  id: 12,
  name: '活性出缸',
  code: '000012',
  standardTime: 1.5,
  timeUnit: 'METER_PER_MINUTE',
  leadTime: 20,
  postTime: 10,
  status: 'NORMAL',
  note: '',
  createdAt: new Date().getTime(),
  updatedAt: new Date().getTime(),
}, {
  id: 13,
  name: '开幅2',
  code: '000013',
  standardTime: 20,
  timeUnit: 'MINUTE',
  leadTime: 20,
  postTime: 10,
  status: 'NORMAL',
  note: '',
  createdAt: new Date().getTime(),
  updatedAt: new Date().getTime(),
}, {
  id: 14,
  name: '成定',
  code: '000014',
  standardTime: 20,
  timeUnit: 'METER_PER_MINUTE',
  leadTime: 20,
  postTime: 10,
  status: 'NORMAL',
  note: '',
  createdAt: new Date().getTime(),
  updatedAt: new Date().getTime(),
}, {
  id: 15,
  name: '批色2',
  code: '000015',
  standardTime: 20,
  timeUnit: 'MINUTE',
  leadTime: 20,
  postTime: 10,
  status: 'NORMAL',
  note: '',
  createdAt: new Date().getTime(),
  updatedAt: new Date().getTime(),
}, {
  id: 16,
  name: '品管检验',
  code: '000016',
  standardTime: 20,
  timeUnit: 'MINUTE',
  leadTime: 20,
  postTime: 10,
  status: 'NORMAL',
  note: '',
  createdAt: new Date().getTime(),
  updatedAt: new Date().getTime(),
}, {
  id: 17,
  name: '打卷',
  code: '000017',
  standardTime: 20,
  timeUnit: 'MINUTE',
  leadTime: 20,
  postTime: 10,
  status: 'NORMAL',
  note: '',
  createdAt: new Date().getTime(),
  updatedAt: new Date().getTime(),
}, {
  id: 18,
  name: '成品入库',
  code: '000018',
  standardTime: 20,
  timeUnit: 'MINUTE',
  leadTime: 20,
  postTime: 10,
  status: 'NORMAL',
  note: '',
  createdAt: new Date().getTime(),
  updatedAt: new Date().getTime(),
}]

for(let i=20;i<40;i++){
  const record = {
    id: i,
    name: '工序'+i,
    code: '000000'+i,
    standardTime: 30,
    timeUnit: 'MINUTE',
    leadTime: 20,
    postTime: 10,
    status: 'NORMAL',
    note: null,
    createdAt: new Date().getTime(),
    updatedAt: new Date().getTime(),
  }
  records.push(record)
}

const pageRes = (options)=>{
  const request = JSON.parse(options.body)
  const filter = (request && request.conditions && request.conditions.searchText!==undefined && request.conditions.searchText!=='') ? item=>item.name.indexOf(request.conditions.searchText)!=-1 || item.code.indexOf(request.conditions.searchText)!=-1 : null
  return handlePage(options, records, request, filter)
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

Mock.mock(/\/api\/system\/processes\/page/, 'post', pageRes)
Mock.mock(/\/api\/system\/processes\/list/, 'post', listRes)
Mock.mock(/\/api\/system\/processes\/\d+/, 'delete', deleteRes)
Mock.mock(/\/api\/system\/processes\/\d+/, 'get', getRes)
Mock.mock(/\/api\/system\/processes\/\d+/, 'put', updateRes)
Mock.mock(/\/api\/system\/processes/,'post', createRes)
Mock.mock(/\/api\/system\/processes/,'delete', batchDeleteRes)

