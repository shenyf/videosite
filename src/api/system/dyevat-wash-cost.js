import request from '@/utils/request'

export const DYEVAT_CATEGORY = {
  'OVERFLOW': '溢流缸',
  'AIRFLOW': '气流缸'
}

export function pageDyevatWashCosts (query) {
  return request({
    url: `/system/dyevat-wash-costs/page`,
    data: query,
    method: 'post'
  })
}

export function listDyevatWashCosts(query) {
  return request({
    url: `/system/dyevat-wash-costs/list`,
    data: query,
    method: 'post'
  })
}
export function removeDyevatWashCost(id){
  return request({
    url: `/system/dyevat-wash-costs/${id}`,
    method: 'delete'
  })
}

export function removeDyevatWashCosts(ids){
  return request({
    url: `/system/dyevat-wash-costs`,
    data: ids,
    method: 'delete'
  })
}

export function getDyevatWashCost(id){
  return request({
    url: `/system/dyevat-wash-costs/${id}`,
    method: 'get'
  })
}

export function updateDyevatWashCost(id, dyevatWashCost){
  return request({
    url: `/system/dyevat-wash-costs/${id}`,
    data: dyevatWashCost,
    method: 'put'
  })
}

export function createDyevatWashCost(dyevatWashCost){
  return request({
    url: `/system/dyevat-wash-costs`,
    data: dyevatWashCost,
    method: 'post'
  })
}
