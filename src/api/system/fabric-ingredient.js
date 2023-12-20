import request from '@/utils/request'

export function pageFabricIngredients (query) {
  return request({
    url: `/system/fabric-ingredients/page`,
    data: query,
    method: 'post'
  })
}

export function listFabricIngredients(query) {
  return request({
    url: `/system/fabric-ingredients/list`,
    data: query,
    method: 'post'
  })
}
export function removeFabricIngredient(id){
  return request({
    url: `/system/fabric-ingredients/${id}`,
    method: 'delete'
  })
}

export function removeFabricIngredients(ids){
  return request({
    url: `/system/fabric-ingredients`,
    data: ids,
    method: 'delete'
  })
}

export function getFabricIngredient(id){
  return request({
    url: `/system/fabric-ingredients/${id}`,
    method: 'get'
  })
}

export function updateFabricIngredient(id, fabricIngredient){
  return request({
    url: `/system/fabric-ingredients/${id}`,
    data: fabricIngredient,
    method: 'put'
  })
}

export function createFabricIngredient(fabricIngredient){
  return request({
    url: `/system/fabric-ingredients`,
    data: fabricIngredient,
    method: 'post'
  })
}
