
const routes = [{
    path: '/login',
    component: ()=>import('layouts/LoginLayout.vue'),
    children: [{
      path: '', component: ()=> import('pages/LoginPage.vue')}
    ]
  }, {
    path: '/',
    component: () => import('layouts/HomeLayout.vue'),
    redirect: 'home',
    children: [{
      path: 'home', component: () => import('pages/HomePage.vue')
    }]
  }, {
    path: '/subjects',
    component: ()=> import('layouts/SubjectLayout.vue'),
    children: [{
      path: ':id', component: ()=>import('pages/subjects/IndexPage.vue')
    }]
  }, {
    path: '/series',
    component: ()=>import('layouts/SeriesLayout.vue'),
    children: [{
      path: ':id', component: ()=>import('pages/series/IndexPage.vue')
    }]
  }, {
    path: '/system',
    component: ()=> import("layouts/HomeLayout.vue"),
    redirect: '/system/users',
    children: [{
      path: 'users', component: ()=> import('pages/system/users/IndexPage.vue')
    }, {
      path: 'roles', component: () =>import('pages/system/roles/IndexPage.vue')
    }, {
      path: 'flow',
      redirect: '/system/flow/processes',
      children: [{
        path: 'processes', component: ()=>import('pages/system/flow/processes/IndexPage.vue')
      }, {
        path: 'flowes', component: ()=>import('pages/system/flow/flowes/IndexPage.vue')
      }]
    }, {
      path: 'dyeing',
      redirect: '/system/dyeing/colors',
      children:[{
        path: 'colors', component: ()=>import('pages/system/dyeing/colors/IndexPage.vue')
      }, {
        path: 'color-clashes', component: ()=>import('pages/system/dyeing/color-clashes/IndexPage.vue')
      }, {
        path: 'dye-types', component: ()=>import('pages/system/dyeing/dye-types/IndexPage.vue')
      }, {
        path: 'fabric-ingredients', component: ()=>import('pages/system/dyeing/fabric-ingredients/IndexPage.vue')
      }, {
        path: 'dyevat-wash-types', component: ()=>import('pages/system/dyeing/dyevat-wash-types/IndexPage.vue')
      }, {
        path: 'dyevat-wash-costs', component: ()=>import('pages/system/dyeing/dyevat-wash-costs/IndexPage.vue')
      }]
    }, {
      path: 'machine',
      redirect: '/system/machine/groups',
      children: [/**{
        path: 'groups', component: ()=>import('pages/system/machine/machine-groups/IndexPage.vue')
      }, **/{
        path: 'brands', component: ()=>import('pages/system/machine/brands/IndexPage.vue')
      }, {
        path: 'dyevats', component: ()=>import('pages/system/machine/dyevats/IndexPage.vue')
      }, {
        path: 'stenters', component: ()=>import('pages/system/machine/stenters/IndexPage.vue')
      }]
    }, ]
  }, {
    path: '/plan',
    component: ()=> import("layouts/HomeLayout.vue"),
    redirect: '/plan/overview',
    children: [{
      path: 'overview', component: ()=> import('pages/plan/OverView.vue')
    }, {
      path: 'orders', component: ()=>import('pages/plan/orders/IndexPage.vue'),
    }, {
      path: 'order-items', component: ()=>import('pages/plan/order-items/IndexPage.vue')
    }, {
      path: 'production-cards', component: ()=>import('pages/plan/production-cards/IndexPage.vue')
    }, {
      path: 'builds', component:()=>import('pages/plan/builds/IndexPage.vue')
    }]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue')
  }
]

export default routes
