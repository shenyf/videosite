<template>
  <q-page class="q-pa-sm">
    <smart-grid
      ref="dyeTypeGrid"
      :config="dyeTypeGridConfig"
    ></smart-grid>
    <form-dialog
      ref="dyeTypeEditor"
      :config="dyeTypeEditorConfig"
    />
  </q-page>
</template>
<script setup>
import {ref,onMounted} from "vue";
import { useQuasar } from 'quasar'
import moment from "moment";
import { pageDyeTypes, getDyeType, removeDyeType, removeDyeTypes, updateDyeType, createDyeType}from "@/api/system/dye-type";
import SmartGrid from "components/grid/SmartGrid.vue";
import FormDialog from "components/dialog/FormDialog.vue"
import { column_slot_status } from "components/grid/gridmate";

const $q = useQuasar()
const dyeTypeGrid = ref(null)
const dyeTypeEditor = ref(null)

const dyeTypeGridConfig = {
  title: '染料类型列表',
  columns: [{
    name: 'code', label: '编码', field: 'code', align: 'center'
  }, {
    name: 'name', label: '名称', field:'name', align: 'center', sortable: true
  }, {
    name: 'minTemperature', label: '最低工作温度', field: 'minTemperature'
  }, {
    name: 'maxTemperature', label: '最高工作温度', field: 'maxTemperature'
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
        getDyeType(selectedRecord.id).then((res)=>{
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
        confirmText: '确认删除该染料类型？',
        handler: (selectedRecord)=>{
          removeDyeType(selectedRecord.id).then((res)=>{
            $q.notify({
              message: '染料类型已删除！',
              position: 'top'
            })
            dyeTypeGrid.value.loadData()
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
      const count = dyeTypeGrid.value.selected.length
      if(count>0){
        $q.dialog({
          title: '确认',
          message: `确认删除这 ${count} 条记录？`,
          cancel: true,
          persistent: true
        }).onOk(()=>{
          removeDyeTypes(dyeTypeGrid.value.selected.map(item=>item.id)).then((res)=>{
            $q.notify({
              message: '染料类型已删除！',
              position: 'top'
            })
            dyeTypeGrid.value.loadData()
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
    placeholder: '染料类型名称|编码'
  }],
  pagination: {
    sortBy: 'name',
    descending: false,
    page: 1,
    rowsPerPage: 13,
    rowsNumber: 0
  },
  loadData: (params)=>{
    return pageDyeTypes(params)
  }
}

const dyeTypeEditorConfig = {
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
      model: 'code',
      label: '编码',
      maxlength: 20,
      rules: [
        val => val && val.length >= 2 || '染料类型编码长度至少2位'
      ],
      col: 6
    }, {
      xtype: 'input',
      type: 'number',
      model: 'minTemperature',
      min: 0,
      label: '最低工作温度',
      decimal: true,
      rules: [
        val => val || '最低工作温度不能为空'
      ],
      col: 6,
    }, {
      xtype: 'input',
      type: 'number',
      model: 'maxTemperature',
      min: 0,
      label: '最高工作温度',
      decimal: true,
      rules: [
        val => val || '最高工作温度不能为空'
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
    }, {
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
  dyeTypeEditor.value.show({
    title: '新增染料类型',
    data: {
      status: 'NORMAL'
    },
    onSubmit: (newRecord)=>{
      createDyeType(newRecord).then((res)=>{
        $q.notify({
          message: '染料类型已创建！',
          position: 'top'
        })
        dyeTypeGrid.value.loadData()
        dyeTypeEditor.value.hide()
      })
    }
  })
}

const showUpdater = (selectedRecord)=>{
  dyeTypeEditor.value.show({
    title: '修改染料类型',
    data: selectedRecord,
    onSubmit: (updatedRecord)=>{
      updateDyeType(selectedRecord.id, updatedRecord).then((res)=>{
        $q.notify({
          message: '染料类型已更新！',
          position: 'top'
        })
        dyeTypeGrid.value.loadData()
        dyeTypeEditor.value.hide()
      })
    }
  });
}
</script>
