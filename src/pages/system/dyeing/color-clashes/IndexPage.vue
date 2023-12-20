<template>
  <q-table
    ref="vat-wash-rule-grid"
    :rows="rows"
    :columns="columns"
    :rows-per-page-options="[0]"
    row-key="name"
    :loading="loading"
    hide-bottom
    virtual-scroll
    class="q-pa-sm vat-wash-rule-grid"
  >
    <template v-slot:header-cell="props">
      <q-th :props="props" :style="`background-color:${props.col.rgb};color: ${autoHighContrastColor(props.col.rgb)}`">
        {{ props.col.label }}
      </q-th>
    </template>
    <template v-slot:body-cell="props">
      <q-td v-if="props.col.field==='name'" :props="props" :style="`background-color: ${props.row.rgb};color: ${autoHighContrastColor(props.row.rgb)}`">
        {{props.row.name}}
      </q-td>
      <q-td v-else style="text-align: center;">
        <div>
          <q-icon v-if="props.value.clash==false" name="done" color="light-green" size="24px"/>
          <div v-else v-for="(type,index) in dyevatWashTypes" :key="index">
            <q-badge v-if="props.value.dyevatWashTypeId==type.id" :color="LEVERED_COLORS[index>LEVERED_COLORS.length-1? LEVERED_COLORS.length-1: index]" rounded>{{type.name}}</q-badge>
          </div>
        </div>
        <q-popup-edit
          v-model="props.row.clashRules[props.col.id].dyevatWashTypeId"
          buttons v-slot="scope"
          :title="`${props.row.name} vs ${props.col.label}`"
          label-set="确定"
          label-cancel="取消"
          @save="(val, initVal)=>{doSave(props.row.id, props.col.id, val)}">
          <q-radio keep-color v-for="(type,index) in dyevatWashTypes" v-model="scope.value" :val="type.id" :label="type.name" :color="LEVERED_COLORS[index>LEVERED_COLORS.length-1? LEVERED_COLORS.length-1: index]" :key="index"/>
        </q-popup-edit>
      </q-td>
    </template>
  </q-table>
</template>
<script setup>
import _ from 'lodash';
import {ref,onMounted} from "vue";
import { useQuasar } from 'quasar'
import moment from "moment";
import {listRules, saveRule} from "src/api/system/color-clash";
import { listDyevatWashTypes} from "src/api/system/dyevat-wash-type";
import {autoHighContrastColor} from "utils/color"
const $q = useQuasar()

const columns = ref([])
const rows = ref([])
const loading = ref(false)
const dyevatWashTypes = ref([])
const LEVERED_COLORS = ['light-green', 'yellow','red']

const doSave = (colorId, nextColorId, val)=>{
  const data = {colorId: colorId, nextColorId: nextColorId}
  if(val===-1){
    data.clash = false
    data.dyevatWashTypeId = null
  }else{
    data.clash = true
    data.dyevatWashTypeId = val
  }
  saveRule(data).then((res)=>{
    const color = rows.value.find(item=>item.id === colorId)
    color.clashRules[nextColorId] = data
    $q.notify({
      message: '规则已更新！',
      position: 'top'
    })
  })
}

const loadData=()=>{
  loading.value = true
  listRules().then((res)=>{
    let cols = res.data.map(item=>{
      return {
        id: item.id, name: item.code, label: item.name, rgb: item.rgb, field: row=>row.clashRules[item.id], align: 'center'
      }
    })
    cols.unshift({
      name: 'name', label: '', field: 'name', align:'center',
    })
    columns.value = cols
    rows.value = res.data.map(color=>{
      const clone = _.cloneDeep(color)
      clone.clashRules = {}
      color.clashRules.forEach(r=>{
        clone.clashRules[r.nextColorId] = r
      })
      return clone
    })
  }).finally(()=>{
    loading.value = false
  })
}

onMounted(()=>{
  listDyevatWashTypes().then(res=>{
    dyevatWashTypes.value = [{id: -1, name: '免洗'}, ...res.data]
    loadData()
  })
})
</script>
