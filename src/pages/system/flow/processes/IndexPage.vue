<template>
  <q-page class="q-pa-sm">
    <smart-grid
      ref="processGrid"
      :config="processGridConfig"
    ></smart-grid>
    <form-dialog
      ref="processEditor"
      :config="processEditorConfig"
    />
  </q-page>
</template>
<script setup>
import {ref,onMounted} from "vue";
import { useQuasar } from 'quasar'
import moment from "moment";
import { pageProcesses, getProcess, removeProcess, removeProcesses, updateProcess, createProcess, STANDARD_SPEED_UNITS, STANDARD_SPEED_UNITS_OPTIONS}from "@/api/system/process";
import SmartGrid from "components/grid/SmartGrid.vue";
import FormDialog from "components/dialog/FormDialog.vue"
import { column_slot_status } from "components/grid/gridmate";

const $q = useQuasar()
const processGrid = ref(null)
const processEditor = ref(null)

const processGridConfig = {
  title: '工序列表',
  columns: [{
    name: 'code', label: '编码', field: 'code', align: 'center'
  }, {
    name: 'name', label: '名称', field:'name', align: 'center', sortable: true
  }, {
    name: 'standardTime', label: '标准工时', field: 'standardTime', align: 'right',
    format: (val, row)=> val === null ? '' : val+' '+ STANDARD_SPEED_UNITS[row['timingUnit']]
  }, {
    name: 'leadTime', label: '前置时间（分钟）', field: 'leadTime', align: 'right'
  }, {
    name: 'postTime', label: '后置时间（分钟）', field: 'postTime', align: 'right'
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
        getProcess(selectedRecord.id).then((res)=>{
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
        confirmText: '确认删除该工序？',
        handler: (selectedRecord)=>{
          removeProcess(selectedRecord.id).then((res)=>{
            $q.notify({
              message: '工序已删除！',
              position: 'top'
            })
            processGrid.value.loadData()
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
      const count = processGrid.value.selected.length
      if(count>0){
        $q.dialog({
          title: '确认',
          message: `确认删除这 ${count} 条记录？`,
          cancel: true,
          persistent: true
        }).onOk(()=>{
          removeProcesses(processGrid.value.selected.map(item=>item.id)).then((res)=>{
            $q.notify({
              message: '工序已删除！',
              position: 'top'
            })
            processGrid.value.loadData()
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
    placeholder: '工序名称|编码'
  }],
  pagination: {
    sortBy: 'name',
    descending: false,
    page: 1,
    rowsPerPage: 13,
    rowsNumber: 0
  },
  loadData: (params)=>{
    return pageProcesses(params)
  }
}

const processEditorConfig = {
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
    },{
      xtype: 'input',
      model: 'code',
      label: '编码',
      maxlength: 20,
      rules: [
        val => val && val.length >= 2 || '工序编码长度至少2位'
      ],
      col: 6
    },{
      xtype: 'input',
      type: 'number',
      model: 'standardTime',
      min: 1,
      label: '标准工时',
      decimal: true,
      col: 2,
    },{
      xtype: 'select',
      model: 'timingUnit',
      label: '单位',
      options: STANDARD_SPEED_UNITS_OPTIONS,
      valueField: 'value',
      labelField: 'label',
      col: 2,
    },{
      xtype: 'input',
      type: 'number',
      model: 'leadTime',
      min: 0,
      label: '前置时间（单位:分钟）',
      col: 4,
    },{
      xtype: 'input',
      type: 'number',
      model: 'postTime',
      min: 0,
      label: '后置时间（单位:分钟）',
      col: 4,
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
  }],
}

const showAdder = () =>{
  processEditor.value.show({
    title: '新增工序',
    data: {
      status: 'NORMAL',
      standardTime: 10,
      timingUnit: 'MINUTE',
      leadTime: 0,
      postTime: 0,
    },
    onSubmit: (newRecord)=>{
      createProcess(newRecord).then((res)=>{
        $q.notify({
          message: '工序已创建！',
          position: 'top'
        })
        processGrid.value.loadData()
        processEditor.value.hide()
      })
    }
  })
}

const showUpdater = (selectedRecord)=>{
  processEditor.value.show({
    title: '修改工序',
    data: selectedRecord,
    onSubmit: (updatedRecord)=>{
      updateProcess(selectedRecord.id, updatedRecord).then((res)=>{
        $q.notify({
          message: '工序已更新！',
          position: 'top'
        })
        processGrid.value.loadData()
        processEditor.value.hide()
      })
    }
  });
}
</script>
