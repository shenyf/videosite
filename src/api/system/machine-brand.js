import request from '@/utils/request'

export function pageMachineBrands (query) {
  return request({
    url: `/system/machine-brands/page`,
    data: query,
    method: 'post'
  })
}

export function listMachineBrands(query) {
  return request({
    url: `/system/machine-brands/list`,
    data: query,
    method: 'post'
  })
}
export function removeMachineBrand(id){
  return request({
    url: `/system/machine-brands/${id}`,
    method: 'delete'
  })
}

export function removeMachineBrands(ids){
  return request({
    url: `/system/machine-brands`,
    data: ids,
    method: 'delete'
  })
}

export function getMachineBrand(id){
  return request({
    url: `/system/machine-brands/${id}`,
    method: 'get'
  })
}

export function updateMachineBrand(id, brand){
  return request({
    url: `/system/machine-brands/${id}`,
    data: brand,
    method: 'put'
  })
}

export function createMachineBrand(brand){
  return request({
    url: `/system/machine-brands`,
    data: brand,
    method: 'post'
  })
}
