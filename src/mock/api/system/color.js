import Mock from 'mockjs2'
import { builder,handlePage, handleList, handleDelete, handleBatchDelete, handleGet, handleUpdate, handleCreate } from '../../util'

export const records = [{
  id: 1,
  name: '漂白',
  code: '000001',
  rgb: '#FFFFFF',
  status: 'NORMAL',
  note: '',
  createdAt: new Date().getTime(),
  updatedAt: new Date().getTime(),
}, {
  id: 2,
  name: '本白',
  code: '000002',
  rgb: '#D3D7D4',
  status: 'NORMAL',
  note: '',
  createdAt: new Date().getTime(),
  updatedAt: new Date().getTime(),
}, {
  id: 3,
  name: '米白',
  code: '000003',
  rgb: '#F5F5DC',
  status: 'NORMAL',
  note: '',
  createdAt: new Date().getTime(),
  updatedAt: new Date().getTime(),
}, {
  id: 4,
  name: '肤色',
  code: '000004',
  rgb: '#FEDCBD',
  status: 'NORMAL',
  note: '',
  createdAt: new Date().getTime(),
  updatedAt: new Date().getTime(),
}, {
  id: 5,
  name: '浅黄',
  code: '000005',
  rgb: '#FFFFE0',
  status: 'NORMAL',
  note: '',
  createdAt: new Date().getTime(),
  updatedAt: new Date().getTime(),
}, {
  id: 6,
  name: '黄色',
  code: '000006',
  rgb: '#FFFF00',
  status: 'NORMAL',
  note: '',
  createdAt: new Date().getTime(),
  updatedAt: new Date().getTime(),
}, {
  id: 7,
  name: '卡其',
  code: '000007',
  rgb: '#F0E68C',
  status: 'NORMAL',
  note: '',
  createdAt: new Date().getTime(),
  updatedAt: new Date().getTime(),
}, {
  id: 8,
  name: '浅灰',
  code: '000008',
  rgb: '#D3D3D3',
  status: 'NORMAL',
  note: '',
  createdAt: new Date().getTime(),
  updatedAt: new Date().getTime(),
}, {
  id: 9,
  name: '中灰',
  code: '000009',
  rgb: '#808080',
  status: 'NORMAL',
  note: '',
  createdAt: new Date().getTime(),
  updatedAt: new Date().getTime(),
}, {
  id: 10,
  name: '深灰',
  code: '000010',
  rgb: '#696969',
  status: 'NORMAL',
  note: '',
  createdAt: new Date().getTime(),
  updatedAt: new Date().getTime(),
}, {
  id: 11,
  name: '浅粉',
  code: '000011',
  rgb: '#FFB6C1',
  status: 'NORMAL',
  note: '',
  createdAt: new Date().getTime(),
  updatedAt: new Date().getTime(),
}, {
  id: 12,
  name: '深粉',
  code: '000012',
  rgb: '#FF1493',
  status: 'NORMAL',
  note: '',
  createdAt: new Date().getTime(),
  updatedAt: new Date().getTime(),
}, {
  id: 13,
  name: '红色',
  code: '000013',
  rgb: '#FF0000',
  status: 'NORMAL',
  note: '',
  createdAt: new Date().getTime(),
  updatedAt: new Date().getTime(),
}, {
  id: 14,
  name: '橘红',
  code: '000014',
  rgb: '#FF4500',
  status: 'NORMAL',
  note: '',
  createdAt: new Date().getTime(),
  updatedAt: new Date().getTime(),
}, {
  id: 15,
  name: '橘色',
  code: '000015',
  rgb: '#FFA500',
  status: 'NORMAL',
  note: '',
  createdAt: new Date().getTime(),
  updatedAt: new Date().getTime(),
}, {
  id: 16,
  name: '翠绿',
  code: '000016',
  rgb: '#A7B56B',
  status: 'NORMAL',
  note: '',
  createdAt: new Date().getTime(),
  updatedAt: new Date().getTime(),
}, {
  id: 17,
  name: '绿色',
  code: '000017',
  rgb: '#008000',
  status: 'NORMAL',
  note: '',
  createdAt: new Date().getTime(),
  updatedAt: new Date().getTime(),
}, {
  id: 18,
  name: '青绿',
  code: '000018',
  rgb: '#40E0D0',
  status: 'NORMAL',
  note: '',
  createdAt: new Date().getTime(),
  updatedAt: new Date().getTime(),
}, {
  id: 19,
  name: '墨绿',
  code: '000019',
  rgb: '#006650',
  status: 'NORMAL',
  note: '',
  createdAt: new Date().getTime(),
  updatedAt: new Date().getTime(),
}, {
  id: 20,
  name: '浅蓝',
  code: '000020',
  rgb: '#ADD8E6',
  status: 'NORMAL',
  note: '',
  createdAt: new Date().getTime(),
  updatedAt: new Date().getTime(),
}, {
  id: 21,
  name: '宝蓝',
  code: '000021',
  rgb: '#4169E1',
  status: 'NORMAL',
  note: '',
  createdAt: new Date().getTime(),
  updatedAt: new Date().getTime(),
}, {
  id: 22,
  name: '藏青',
  code: '000022',
  rgb: '#2E4E7E',
  status: 'NORMAL',
  note: '',
  createdAt: new Date().getTime(),
  updatedAt: new Date().getTime(),
}, {
  id: 23,
  name: '深蓝',
  code: '000023',
  rgb: '#008B8B',
  status: 'NORMAL',
  note: '',
  createdAt: new Date().getTime(),
  updatedAt: new Date().getTime(),
}, {
  id: 24,
  name: '浅紫',
  code: '000024',
  rgb: '#B8BBDE',
  status: 'NORMAL',
  note: '',
  createdAt: new Date().getTime(),
  updatedAt: new Date().getTime(),
}, {
  id: 25,
  name: '深紫',
  code: '000025',
  rgb: '#9400D3',
  status: 'NORMAL',
  note: '',
  createdAt: new Date().getTime(),
  updatedAt: new Date().getTime(),
}, {
  id: 26,
  name: '棕色',
  code: '000026',
  rgb: '#A52A2A',
  status: 'NORMAL',
  note: '',
  createdAt: new Date().getTime(),
  updatedAt: new Date().getTime(),
}, {
  id: 27,
  name: '咖啡',
  code: '000027',
  rgb: '#603922',
  status: 'NORMAL',
  note: '',
  createdAt: new Date().getTime(),
  updatedAt: new Date().getTime(),
}, {
  id: 28,
  name: '黑色',
  code: '000028',
  rgb: '#000000',
  status: 'NORMAL',
  note: '',
  createdAt: new Date().getTime(),
  updatedAt: new Date().getTime(),
}]

// for(let i=3;i<20;i++){
//   const record = {
//     id: i,
//     name: '颜色'+i,
//     code: '000000'+i,
//     rgb: ('#'+parseInt(Math.random()*255).toString(16).padStart(2,'0')+parseInt(Math.random()*255).toString(16).padStart(2,'0')+parseInt(Math.random()*255).toString(16).padStart(2,'0')).toUpperCase(),
//     status: 'NORMAL',
//     note: null,
//     createdAt: new Date().getTime(),
//     updatedAt: new Date().getTime(),
//   }
//   records.push(record)
// }

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

Mock.mock(/\/api\/system\/colors\/page/, 'post', pageRes)
Mock.mock(/\/api\/system\/colors\/list/, 'post', listRes)
Mock.mock(/\/api\/system\/colors\/\d+/, 'delete', deleteRes)
Mock.mock(/\/api\/system\/colors\/\d+/, 'get', getRes)
Mock.mock(/\/api\/system\/colors\/\d+/, 'put', updateRes)
Mock.mock(/\/api\/system\/colors/,'post', createRes)
Mock.mock(/\/api\/system\/colors/,'delete', batchDeleteRes)

