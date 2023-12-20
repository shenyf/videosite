<template>
  <q-page class="q-pa-sm">
    <q-tabs
      v-model="machineType"
      outside-arrows
      inline-label
      indicator-color="primary"
    >
      <q-tab v-for="(item, code) in MACHINE_TYPES" :key="code" :name="code" :label="item.name" :icon="item.icon"/>
    </q-tabs>
    <smart-grid
      ref="machineBrandGrid"
      :config="machineBrandGridConfig"
    ></smart-grid>
    <form-dialog
      ref="machineBrandEditor"
      :config="machineBrandEditorConfig"
    />
  </q-page>
</template>
<script setup>
import {ref,onMounted, watch} from "vue";
import { useQuasar } from 'quasar'
import moment from "moment";
import { pageMachineBrands, getMachineBrand, removeMachineBrand, removeMachineBrands, updateMachineBrand, createMachineBrand}from "@/api/system/machine-brand";
import SmartGrid from "components/grid/SmartGrid.vue";
import FormDialog from "components/dialog/FormDialog.vue"
import { column_slot_status } from "components/grid/gridmate";
import { MACHINE_TYPES } from "src/api/system/machine-type";

const $q = useQuasar()
const machineBrandGrid = ref(null)
const machineBrandEditor = ref(null)
const machineType = ref('DYEVAT')

const machineBrandGridConfig = {
  title: '机械品牌列表',
  columns: [{
    name: 'name', label: '名称', field:'name', align: 'center', sortable: true
  }, {
    name: 'createdAt', label: '创建时间', field: 'createdAt', align: 'center', sortable: true,
    format: (val, row)=> val===null ? '' : moment(val).format('YYYY-MM-DD hh:mm:ss')
  }, {
    name: 'updatedAt', label: '更新时间', field: 'updatedAt', align: 'center', sortable: true,
    format: (val, row)=> val===null ? '' : moment(val).format('YYYY-MM-DD hh:mm:ss')
  }, {
    name: 'ACTIONS', label: '操作', align: 'center',classes: 'bg-grey-2', style:'width: 120px;max-width: 200px',
    actions: [{
      label: '修改',
      color: 'primary',
      handler: (selectedRecord)=>{
        getMachineBrand(selectedRecord.id).then((res)=>{
          showUpdater(res.data)
        })
      }
    }, {
      xtype: 'button-group',
      label: '更多',
      color: 'primary',
      items: [{
        label: '删除',
        color: 'negative',
        confirm: true,
        confirmText: '确认删除该机械品牌？',
        handler: (selectedRecord)=>{
          removeMachineBrand(selectedRecord.id).then((res)=>{
            $q.notify({
              message: '机械品牌已删除！',
              position: 'top'
            })
            machineBrandGrid.value.loadData()
          })
        }
      }]
    }]
  }],
  topBar: [{
    xtype: 'button',
    label: '新增',
    color: 'primary',
    icon: 'add_circle',
    handler: ()=>{
      showAdder()
    }
  }, {
    xtype: 'button',
    label: '删除',
    class: "q-ml-sm",
    color: 'negative',
    icon: 'remove_circle',
    disabled: 'selected.length==0',
    handler: ()=>{
      const count = machineBrandGrid.value.selected.length
      if(count>0){
        $q.dialog({
          title: '确认',
          message: `确认删除这 ${count} 条记录？`,
          cancel: true,
          persistent: true
        }).onOk(()=>{
          removeMachineBrands(machineBrandGrid.value.selected.map(item=>item.id)).then((res)=>{
            $q.notify({
              message: '机械品牌已删除！',
              position: 'top'
            })
            machineBrandGrid.value.loadData()
          })
        })
      }
    }
  }, {
    xtype: 'space'
  }, {
    xtype: 'search',
    width: '300px',
    model: 'searchText',
    placeholder: '机械品牌名称'
  }],
  pagination: {
    sortBy: 'name',
    descending: false,
    page: 1,
    rowsPerPage: 13,
    rowsNumber: 0
  },
  loadData: (params)=>{
    params.conditions.machineType = machineType.value
    return pageMachineBrands(params)
  }
}

const machineBrandEditorConfig = {
  width: '640px',
  layout: [{
    col: 12,
    fields: [{
      xtype: 'input',
      model: 'name',
      label: '名称',
      maxlength: 12,
      rules: [
        val => (val && val.length >= 2) && /^[\u4E00-\u9FA5A-Za-z0-9]+$/.test(val) || '名称必须是2~12位中英文字符或数字'
      ],
      col: 6,
    }, {
      xtype: 'input',
      type: 'textarea',
      model: 'note',
      maxlength: 255,
      label: '备注',
      rows: 3,
      col: 12
    }]
  }],
}

const showAdder = () =>{
  machineBrandEditor.value.show({
    title: '新增机械品牌',
    data: {
      machineType: machineType.value,
      status: 'NORMAL'
    },
    onSubmit: (newRecord)=>{
      createMachineBrand(newRecord).then((res)=>{
        $q.notify({
          message: '机械品牌已创建！',
          position: 'top'
        })
        machineBrandGrid.value.loadData()
        machineBrandEditor.value.hide()
      })
    }
  })
}

const showUpdater = (selectedRecord)=>{
  machineBrandEditor.value.show({
    title: '修改机械品牌',
    data: selectedRecord,
    onSubmit: (updatedRecord)=>{
      updateMachineBrand(selectedRecord.id, updatedRecord).then((res)=>{
        $q.notify({
          message: '机械品牌已更新！',
          position: 'top'
        })
        machineBrandGrid.value.loadData()
        machineBrandEditor.value.hide()
      })
    }
  });
}

watch(machineType, (newValue)=>{
  machineBrandGrid.value.clearQuery()
  machineBrandGrid.value.loadData()
})
</script>
