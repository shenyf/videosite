<template>
  <div class="tree-menu">
    <span :key="item.path" v-for="item in data">
      <nav-item :data="item"></nav-item>
    </span>
  </div>
</template>

<script>
import {watch, defineComponent} from "vue";
import NavItem from "./NavItem";
export default defineComponent({
  props: {
    data: {
      type: [Object, Array],
      required: true,
    },
  },
  data() {
    return {

    };
  },
  methods: {},
  components: {
    NavItem,
  },
  created() {
  }
});
</script>
<style lang="sass"></style>
