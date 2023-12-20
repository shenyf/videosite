import request from '@/utils/request'

export const STATUS = {
  PENDING: {
    text: '未开始',
    color: 'grey'
  },
  PROCESSING: {
    text: '工序加工中',
    color: 'blue',
  },
  COMPLETED: {
    text: '已完成',
    color: 'green',
  },
  CANCELED: {
    text: '已中止',
    color: 'red',
  }
}

export function pageProductionCards (query) {
  return request({
    url: `/plan/production-cards/page`,
    data: query,
    method: 'post'
  })
}

export function listProductionCards(query) {
  return request({
    url: `/plan/production-cards/list`,
    data: query,
    method: 'post'
  })
}
export function removeProductionCard(id){
  return request({
    url: `/plan/production-cards/${id}`,
    method: 'delete'
  })
}

export function removeProductionCards(ids){
  return request({
    url: `/plan/production-cards`,
    data: ids,
    method: 'delete'
  })
}

export function getProductionCard(id){
  return request({
    url: `/plan/production-cards/${id}`,
    method: 'get'
  })
}

export function updateProductionCard(id, productionCard){
  return request({
    url: `/plan/production-cards/${id}`,
    data: productionCard,
    method: 'put'
  })
}

export function createProductionCard(productionCard){
  return request({
    url: `/plan/production-cards`,
    data: productionCard,
    method: 'post'
  })
}
