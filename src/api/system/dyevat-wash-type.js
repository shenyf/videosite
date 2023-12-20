import request from '@/utils/request'

export function pageDyevatWashTypes (query) {
  return request({
    url: `/system/dyevat-wash-types/page`,
    data: query,
    method: 'post'
  })
}

export function listDyevatWashTypes(query) {
  return request({
    url: `/system/dyevat-wash-types/list`,
    data: query,
    method: 'post'
  })
}
export function removeDyevatWashType(id){
  return request({
    url: `/system/dyevat-wash-types/${id}`,
    method: 'delete'
  })
}

export function removeDyevatWashTypes(ids){
  return request({
    url: `/system/dyevat-wash-types`,
    data: ids,
    method: 'delete'
  })
}

export function getDyevatWashType(id){
  return request({
    url: `/system/dyevat-wash-types/${id}`,
    method: 'get'
  })
}

export function updateDyevatWashType(id, dyevatWashType){
  return request({
    url: `/system/dyevat-wash-types/${id}`,
    data: dyevatWashType,
    method: 'put'
  })
}

export function createDyevatWashType(dyevatWashType){
  return request({
    url: `/system/dyevat-wash-types`,
    data: dyevatWashType,
    method: 'post'
  })
}
