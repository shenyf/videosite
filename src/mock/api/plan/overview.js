import _ from "lodash"
import moment from 'moment'
import Mock from 'mockjs2'
import { builder, handleList} from '../../util'
import {records as machines} from '../system/machine'
import {records as productionCards} from './production-card'

let taskId = 0
export const records = machines.map((m,index)=>{
  const machine = _.cloneDeep(m)
  const baseTime = new Date(new Date().getTime()-(Math.random()-0.5)*5*3600*1000).getTime();
  machine.tasks = [{
    id: taskId++,
    productionCard: productionCards[index%machines.length],
    currentWorkingProcess: {
      name: '配方',
    },
    process: {
      name: '染色',
    },
    scheduledStartTime: moment(baseTime).format('yyyy-MM-DD HH:mm:ss'),
    scheduledFinishTime: moment(new Date(baseTime + 3*3600*1000+Math.random()*2*3600*1000)).format('yyyy-MM-DD HH:mm:ss'),
  }, {
    id: taskId++,
    productionCard: productionCards[(index+1)%machines.length],
    currentWorkingProcess: {
      name: '配方',
    },
    process: {
      name: '染色',
    },
    scheduledStartTime: moment(new Date(baseTime+5*3600*1000+Math.random()*2*3600*1000)).format('yyyy-MM-DD HH:mm:ss'),
    scheduledFinishTime: moment(new Date(baseTime+10*3600*1000+Math.random()*2*3600*1000)).format('yyyy-MM-DD HH:mm:ss')
  }]
  return machine
})

const listRes = (options)=>{
  const request = JSON.parse(options.body)
  const filter = (request && request.conditions && request.conditions.searchText!==undefined && request.conditions.searchText!=='') ? item=>item.name.indexOf(request.conditions.searchText)!=-1 || item.code.indexOf(request.conditions.searchText)!=-1 : null
  return handleList(options, records, request, filter)
}

Mock.mock(/\/api\/plan\/overview\/list/, 'get', listRes)

