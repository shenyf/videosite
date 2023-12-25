<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="toggleLeftDrawer"
        />

        <q-toolbar-title>
          先进排程系统
        </q-toolbar-title>

        <div>Quasar v{{ $q.version }}</div>
      </q-toolbar>
<!--      <q-toolbar class="q-pr-none">-->
<!--        <q-breadcrumbs active-color="white" class="text-body1">-->
<!--          <q-breadcrumbs-el label="Home" icon="home" />-->
<!--          <q-breadcrumbs-el label="Components" icon="widgets" />-->
<!--          <q-breadcrumbs-el label="Toolbar" />-->
<!--        </q-breadcrumbs>-->
<!--        <q-space/>-->
<!--        <nav-tabs/>-->
<!--      </q-toolbar>-->
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      bordered
    >
      <q-btn flat class="ly-icon-btn bg-primary text-white">
<!--        <q-icon name="mdi-alpha-g" class="q-mr-none" size="8em"/>-->
        <div class="text-h4">LEGO</div>
        <q-tooltip anchor="center right" self="center left">欢迎使用吉黄智能排程系统</q-tooltip>
      </q-btn>
      <q-scroll-area class="col main-menu">
        <nav-tree :data="filterMenus(menus)" />
      </q-scroll-area>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { defineComponent, ref } from 'vue'
import { debounce } from "quasar";
import NavTree from "components/navigation/NavTree";
import NavTabs from "./NavTabs.vue";

export default defineComponent({
  name: 'MainLayout',

  components: {
    NavTree,
    // NavTabs
  },
  data(){
    return {
      menus: [{
        title: '首页',
        icon: 'mdi-home-outline',
        path: '/home',
      },{
        title: '系统管理',
        icon: 'mdi-cog-outline',
        path: '/system',
        children: [{
          title: '工艺管理',
          icon: 'mdi-atom',
          path: '/system/flow',
          children: [{
            title: '工序管理',
            icon: 'mdi-circle-medium',
            path: '/system/flow/processes',
            permission: 'SYS_PROCESS_VIEW',
          }/**, {
            title: '工艺路线管理',
            icon: 'mdi-circle-medium',
            path: '/system/flow/flowes',
            permission: 'SYS_PROCESS_VIEW',
          }**/]
        }, {
          title: '机械管理',
          icon: 'mdi-camera-gopro',
          path: '/system/device',
          children: [/**{
            title: '设备分组',
            icon: 'mdi-circle-medium',
            path: '/system/machine/machine-groups'
          }, **/{
            title: '机械品牌管理',
            icon: 'mdi-circle-medium',
            path: '/system/machine/brands'
          }, {
            title: '染缸',
            icon: 'mdi-circle-medium',
            path: '/system/machine/dyevats'
          }, {
            title: '定型机',
            icon: 'mdi-circle-medium',
            path: '/system/machine/stenters'
          }]
        }, {
          title: '染色管理',
          icon: 'mdi-palette-outline',
          path: '/system/dyeing',
          children: [{
            title: '颜色管理',
            icon: 'mdi-circle-medium',
            path: '/system/dyeing/colors'
          }, {
            title: '染料类型管理',
            icon: 'mdi-circle-medium',
            path: '/system/dyeing/dye-types',
          }, {
            title: '面料成份管理',
            icon: 'mdi-circle-medium',
            path: '/system/dyeing/fabric-ingredients'
          }, {
            title: '洗缸方式管理',
            icon: 'mdi-circle-medium',
            path: '/system/dyeing/dyevat-wash-types',
          }, {
            title: '染缸洗缸成本管理',
            icon: 'mdi-circle-medium',
            path: '/system/dyeing/dyevat-wash-costs',
          }, {
            title: '颜色冲突规则',
            icon: 'mdi-circle-medium',
            path: '/system/dyeing/color-clashes',
          }]
        }, {
          title: '用户管理',
          icon: 'mdi-circle-medium',
          path: '/system/users',
          permission: 'SYS_USER_VIEW'
        }, {
          title: '角色管理',
          icon: 'mdi-circle-medium',
          path: '/system/roles',
          permission: 'SYS_ROLE_VIEW'
        }, {
          title: '日志管理',
          icon: 'mdi-circle-medium',
          path: '/system/logs',
          permission: 'SYS_LOG_VIEW'
        }]
      }, {
        title: '排产管理',
        icon: 'mdi-calendar-month',
        path: '/plan',
        children: [{
          title: '排产总览',
          icon: 'mdi-circle-medium',
          path: '/plan/overview',
        }, {
          title: '生产卡管理',
          icon: 'mdi-circle-medium',
          path: '/plan/production-cards',
        }, {
          title: '生产卡排产',
          icon: 'mdi-circle-medium',
          path: '/plan/builds',
        }]
      }, {
        title: '统计分析',
        icon: 'mdi-chart-bar',
        path: '/statistic',
        children: [{
          title: '统计1',
          icon: 'mdi-circle-medium',
          path: '/statistic/report1'
        }, {
          title: '统计2',
          icon: 'mdi-circle-medium',
          path: '/statistic/report2'
        }]
      }]
    }
  },
  methods: {
    doResize() {
      this.leftDrawerOpen = this.$q.screen.gt.sm;
      this.overlay = this.$q.screen.lt.sm;
    },
    filterMenus(menus){
      let filtered = []
      menus.forEach(menu=>{
        if(menu.children){
          let clone = Object.assign({}, menu)

          const children = this.filterMenus(menu.children)
          if(children && children.length>0){
            clone.children = children
            filtered.push(clone)
          }
        }else if(!('permission' in menu) || this.$store.state.user.permissions.includes(menu.permission)){
          filtered.push(menu)
        }
      })
      return filtered
    },
    setDesTab() {},
    // test() {
    //   this.$router.push("/system/menus");
    // },
  },

  watch: {
    // $route(to) {
    //   if (!this.$store.state.Rule.routeTabs.some((r) => r.path === to.path)) {
    //     this.$store.commit('Rule/addRouteTabs', { name: to.meta.title, path: to.path });
    //   }
    // },
    screenWidth() {
      this.onResize();
    },
  },

  computed: {
    welcomeInfo() {
      return `欢迎您，${this.$store.state.User.info.realname}`;
    },
    screenWidth() {
      return this.$q.screen.width;
    },
  },

  setup () {
    const leftDrawerOpen = ref(false)

    return {
      tab: ref("images"),
      leftDrawerOpen,
      toggleLeftDrawer () {
        leftDrawerOpen.value = !leftDrawerOpen.value
      }
    }
  },

  mounted() {
    this.onResize = debounce(this.doResize, 500);
    this.onResize();
  },
})
</script>
<style lang="sass" scoped>
$logo-height: 100px

.cc-active-menu
  border-right: '0.2em solid #1890ff'

.hide-icon
  display: none

.ly-icon-btn
  line-height: 50px
  height: $logo-height
  width: 100%
  border-bottom: 1px #63a0f2 solid
  border-radius: 0

.q-item__section--main ~ .q-item__section--side
  padding-left: 0px

.q-item__section--avatar
  min-width: 30px

.q-item__section--side
  padding-right: 5px

.main-menu
  height: calc(100% - #{$logo-height})
  .q-item
    min-height: 35px

</style>
