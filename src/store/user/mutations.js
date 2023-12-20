import routes from '@/router/routes'
import {h, resolveComponent} from 'vue'

/*
export function someMutation (state) {
}
*/
// export function setId(state, id){
//   // sessionStorage.id = id
//   state.id = id
// }

// export function setUsername(state, username){
//   // sessionStorage.username = username
//   state.username = username
// }

// export function setMenus (state, menus) {
//   state.menus = menus
// }

// export function setUser(state, user){
//   state.user = user
//   state.id = user.id
//   state.username = user.name
// }

export function updateToken(state, token){
  sessionStorage.token = token
  state.token = token
}

export function updateIdentity(state, identity){
  state.id = identity.user.id
  state.username = identity.user.username
  state.permissions = identity.permissions
}

export function setBreadcrumbs(state, breadcrumbs){
  state.breadcrumbs = breadcrumbs
}

export function addRouteTab(state, route){
  if(!state.routeTabs.find((r)=>r.path === route.fullPath)) {
    state.routeTabs.push(route)
  }
  // console.log('route tabs:', state.routeTabs)
}

export function removeRouteTab(state, path){
  console.log(path, ' vs ', state.routeTabs[0], ',', state.routeTabs.length)
  if(state.routeTabs.length==1 && state.routeTabs[0].fullPath === '/home'){
    console.log("the only tab is /home, cant'be closed!!!")
    return
  }
  console.log('before remove routeTabs:', state.routeTabs, state.routeTabs.length)
  state.routeTabs.splice(state.routeTabs.findIndex((r)=>r.fullPath === path), 1)
  console.log('after remove routeTabs:', state.routeTabs, state.routeTabs.length)
  // if(state.routeTabs.length===0){
  //   console.log('router...........', this.$router)
  //   this.$router.push({path: '/'})
  // }
  // console.log('final routeTabs:', state.routeTabs, state.routeTabs.length)
}

export function clearRouteTabs(state){
  // console.log('before clear:', state.routeTabs)
  state.routeTabs = []
  console.log(state.routeTabs)
  // console.log('after clear: ', state.routeTabs)
}

function buildRoutes(menus){
  return menus.map(menu=>{
    let route = {
      path: menu.path,
      name: menu.name,
      redirect: menu.redirect,
      meta: {
        title: menu.title,
        icon: menu.icon,
        sharetab: menu.sharetab
      }
    }
    // console.log('>>>>>>>>>>menu:', menu)
    if(menu.page){
      const page = 'pages/Index.vue'
      route.component = ()=>import('@/pages/'+menu.page+'.vue')
    }else{
      // route.component = ()=>import('@/layouts/DefaultRouterView.vue')

      route.component = {
        render: ()=>{return h(resolveComponent('router-view'))}
      }
    }
    // console.log('>>>>>>>>>>>route:',route)
    if(menu.children){
      route.children = buildRoutes(menu.children)
    }
    return route
  })
}

export function updateAccesses(state, permissions){
  // console.log('.>>>>>>>>>>>>>', menus)
  state.menus = menus
  let routes = buildRoutes(menus);
  // console.log('>>>>>>>>>.routes', routes)
  // console.log('before add routes', this.$router.getRoutes())

  this.$router.addRoute({
    path: '/',
    name: 'root',
    component: () => import('layouts/HomeLayout.vue'),
    redirect: '/home',
    children: routes
  })

  // console.log(state)
  // console.log('router', this.$router.getRoutes())
}

export function clear(state){
  delete sessionStorage.token
  state.token = ''
  state.id = null
  state.username = null
  state.menus = []
}
