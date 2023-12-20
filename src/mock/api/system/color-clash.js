import Mock from 'mockjs2'
import { builder,handlePage, handleList, handleDelete, handleBatchDelete, handleGet, handleUpdate, handleCreate } from '../../util'
import {records as colors} from './color'
import _ from 'lodash'

const records = colors.map(color=>{
  const clone = _.cloneDeep(color)
  clone.clashRules = colors.map(col=> {
    const rule = {nextColorId: col.id}
    if(col.id===color.id){
      rule.clash = false
      rule.dyevatWashTypeId = -1
    }else{
      rule.clash = true
      rule.dyevatWashTypeId = Math.ceil(Math.random()*2)
    }
    return rule
  })
  return clone
})

const listRes = (options)=>{
  return handleList(options, records)
}
const saveRes = (options)=>{
  const data = JSON.parse(options.body)
  const color = records.find(item=>item.id === data.colorId)
  const rule = color.clashRules.find(r=>r.nextColorId === data.nextColorId)
  rule.clash = data.clash
  rule.dyevatWashTypeId = data.dyevatWashTypeId
  return builder()
}

Mock.mock(/\/api\/system\/color-clashes\/list/, 'get', listRes)
Mock.mock(/\/api\/system\/color-clashes/, 'put', saveRes)
