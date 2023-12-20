<template>
  <q-tabs
    v-model="tab"
    align="left"
    mobile-arrows
    class="col-8 bg-grey-9"
    style="border-top-left-radius: 15px;"
  >
    <q-tab v-for="(item, index) in tabs" :name="item.label" :key="index">
      <span>{{item.label}}
      <q-btn padding="none" round icon="close" size="sm" color="warning" flat style="margin-top: -20px;" @click="closeTab(tab)"></q-btn></span>
    </q-tab>
    <!--          <q-tab name="articles1" label="Articles" />-->
    <!--          <q-tab name="articles2" label="Articles" />-->
    <!--          <q-tab name="articles3" label="Articles" />-->
    <!--          <q-tab name="articles4" label="Articles" />-->
    <!--          <q-tab name="articles5" label="Articles" />-->
    <!--          <q-tab name="articles6" label="Articles" />-->
    <!--          <q-tab name="articles7" label="Articles" />-->
    <!--          <q-tab name="articles8" label="Articles" />-->
    <!--          <q-tab name="articles9" label="Articles" />-->
    <!--          <q-tab name="articles10" label="Articles" />-->
    <!--          <q-tab name="articles11" label="Articles" />-->
    <!--          <q-tab name="articles12" label="Articles" />-->
    <!--          <q-tab name="articles13" label="Articles" />-->
    <!--          <q-tab name="articles14" label="Articles" />-->
    <!--          <q-tab name="articles15" label="Articles" />-->
    <!--          <q-tab name="articles16" label="Articles" />-->
    <!--          <q-tab name="articles17" label="Articles" />-->
    <!--          <q-tab name="articles18" label="Articles" />-->
    <!--          <q-tab name="articles19" label="Articles" />-->
    <!--          <q-tab name="articles20" label="Articles" />-->
  </q-tabs>
</template>
<script setup>
import { ref } from "vue";

const activeTab = ref('设备管理')
const tabs = ref([{
  label: '设备管理',
}, {
  label: '颜色管理',
}, {
  label: '工单管理',
}])
</script>
