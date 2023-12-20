import request from '@/utils/request'

export function pageDyeTypes (query) {
  return request({
    url: `/system/dye-types/page`,
    data: query,
    method: 'post'
  })
}

export function listDyeTypes(query) {
  return request({
    url: `/system/dye-types/list`,
    data: query,
    method: 'post'
  })
}
export function removeDyeType(id){
  return request({
    url: `/system/dye-types/${id}`,
    method: 'delete'
  })
}

export function removeDyeTypes(ids){
  return request({
    url: `/system/dye-types`,
    data: ids,
    method: 'delete'
  })
}

export function getDyeType(id){
  return request({
    url: `/system/dye-types/${id}`,
    method: 'get'
  })
}

export function updateDyeType(id, dyeType){
  return request({
    url: `/system/dye-types/${id}`,
    data: dyeType,
    method: 'put'
  })
}

export function createDyeType(dyeType){
  return request({
    url: `/system/dye-types`,
    data: dyeType,
    method: 'post'
  })
}
