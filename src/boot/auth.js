import { boot } from 'quasar/wrappers'
import { ACCESS_TOKEN } from '@/store/mutation-types'

const whiteList = ['/login', '/register', '/registerResult']

/**
 * 处理 tagView 和 面包屑
 * @param to
 */
function handleTagViewAndBreadcrumbsAndKeepAlive (store, to) {
  // console.log('to:', to)
  if (to.name != null) {
    document.title = to.meta.title + ' | ' + process.env.PRODUCT_NAME
    // console.log('handleTagViewAndBreadcrumbs, to:', to)
    // LoadingBar.start()

    // 判断是否为刷新操作，如果是刷新操作则从 sessionStorage 获取保存的 tagView 信息
    // let tagViewOnSS = []
    // JSON.parse(window.sessionStorage.getItem('tagView')) === null ? window.sessionStorage.setItem('tagView', '[]') : tagViewOnSS = JSON.parse(window.sessionStorage.getItem('tagView'))
    // if (store.getters.getTagView.length === 0 && tagViewOnSS.length !== 0) {
    //   setTagView(tagViewOnSS)
    //   store.commit('SET_KEEPALIVE_LIST', tagViewOnSS)
    // } else {
    //   addTagView(to)
    // }
    if(!to.meta.sharetab){
      // if(store.state.user.routeTabs.find(item=>item.fullPath === to.fullPath)){
      //   store.commit('user/clearRouteTabs')
      // }
      // if(!store.state.user.routeTabs.find(item=>item.fullPath === to.fullPath)){
      //   store.commit('user/clearRouteTabs')
      // }
    }
    let routeTab = {
      fullPath: to.fullPath,
      name: to.name,
      title: to.meta.title,
      icon: to.meta.icon,
    }
    if(!store.state.user.routeTabs.find(item=>item.fullPath === to.fullPath)){
      store.commit('user/addRouteTab', routeTab)
    }

    // console.log('routeTabs:', store.state.user.routeTabs)

    let breadcrumbs = getBreadcrumbs(to.matched, to.query)
    store.commit('user/setBreadcrumbs', breadcrumbs)
    // console.log('breadcrumbs:', store.state.user.breadcrumbs)
    // handleKeepAlive(to)
  }
}

/**
 * 获取 matched 中的路径 title，并生成面包屑
 * @param matched to.matched[]
 * @param query 参数
 */
function getBreadcrumbs (matched, query) {
  // console.log('matched>>>>>>>>>>>>>',matched)
  let breadcrumbs = []
  matched.forEach((route, index)=>{
    if(route.path==='/home'){
      breadcrumbs = []
    }
    if(route.path==='/'){
      breadcrumbs.push({
        title: '首页',
        path: route.path,
        icon: 'mdi-home-outline',
      })
    }else if(index>0 && route.path!==matched[index-1].redirect){
      breadcrumbs.push({
        title: route.meta.title,
        path: route.path,
        icon: route.meta.icon
      })
    }
  })
  return breadcrumbs
}

/**
 * 处理多余的 layout : router-view，让当前组件保持在第一层 index : router-view 之下
 * 这个方法无法过滤用来做嵌套路由的按需加载的 <layout>
 * @param to
 */
function handleKeepAlive (to) {
  if (to.matched && to.matched.length > 2) {
    for (let i = 0; i < to.matched.length; i++) {
      const element = to.matched[i]
      if (element.components.default.name === 'Layout') {
        to.matched.splice(i, 1)
        handleKeepAlive(to)
      }
    }
  }
}

// "async" is optional;
// more info on params: https://v2.quasar.dev/quasar-cli/boot-files
export default boot(async ({ app, router, store}) => {
  // something to do
  // console.log('before route change, state.user.menus:', store.state.user.menus.length)
  if(store.state.user.permissions.length == 0) {
    await store.dispatch('user/reload')
  }
  router.beforeEach((to, from, next) => {
    // console.log('before each, to: ',to, ' from: ', from, ' next: ', next)
    // console.log('to.fullPath:', to.fullPath, ', to.path:', to.path)
    const token = store.state.user.token
    // sessionStorage.setItem(ACCESS_TOKEN,'123')
    // console.log('token:', token)
    // console.log('user:', store.state.user.user)

    if (token) {
      if (to.path === '/login') {
        next({ path: '/home' })
      } if(to.path === '/logout'){
        store.commit("user/clear")
        next({path:'/login'})
      } else {
        handleTagViewAndBreadcrumbsAndKeepAlive(store, to)
        // console.log('state.user.menus:', store.state.user.menus)
        // 请求带有 redirect 重定向时，登录自动重定向到该地址
        // const redirect = decodeURIComponent(from.query.redirect || to.path)
        // if (to.path === redirect) {
        //   // set the replace: true so the navigation will not leave a history record
        //   next({ ...to, replace: true })
        // } else {
        //   // 跳转到目的路由
        //   next({ path: redirect })
        // }
        // console.log(router.getRoutes())
        next()
      }
    } else {
      // 如果要前往白名单的路由，则放行
      if(whiteList.some((item) => { return item === to.path})){
        next()
      }else{
        next( {path: '/login'})
      }
    }
  })
})
