<template>
  <q-page class="q-pa-sm">
    <smart-grid
      ref="flowGrid"
      :config="flowGridConfig"
    ></smart-grid>
    <form-dialog
      ref="flowEditor"
      :config="flowEditorConfig"
    />
  </q-page>
</template>
<script setup>
import {ref,onMounted} from "vue";
import { useQuasar } from 'quasar'
import moment from "moment";
import { pageFlowes, getFlow, removeFlow, removeFlowes, updateFlow, createFlow}from "@/api/system/flow";
import { listProcesses, STANDARD_SPEED_UNITS } from "src/api/system/process";
import SmartGrid from "components/grid/SmartGrid.vue";
import FormDialog from "components/dialog/FormDialog.vue"
import { column_slot_status } from "components/grid/gridmate";

const $q = useQuasar()
const flowGrid = ref(null)
const flowEditor = ref(null)

const flowGridConfig = {
  title: '工艺路线列表',
  columns: [ {
    name: 'name', label: '名称', field:'name', align: 'center', sortable: true
  }, {
    name: 'code', label: '编码', field: 'code', align: 'center'
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
        getFlow(selectedRecord.id).then((res)=>{
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
        confirmText: '确认删除该工艺路线？',
        handler: (selectedRecord)=>{
          removeFlow(selectedRecord.id).then((res)=>{
            $q.notify({
              message: '工艺路线已删除！',
              position: 'top'
            })
            flowGrid.value.loadData()
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
    handler: ()=>{
      const count = flowGrid.value.selected.length
      if(count>0){
        $q.dialog({
          title: '确认',
          message: `确认删除这 ${count} 条记录？`,
          cancel: true,
          persistent: true
        }).onOk(()=>{
          removeFlowes(flowGrid.value.selected.map(item=>item.id)).then((res)=>{
            $q.notify({
              message: '工艺路线已删除！',
              position: 'top'
            })
            flowGrid.value.loadData()
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
    placeholder: '工艺路线名称|编码'
  }],
  pagination: {
    sortBy: 'name',
    descending: false,
    page: 1,
    rowsPerPage: 13,
    rowsNumber: 0
  },
  loadData: (params)=>{
    return pageFlowes(params)
  }
}

const processGridConfig = {
  title: '工序列表',
  selection: 'single',
  height: '450px',
  columns: [ {
    name: 'code', label: '编码', field: 'code', align: 'center'
  }, {
    name: 'name', label: '名称', field:'name', align: 'center'
  }, {
    name: 'standardTime', label: '标准速率', field: 'standardTime', align: 'right',
    format: (val, row)=> val === null ? '' : val+' '+ STANDARD_SPEED_UNITS[row['timeUnit']]
  }],
  topBar: [{
    xtype: 'move-row-up',
    color: 'primary',
    tooltip: '上移',
  }, {
    xtype: 'move-row-down',
    color: 'primary',
    tooltip: '下移',
  }, {
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
      return listProcesses({conditions})
    }
  }],
  hideBottom: true,
}

const flowEditorConfig = {
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
      col: 8,
    },{
      xtype: 'input',
      model: 'code',
      label: '编码',
      maxlength: 20,
      rules: [
        val => val && val.length >= 2 || '工艺路线编码长度至少2位'
      ],
      col: 8
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
      col: 12
    }]
  },{
    col: 6,
    fields: [{
      xtype: 'grid',
      model: 'processes',
      componentConfig: processGridConfig,
      col: 12
    }],
  }],
}

const showAdder = () =>{
  flowEditor.value.show({
    title: '新增工艺路线',
    data: {
      status: 'NORMAL'
    },
    onSubmit: (newRecord)=>{
      createFlow(newRecord).then((res)=>{
        $q.notify({
          message: '工艺路线已创建！',
          position: 'top'
        })
        flowGrid.value.loadData()
        flowEditor.value.hide()
      })
    }
  })
}

const showUpdater = (selectedRecord)=>{
  flowEditor.value.show({
    title: '修改工艺路线',
    data: selectedRecord,
    onSubmit: (updatedRecord)=>{
      updateFlow(selectedRecord.id, updatedRecord).then((res)=>{
        $q.notify({
          message: '工艺路线已更新！',
          position: 'top'
        })
        flowGrid.value.loadData()
        flowEditor.value.hide()
      })
    }
  });
}
</script>
