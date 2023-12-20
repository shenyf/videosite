import { isIE } from '/src/utils/util'

// 判断环境不是 prod 或者 preview 是 true 时，加载 mock 服务
if (process.env.NODE_ENV !== 'production' || process.env.VUE_APP_PREVIEW === 'true') {
  if (isIE()) {
    console.error('[antd-pro] ERROR: `mockjs` NOT SUPPORT `IE` PLEASE DO NOT USE IN `production` ENV.')
  }
  // 使用同步加载依赖
  // 防止 vuex 中的 GetInfo 早于 mock 运行，导致无法 mock 请求返回结果
  console.log('Mock mounting')
  const Mock = require('mockjs2')
  // require('./api/auth')
  require('./api/user')
  require('./api/system/user')
  require('./api/system/role')
  require('./api/system/flow')
  require('./api/system/process')
  require('./api/system/color')
  require('./api/system/color-clash')
  require('./api/system/machine-group')
  require('./api/system/machine')
  require('./api/system/dye-type')
  require('./api/system/fabric-ingredient')
  require('./api/system/dyevat-wash-type')
  require('./api/system/machine-brand')
  require('./api/system/dyevat-wash-cost')
  require('./api/plan/production-card')
  require('./api/plan/overview')
  require('./api/plan/build')
  require('./api/plan/scheme')
  // require('./api/admin/depts')
  // require('./api/manage')
  // require('./api/other')
  // require('./api/tagCloud')
  // require('./api/article')

  Mock.setup({
    timeout: 800 // setter delay time
  })
  console.log('Mock mounted')
}
