<template>
  <q-table
    ref="grid"
    :title="config.title"
    :rows="rows"
    :columns="config.columns"
    :selection="config.selection || 'multiple'"
    row-key="id"
    v-model:selected="selected"
    v-model:pagination="pagination"
    :rows-per-page-options="pagination ? [1, 5, 10, 20, 50, 100] : [0]"
    :loading="loading"
    @request="onRequest"
    @update:selected="onUpdateSelected"
    :hide-bottom="config.hideBottom"
    :style="`width: ${config.width}; height: ${config.height};`"
    virtual-scroll
    :virtual-scroll-sticky-size-start="48"
    class="grid"
  >
    <template v-slot:top v-if="config.topBar">
      <template v-for="(item,index) in config.topBar" :key="index">
        <q-btn v-if="item.xtype==='button'"
               :class="item.class || 'q-ml-sm'"
               :color="item.color"
               :disable="loading"
               :label="item.label"
               :icon="item.icon"
               @click="item.handler()">
          <q-tooltip v-if="item.tooltip" :class="`bg-${item.color}`">{{item.tooltip}}</q-tooltip>
        </q-btn>
        <q-btn v-if="item.xtype==='move-row-up'"
               :class="item.class || 'q-ml-sm'"
               :color="item.color"
               :disable="loading"
               :label="item.label"
               :icon="item.icon || 'arrow_upward'"
               :size="item.size || 'xs'"
               :round="item.round || true"
               @click="()=>{if(selected.length>0){ const index = rows.findIndex(item=>item.id === selected[0].id); if(index > 0){rows.splice(index,1); rows.splice(index-1, 0, selected[0])}}}">
          <q-tooltip v-if="item.tooltip" :class="`bg-${item.color}`">{{item.tooltip}}</q-tooltip>
        </q-btn>
        <q-btn v-if="item.xtype==='move-row-down'"
               :class="item.class || 'q-ml-sm'"
               :color="item.color"
               :disable="loading"
               :label="item.label"
               :icon="item.icon || 'arrow_downward'"
               :size="item.size || 'xs'"
               :round="item.round || true"
               @click="()=>{if(selected.length>0){ const index = rows.findIndex(item=>item.id === selected[0].id); if(index< rows.length-1){rows.splice(index,1); rows.splice(index+1, 0, selected[0])}}}">
          <q-tooltip v-if="item.tooltip" :class="`bg-${item.color}`">{{item.tooltip}}</q-tooltip>
        </q-btn>
        <q-btn v-if="item.xtype==='remove-row'"
               :class="item.class || 'q-ml-sm'"
               :color="item.color"
               :disable="loading"
               :label="item.label"
               :icon="item.icon || 'remove'"
               :size="item.size || 'xs'"
               :round="item.round || true"
               @click="()=>{if(selected.length>0){ rows.splice(rows.findIndex(item=>item.id === selected[0].id),1)}}">
          <q-tooltip v-if="item.tooltip" :class="`bg-${item.color}`">{{item.tooltip}}</q-tooltip>
        </q-btn>
        <q-space v-if="item.xtype==='space'"/>
        <q-input v-if="item.xtype==='search'"
                 borderless dense debounce="300"
                 :color="item.color"
                 v-model="query.conditions[item.model]"
                 :placeholder="item.placeholder"
                 :style="`width: ${item.width};border-bottom:1px solid`"
                 @keydown.enter="loadData()"
        >
          <template v-slot:append>
            <q-icon v-if="query.conditions[item.model] !== undefined && query.conditions[item.model] !== ''" name="close" class="cursor-pointer" @click="query.conditions[item.model]='';loadData()"/>
            <q-icon name="search" class="cursor-pointer" @click="loadData()"/>
          </template>
        </q-input>
        <q-select
          v-if="item.xtype==='appender'"
          borderless dense
          :clas="item.class"
          v-model="toolbar.values[item.model]"
          :use-input="item.editable"
          input-debounce="100"
          :label="item.label"
          :options="toolbar.options[item.model]"
          :option-value="opt => Object(opt) === opt && item.valueField in opt ? opt[item.valueField] : null"
          :option-label="opt => Object(opt) === opt && item.labelField in opt ? opt[item.labelField] : '- Null -'"
          @filter="(val, update)=>update(()=>{item.search({conditions: {searchText: val}}).then(res=>{toolbar.options[item.model] = res.data.filter(itemSelectable=>!rows.find(itemSelected=>itemSelected.id === itemSelectable.id))})})"
          @update:model-value="val=>{rows.splice(rows.length, 0, val); toolbar.values[item.model]=null;}"
          :style="`width: ${item.width};`"
          behavior="menu"
        >
          <template v-slot:no-option>
            <q-item>
              <q-item-section class="text-grey">
                No results
              </q-item-section>
            </q-item>
          </template>
        </q-select>
      </template>
    </template>
    <template v-slot:body-cell-ACTIONS="props" v-if="actionColumnConfigs">
      <q-td :props="props">
        <template v-for="(item,index) in actionColumnConfigs" :key="index">
          <q-btn v-if="!item.xtype"
                 :color="item.color"
                 :style="`display: ${item.hidden && ((typeof(item.hidden) === 'function' && item.hidden(props.row)) || (typeof(item.hidden)==='boolean' && item.hidden))? 'none' : ''}`"
                 :disable="item.disabled && ((typeof(item.disabled) === 'function' && item.disabled(props.row)) || (typeof(item.disabled)==='boolean' && item.disabled))"
                 @click="item.confirm ? $q.dialog({title: '确认', message: item.confirmText, cancel: true, persistent: true}).onOk(()=>{item.handler(props.row)}) : item.handler(props.row)"
                 :label="item.label"
                 flat
          ></q-btn>
          <q-btn-dropdown flat v-if="item.xtype==='button-group'" :color="item.color" :label="item.label">
            <q-list v-for="(gitem, gindex) in item.items" :key="gindex">
              <q-item clickable v-close-popup @click="gitem.confirm ? $q.dialog({title: '确认', message: gitem.confirmText, cancel: true, persistent: true}).onOk(()=>{gitem.handler(props.row)
          }) : gitem.handler(props.row)">
                <q-item-section>
                  <q-item-label :class="`text-${gitem.color}`">{{ gitem.label }}</q-item-label>
                </q-item-section>
              </q-item>
            </q-list>
          </q-btn-dropdown>
        </template>
      </q-td>
    </template>
    <template v-for="(col,index) in config.columns.filter(item=>item.name!=='ACTIONS' && item.slot)" v-slot:[populateBodyCellName(col.name)]="props" :key="index">
      <q-td :props="props">
        <div v-if="col.slot.xtype==='badge'">
          <q-badge v-if="props.value && col.slot.format" :color="col.slot.format[props.value].color" :label="col.slot.format[props.value].text" />
          <q-badge v-else-if="col.slot.format" :color="col.slot.format[col.slot.defaultValue].color" :label="col.slot.format[col.slot.defaultValue].text"/>
          <q-badge v-else-if="props.value" :color="props.value" :label="props.value" :style="`background-color:${props.value.startsWith('#')? props.value : ''};color: ${autoHighContrastColor(props.value)}`"/>
        </div>
        <div v-else>
          {{props.value}}
        </div>
      </q-td>
    </template>
  </q-table>
</template>
<script setup>
import {ref, defineProps, defineExpose, computed, watch, onMounted} from "vue";
import {autoHighContrastColor} from "utils/color"

const props = defineProps({
  config: {
    type: Object,
    default: ()=>{
      return {
        events: {

        }
      }
    }
  },
  data: {
    type: Array,
    default: ()=>{
      return []
    }
  }
})

const rows = ref(props.data)
const query = ref({
  conditions:{}
})
const autoload = ref(props.config.autoload === undefined ? true : props.config.autoload)
const selected = ref([])
const loading = ref(false)
const pagination = ref(props.config.pagination)
const actionColumn = ref(props.config.columns.find(item=>item.name==='ACTIONS'))
const actionColumnConfigs = ref(actionColumn.value ? actionColumn.value.actions : [])
const toolbar = ref({
  options: {},
  values: {},
  newValues: {}
})

const loadData=()=>{
  query.value.pageIndex = pagination.value.page-1
  query.value.pageSize = pagination.value.rowsPerPage
  query.value.sorters = [{
    field: pagination.value.sortBy,
    direction: pagination.value.descending ? 'DESC' : 'ASC'
  }]
  if(props.config.loadData){
    props.config.loadData(query.value).then((res)=>{
      rows.value = res.data.content
      pagination.value.rowsNumber = res.data.totalElements
    }).finally(()=>{
      loading.value = false
    })
  }
}

const clearQuery = ()=>{
  pagination.value.page = 1
  query.value.conditions = {}
}

const onRequest=(params)=>{
  pagination.value = params.pagination
  loadData()
}

const onUpdateSelected=(newSelected)=>{
  if(props.config.events && props.config.events.onUpdateSelected){
    props.config.events.onUpdateSelected(newSelected)
  }
}

const populateBodyCellName=(fieldName)=>{
  return 'body-cell-'+fieldName
}

const emit = defineEmits(['rows-changed'])

watch(rows, (newRows)=>{
  emit('rows-changed', newRows)
},{deep: true})

onMounted(()=>{
  if(autoload.value==true){
    loadData()
  }
})

defineExpose({
  clearQuery,
  loadData,
  selected,
  rows,
})
</script>
<style lang="sass">
.grid
  //max-width: 600px
  .q-table__top
    padding-bottom: 0px

  ///* height or max-height is important */
  //.q-table__top,
  //.q-table__bottom,
  //thead tr:first-child th /* bg color is important for th; just specify one */
  //  background-color: #00b4ff

  //thead tr th
  //  position: sticky
  //  z-index: 1
  /* this will be the loading indicator */
  //thead tr:last-child th
  //  /* height of all previous header rows */
  //  top: 48px
  //thead tr:first-child th
  //  top: 0

  th:first-child,td:first-child
    //background-color: #00b4ff
    position: sticky
    left: 0
    z-index: 1
  /* prevent scrolling behind sticky top row on focus */
  tbody
    /* height of all previous header rows */
    scroll-margin-top: 48px
</style>
