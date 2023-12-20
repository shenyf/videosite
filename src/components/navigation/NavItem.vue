<template>
  <q-expansion-item
    v-model="open"
    :group="data.path"
    :content-inset-level="0.5"
    :label="data.title"
    :icon="data.icon"
    :header-style="headerStyleActive(data)"
    v-if="hasChild"
  >
    <nav-item
      v-for="item in data.children"
      :data="item"
      :key="item.path"
    ></nav-item>
  </q-expansion-item>
  <q-expansion-item
    v-else
    :icon="data.icon"
    :label="data.title"
    :hide-expand-icon="true"
    @click="onclick(data)"
    :style="itemStyleActive(data)"
  />
</template>

<script>
// import EventBus from "components/tree/EventBus";

const headerStyleDefault = { color: "#1890ff" };
const itemStyleDefault = {
  color: "#1890ff",
  backgroundColor: "#e6f7ff",
  borderRight: "0.2em solid #1890ff",
};
// const itemStyleUnActiveDefault = { color: "black" };
// const itemClassDefault = 'active-item-class'
export default {
  name: "NavItem",
  props: {
    data: {
      type: [Object, Array],
      required: true,
    },
    activeHeaderStyle: {
      type: Object,
      required: false,
    },
    activeItemStyle: {
      type: Object,
      required: false,
    },
  },
  data() {
    return {
      open: false,
    };
  },
  computed: {
    hasChild() {
      return (
        this.data.children &&
        this.data.children.filter((v) => {
          return v.hidden === undefined || v.hidden === false;
        }).length
      );
    },
    currentPath() {
      return this.$route.path;
    },
  },
  methods: {
    onclick(menu) {
      if (menu.internalOrExternal) {
        openURL(menu.path);
      } else if (menu.path !== this.$route.path) {
        this.$router.push(menu);
      }
    },
    headerStyleActive(item) {
      const items = this.$route.path.split('/')
      const paths = []
      for(var i=1;i<items.length-1;i++){
        paths.push('/'+items.slice(1,i+1).join('/'))
      }
      if (paths.indexOf(item.path)!=-1) {
        return {
          color: "#1890ff",
        };
      }
      return {};
    },
    itemStyleActive(item) {
      if (
        item.path === this.$route.path ||
        this.$route.path.startsWith(item.path)
      ) {
        return {
          color: "#1890ff",
          backgroundColor: "#e3f2fd",
          borderRight: "0.2em solid #1976D2",
        };
      }
      return {};
    },
  },
  mounted() {
    this.open =
      this.$route.name !== this.data.name &&
      this.$route.name.startsWith(this.data.name);
  },
  created() {},
  watch: {
    // $route: {
    //   handler: function (val, oldVal) {
    //     this.onclick(this.buildActiveItem(val.path));
    //   },
    //   // 深度观察监听
    //   deep: true,
    // },
  },
};
</script>

<style lang="sass">
.active-item-class
  color: #1890ff
  background-color: #e6f7ff
</style>
