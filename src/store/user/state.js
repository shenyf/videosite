
const ALL_MENUS = [{
  'title': '首页',
  'icon': 'mdi-home-outline',
  'path': '/home',
},{
  'title': '系统管理',
  'icon': 'mdi-cog-outline',
  'path': '/system',
  'children': [{
    'title': '角色管理',
    'icon': 'mdi-circle-medium',
    'path': '/system/roles',
    'permission': 'SYS_ROLE_VIEW'
  }, {
    'title': '用户管理',
    'icon': 'mdi-circle-medium',
    'path': '/system/users',
    'permission': 'SYS_USER_VIEW'
  }, {
    'title': '日志管理',
    'icon': 'mdi-circle-medium',
    'path': '/system/logs',
    'permission': 'SYS_LOG_VIEW'
  }]
}, {
  'title': '计划管理',
  'icon': 'mdi-calendar-month',
  'path': '/plan',
  'children': [{
    'title': '排产总览',
    'icon': 'mdi-circle-medium',
    'path': '/plan/overview',
    'permission': 'PLAN_OVERVIEW'
  }, {
    'title': '订单管理',
    'icon': 'mdi-circle-medium',
    'path': '/plan/orders',
    'permission': 'PLAN_ORDER_VIEW'
  }, {
    'title': '主计划排产',
    'icon': 'mdi-circle-medium',
    'path': '/plan/schedules',
    'permission': 'PLAN_SCHEDULE_VIEW'
  }]
}, {
  'title': '统计分析',
  'icon': 'mdi-chart-box',
  'path': '/statistic',
  'children': [{
    'title': '统计1',
    'icon': 'mdi-circle-medium',
    'path': '/statistic/report1'
  }, {
    'title': '统计2',
    'icon': 'mdi-circle-medium',
    'path': '/statistic/report2'
  }]
}]
export default function () {
  return {
    //
    id: null,
    username: null,
    permissions: [],
    token: sessionStorage.token || '',
    breadcrumbs: [],
    //标签页
    routeTabs: [],
  }
}
