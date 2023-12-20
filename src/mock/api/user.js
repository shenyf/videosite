import Mock from 'mockjs2'
import { builder } from '../util'

const user = {
  'id': '4291d7da9005377ec9aec4a71ea837f',
  'name': '系统管理员',
  'username': 'admin',
  'avatar': '/avatar2.jpg',
}

const permissions = ['SYS_USER_VIEW', 'SYS_USER_ADD','SYS_USER_MOD','SYS_USER_DEL', 'SYS_ROLE_VIEW', 'SYS_PROCESS_VIEW','SYS_PROCEDURE_VIEW']

const identityRes = (options) => {
  return builder({
    'user': user,
    'permissions': permissions
  })
}

const loginRes = (option) => {
  return builder({
    'token': 'abcdef-123456',
    // 'user': user,
    // 'menus': menus
  })
}

const logoutRes = (option) => {
  return builder()
}


Mock.mock(/\/api\/user\/identity/, 'get', identityRes)
Mock.mock(/\/api\/user\/login/, 'post', loginRes)
Mock.mock(/\/api\/user\/logout/, 'get', logoutRes)
