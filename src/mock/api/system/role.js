import Mock from 'mockjs2'
import { builder,paginate } from '../../util'

const records = [{
  id: 1,
  name: '系统管理员',
}, {
  id: 2,
  name: '计划员',
}, {
  id: 3,
  name: '染部主管',
}, {
  id: 4,
  name: '定型主管',
}, {
  id: 5,
  name: '化验员',
}, {
  id: 6,
  name: '角色1',
}, {
  id: 7,
  name: '角色2'
}]
const listRes = (options)=>{
  return builder(records)
}

Mock.mock(/\/api\/system\/roles/, 'get', listRes)
