import Mock from 'mockjs2'
import moment from 'moment'
import { builder,handlePage, handleList, handleDelete, handleBatchDelete, handleGet, handleUpdate, handleCreate } from '../../util'
import {records as colors} from '../system/color'
import {STATUS} from "src/api/plan/production-card";

export const records = []

for(let i=0;i<100;i++){
  const colorId = i%(colors.length-1)+1
  const deliveryMoment = moment().add(Math.floor(Math.random()*3), 'days')
  const deadlineMoment = deliveryMoment.add(2, 'days')
  const statusCodes = Object.keys(STATUS)
  records.push({
    id: i,
    code: moment().format('YYYYMMDDHHmmss')+i.toString().padStart(3,'0'),
    deliveryTime: deliveryMoment.toDate().getTime(),
    deadlineTime: deadlineMoment.toDate().getTime(),
    rolls: Math.floor(Math.random()*10),
    weight: (Math.random()*20).toFixed(2),
    grayWidth: 1000+Math.floor(Math.random()*500),
    grayWeightOfLength: (Math.random()*20).toFixed(2),
    fabricIngredient: 'R51%+T42%+SP7%',
    colorId: colorId,
    color: colors.find(color=>color.id === colorId),
    colorNo: Math.floor(Math.random()*1000).toString().padStart(10,'0'),
    status: statusCodes[Math.floor(Math.random()*statusCodes.length)],
    createdAt: moment(new Date().getTime()).format('yyyy-MM-DD HH:mm:ss'),
    updatedAt: moment(new Date().getTime()).format('yyyy-MM-DD HH:mm:ss'),

    processes: [{
      id: 1,
      processId: 1,
      process: {
        id: 1,
        name: '翻布缝头',
        status: 'NORMAL',
        note: '',
      },
      startTime: new Date(new Date().getTime()-10*3600*1000).getTime(),
      finishTime: new Date(new Date().getTime()-9.8*3600*1000).getTime(),
      scheduledStartTime: new Date(new Date().getTime()-10*3600*1000).getTime(),
      scheduledFinishTime: new Date(new Date().getTime()-9.8*3600*1000).getTime(),
      status: 'COMPLETED',
    },{
      id: 2,
      processId: 2,
      process: {
        id: 2,
        name: '汽蒸',
        status: 'NORMAL',
        note: '',
      },
      startTime: new Date(new Date().getTime()-9.8*3600*1000).getTime(),
      finishTime: new Date(new Date().getTime()-9.6*3600*1000).getTime(),
      scheduledStartTime: new Date(new Date().getTime()-9.8*3600*1000).getTime(),
      scheduledFinishTime: new Date(new Date().getTime()-9.6*3600*1000).getTime(),
      status: 'COMPLETED',
    }, {
      id: 3,
      processId: 3,
      process: {
        id: 3,
        name: '预定型',
        status: 'NORMAL',
        note: '',
      },
      startTime: new Date(new Date().getTime()-9.6*3600*1000).getTime(),
      finishTime: new Date(new Date().getTime()-9.5*3600*1000).getTime(),
      scheduledStartTime: new Date(new Date().getTime()-9.6*3600*1000).getTime(),
      scheduledFinishTime: new Date(new Date().getTime()-9.5*3600*1000).getTime(),
      status: 'COMPLETED',
    }, {
      id: 4,
      processId: 4,
      process: {
        id: 4,
        name: '分散配方',
        status: 'NORMAL',
        note: '',
      },
      startTime: new Date(new Date().getTime()-9.5*3600*1000).getTime(),
      finishTime: new Date(new Date().getTime()-1.5*3600*1000).getTime(),
      scheduledStartTime: new Date(new Date().getTime()-9.5*3600*1000).getTime(),
      scheduledFinishTime: new Date(new Date().getTime()-1.5*3600*1000).getTime(),
      status: 'COMPLETED',
    }, {
      id: 5,
      processId: 5,
      process: {
        id: 5,
        name: '分散进缸',
        status: 'NORMAL',
        note: '',
      },
      startTime: new Date(new Date().getTime()-1.5*3600*1000).getTime(),
      finishTime: new Date(new Date().getTime()-1.3*3600*1000).getTime(),
      scheduledStartTime: new Date(new Date().getTime()-1.5*3600*1000).getTime(),
      scheduledFinishTime: new Date(new Date().getTime()-1.3*3600*1000).getTime(),
      status: 'COMPLETED',
    }, {
      id: 6,
      processId: 6,
      process: {
        id: 6,
        name: '分散出缸',
        status: 'NORMAL',
        note: '',
      },
      startTime: new Date(new Date().getTime()-1.3*3600*1000).getTime(),
      scheduledStartTime: new Date(new Date().getTime()-1.3*3600*1000).getTime(),
      scheduledFinishTime: new Date(new Date().getTime()+2.3*3600*1000).getTime(),
      status: 'PROCESSING',
    }, {
      id: 7,
      processId: 7,
      process: {
        id: 7,
        name: '开幅',
        status: 'NORMAL',
        note: '',
      },
      scheduledStartTime: new Date(new Date().getTime()+2.3*3600*1000).getTime(),
      scheduledFinishTime: new Date(new Date().getTime()+2.4*3600*1000).getTime(),
      status: 'PENDING',
    }, {
      id: 8,
      processId: 8,
      process: {
        id: 8,
        name: '中定',
        status: 'NORMAL',
        note: '',
      },
      scheduledStartTime: new Date(new Date().getTime()+2.4*3600*1000).getTime(),
      scheduledFinishTime: new Date(new Date().getTime()+2.5*3600*1000).getTime(),
      status: 'PENDING',
    }, {
      id: 9,
      processId: 9,
      process: {
        id: 9,
        name: '还原清洗',
        status: 'NORMAL',
        note: '',
      },
      scheduledStartTime: new Date(new Date().getTime()+2.5*3600*1000).getTime(),
      scheduledFinishTime: new Date(new Date().getTime()+2.6*3600*1000).getTime(),
      status: 'PENDING',
    }, {
      id: 10,
      processId: 10,
      process: {
        id: 10,
        name: '活性配方',
        status: 'NORMAL',
        note: '',
      },
      scheduledStartTime: new Date(new Date().getTime()+2.6*3600*1000).getTime(),
      scheduledFinishTime: new Date(new Date().getTime()+2.7*3600*1000).getTime(),
      status: 'PENDING',
    }, {
      id: 11,
      processId: 11,
      process: {
        id: 11,
        name: '活性进缸',
        status: 'NORMAL',
        note: '',
      },
      scheduledStartTime: new Date(new Date().getTime()+2.7*3600*1000).getTime(),
      scheduledFinishTime: new Date(new Date().getTime()+2.8*3600*1000).getTime(),
      status: 'PENDING',
    }, {
      id: 12,
      processId: 12,
      process: {
        id: 12,
        name: '活性出缸',
        status: 'NORMAL',
        note: '',
      },
      scheduledStartTime: new Date(new Date().getTime()+2.8*3600*1000).getTime(),
      scheduledFinishTime: new Date(new Date().getTime()+2.9*3600*1000).getTime(),
      status: 'PENDING',
    }, {
      id: 13,
      processId: 13,
      process: {
        id: 13,
        name: '开幅2',
        status: 'NORMAL',
        note: '',
      },
      scheduledStartTime: new Date(new Date().getTime()+2.9*3600*1000).getTime(),
      scheduledFinishTime: new Date(new Date().getTime()+3.0*3600*1000).getTime(),
      status: 'PENDING',
    }, {
      id: 14,
      processId: 14,
      process: {
        id: 14,
        name: '成定',
        status: 'NORMAL',
        note: '',
      },
      scheduledStartTime: new Date(new Date().getTime()+3.0*3600*1000).getTime(),
      scheduledFinishTime: new Date(new Date().getTime()+3.1*3600*1000).getTime(),
      status: 'PENDING',
    }, {
      id: 15,
      processId: 15,
      process: {
        id: 15,
        name: '批色2',
        status: 'NORMAL',
        note: '',
      },
      scheduledStartTime: new Date(new Date().getTime()+3.1*3600*1000).getTime(),
      scheduledFinishTime: new Date(new Date().getTime()+3.2*3600*1000).getTime(),
      status: 'PENDING',
    }, {
      id: 16,
      processId: 16,
      process: {
        id: 16,
        name: '品管检验',
        status: 'NORMAL',
        note: '',
      },
      scheduledStartTime: new Date(new Date().getTime()+3.2*3600*1000).getTime(),
      scheduledFinishTime: new Date(new Date().getTime()+3.3*3600*1000).getTime(),
      status: 'PENDING',
    }, {
      id: 17,
      processId: 17,
      process: {
        id: 17,
        name: '打卷',
        status: 'NORMAL',
        note: '',
      },
      scheduledStartTime: new Date(new Date().getTime()+3.3*3600*1000).getTime(),
      scheduledFinishTime: new Date(new Date().getTime()+3.4*3600*1000).getTime(),
      status: 'PENDING',
    }, {
      id: 18,
      processId: 18,
      process: {
        id: 18,
        name: '成品入库',
        status: 'NORMAL',
        note: '',
      },
      scheduledStartTime: new Date(new Date().getTime()+3.4*3600*1000).getTime(),
      scheduledFinishTime: new Date(new Date().getTime()+3.5*3600*1000).getTime(),
      status: 'PENDING',
    }]
  })
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

Mock.mock(/\/api\/plan\/production-cards\/page/, 'post', pageRes)
Mock.mock(/\/api\/plan\/production-cards\/list/, 'post', listRes)
Mock.mock(/\/api\/plan\/production-cards\/\d+/, 'delete', deleteRes)
Mock.mock(/\/api\/plan\/production-cards\/\d+/, 'get', getRes)
Mock.mock(/\/api\/plan\/production-cards\/\d+/, 'put', updateRes)
Mock.mock(/\/api\/plan\/production-cards/,'post', createRes)
Mock.mock(/\/api\/plan\/production-cards/,'delete', batchDeleteRes)

