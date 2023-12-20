const responseBody = {
  message: '',
  timestamp: 0,
  data: null,
  code: 0
}

export const builder = (data, message, code = 0, headers = {}) => {
  responseBody.data = data
  if (message !== undefined && message !== null) {
    responseBody.message = message
  }
  if (code !== undefined && code !== 0) {
    responseBody.success = false
    responseBody.code = code
    responseBody._status = code
  }else{
    responseBody.success = true
  }
  if (headers !== null && typeof headers === 'object' && Object.keys(headers).length > 0) {
    responseBody._headers = headers
  }
  responseBody.timestamp = new Date().getTime()
  return responseBody
}

export const paginate = (data, pageIndex, pageSize)=>{
  return data.slice(pageIndex * pageSize, pageIndex * pageSize + pageSize)
}

export const getQueryParameters = (options) => {
  const url = options.url
  const search = url.split('?')[1]
  if (!search) {
    return {}
  }
  return JSON.parse('{"' + decodeURIComponent(search)
    .replace(/"/g, '\\"')
    .replace(/&/g, '","')
    .replace(/=/g, '":"') + '"}')
}

export const getBody = (options) => {
  return options.body && JSON.parse(options.body)
}
export const handlePage = (options, records, request, filter)=>{
  let total = records
  if(filter){
    total = records.filter(filter)
  }
  const ret = paginate(total, request.pageIndex, request.pageSize)
  return builder({
    totalElements: total.length,
    content: ret
  })
}

export const handleList = (options, records, request, filter)=>{
  let total = records
  if(filter && request && request.conditions && request.conditions.searchText!==undefined && request.conditions.searchText!==''){
    total = records.filter(filter)
  }
  return builder(total)
}

export const handleDelete = (options, records)=>{
  const id = parseInt(options.url.match(/.*\/(\d+)/)[1])
  const record = records.splice(records.findIndex(item=>item.id === id), 1)
  return builder(record)
}

export const handleBatchDelete = (options, records)=>{
  const ids = JSON.parse(options.body)
  let deleted = []
  ids.forEach(id=>{
    deleted.push(records.splice(records.findIndex(item=>item.id === id), 1))
  })
  return builder(deleted)
}

export const handleGet = (options, records) =>{
  const id = parseInt(options.url.match(/.*\/(\d+)/)[1])
  const record = records.find(item=>item.id === id)
  return builder(record)
}

export const handleUpdate = (options, records) => {
  const id = parseInt(options.url.match(/.*\/(\d+)/)[1])
  const record = JSON.parse(options.body)
  records.splice(records.findIndex(item=>item.id === id), 1, record)
  return builder(record)
}

export const handleCreate = (options, records)=>{
  const record = JSON.parse(options.body)
  record.id = new Date().getTime()
  record.createdAt = new Date().getTime()
  record.updatedAt = new Date().getTime()
  records.push(record)
  return builder(record)
}
