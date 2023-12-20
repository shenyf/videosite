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
      ref="machineGroupGrid"
      :config="machineGroupGridConfig"
    ></smart-grid>
    <form-dialog
      ref="machineGroupEditor"
      :config="machineGroupEditorConfig"
    />
  </q-page>
</template>
<script setup>
import { ref, onMounted, watch } from "vue";
import { useQuasar } from 'quasar'
import moment from "moment";
import { pageMachineGroups, getMachineGroup, removeMachineGroup, removeMachineGroups, updateMachineGroup, createMachineGroup}from "@/api/system/machine-group";
import { listDevices} from "src/api/system/machine";
import SmartGrid from "components/grid/SmartGrid.vue";
import FormDialog from "components/dialog/FormDialog.vue"
import { column_slot_status } from "components/grid/gridmate";
import {MACHINE_TYPES} from "src/api/system/machine-type";

const $q = useQuasar()
const machineGroupGrid = ref(null)
const machineGroupEditor = ref(null)
const machineType = ref('DYEVAT')

const machineGroupGridConfig = {
  title: '机械组列表',
  columns: [ {
    name: 'name', label: '名称', field:'name', align: 'center', sortable: true
  }, {
    name: 'status', label: '状态', field: 'status',align: 'center', sortable: true,
    slot: column_slot_status,
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
        getMachineGroup(selectedRecord.id).then((res)=>{
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
        confirmText: '确认删除该机械组？',
        handler: (selectedRecord)=>{
          removeMachineGroup(selectedRecord.id).then((res)=>{
            $q.notify({
              message: '机械组已删除！',
              position: 'top'
            })
            machineGroupGrid.value.loadData()
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
      const count = machineGroupGrid.value.selected.length
      if(count>0){
        $q.dialog({
          title: '确认',
          message: `确认删除这 ${count} 条记录？`,
          cancel: true,
          persistent: true
        }).onOk(()=>{
          removeMachineGroups(machineGroupGrid.value.selected.map(item=>item.id)).then((res)=>{
            $q.notify({
              message: '机械组已删除！',
              position: 'top'
            })
            machineGroupGrid.value.loadData()
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
    placeholder: '机械组名称|编码'
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
    return pageMachineGroups(params)
  }
}

const machineGridConfig = {
  title: '机械列表',
  selection: 'single',
  height: '450px',
  columns: [ {
    name: 'name', label: '名称', field:'name', align: 'center'
  }, {
    name: 'code', label: '编码', field: 'code', align: 'center'
  }],
  topBar: [{
    xtype: 'remove-row',
    color: 'negative',
    tooltip: '删除',
  }, {
    xtype: 'space'
  }, {
    xtype: 'appender',
    width: '200px',
    model: 'select-append',
    label: '搜索并添加',
    editable: true,
    valueField: 'id',
    labelField: 'name',
    search: (params)=>{
      const {conditions} = params
      conditions.machineType = machineType.value
      return listDevices({conditions})
    }
  }],
  hideBottom: true,
}

const machineGroupEditorConfig = {
  width: '900px',
  height: '600px',
  layout: [{
    col: 6,
    fields: [{
      xtype: 'input',
      model: 'name',
      label: '名称',
      maxlength: 12,
      rules: [
        val => (val && val.length >= 2) && /^[\u4E00-\u9FA5A-Za-z0-9]+$/.test(val) || '名称必须是2~12位中英文字符或数字'
      ],
      col: 6,
    },{
      xtype: 'input',
      type: 'textarea',
      model: 'note',
      maxlength: 255,
      label: '备注',
      rows: 3,
      col: 12
    },{
      xtype: 'toggle',
      model: 'status',
      trueLabel: '启用',
      trueValue: 'NORMAL',
      falseLabel: '禁用',
      falseValue: 'DISABLED',
      col: 6
    }]
  },{
    col: 6,
    fields: [{
      xtype: 'grid',
      model: 'procedures',
      componentConfig: machineGridConfig,
      col: 12
    }],
  }],
}

const showAdder = () =>{
  machineGroupEditor.value.show({
    title: '新增机械组',
    data: {
      machineType: machineType.value,
      status: 'NORMAL',
    },
    onSubmit: (newRecord)=>{
      createMachineGroup(newRecord).then((res)=>{
        $q.notify({
          message: '机械组已创建！',
          position: 'top'
        })
        machineGroupGrid.value.loadData()
        machineGroupEditor.value.hide()
      })
    }
  })
}

const showUpdater = (selectedRecord)=>{
  machineGroupEditor.value.show({
    title: '修改机械组',
    data: selectedRecord,
    onSubmit: (updatedRecord)=>{
      updateMachineGroup(selectedRecord.id, updatedRecord).then((res)=>{
        $q.notify({
          message: '机械组已更新！',
          position: 'top'
        })
        machineGroupGrid.value.loadData()
        machineGroupEditor.value.hide()
      })
    }
  });
}

watch(machineType, (newValue)=>{
  machineGroupGrid.value.clearQuery()
  machineGroupGrid.value.loadData()
})
</script>
