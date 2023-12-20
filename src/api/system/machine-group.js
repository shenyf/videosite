import request from '@/utils/request'

export function pageMachineGroups (query) {
  return request({
    url: `/system/machine-groups/page`,
    data: query,
    method: 'post'
  })
}

export function listMachineGroups(query) {
  return request({
    url: `/system/machine-groups/list`,
    data: query,
    method: 'post'
  })
}
export function removeMachineGroup(id){
  return request({
    url: `/system/machine-groups/${id}`,
    method: 'delete'
  })
}

export function removeMachineGroups(ids){
  return request({
    url: `/system/machine-groups`,
    data: ids,
    method: 'delete'
  })
}

export function getMachineGroup(id){
  return request({
    url: `/system/machine-groups/${id}`,
    method: 'get'
  })
}

export function updateMachineGroup(id, machineGroup){
  return request({
    url: `/system/machine-groups/${id}`,
    data: machineGroup,
    method: 'put'
  })
}

export function createMachineGroup(machineGroup){
  return request({
    url: `/system/machine-groups`,
    data: machineGroup,
    method: 'post'
  })
}
