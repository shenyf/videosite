<template>
  <q-page class="q-pa-sm">
    <smart-grid
      ref="dyevatWashTypeGrid"
      :config="dyevatWashTypeGridConfig"
    ></smart-grid>
    <form-dialog
      ref="dyevatWashTypeEditor"
      :config="dyevatWashTypeEditorConfig"
    />
  </q-page>
</template>
<script setup>
import {ref,onMounted} from "vue";
import { useQuasar } from 'quasar'
import moment from "moment";
import { pageDyevatWashTypes, getDyevatWashType, removeDyevatWashType, removeDyevatWashTypes, updateDyevatWashType, createDyevatWashType}from "@/api/system/dyevat-wash-type";
import SmartGrid from "components/grid/SmartGrid.vue";
import FormDialog from "components/dialog/FormDialog.vue"
import { column_slot_status } from "components/grid/gridmate";

const $q = useQuasar()
const dyevatWashTypeGrid = ref(null)
const dyevatWashTypeEditor = ref(null)

const dyevatWashTypeGridConfig = {
  title: '染缸水洗方式列表',
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
        getDyevatWashType(selectedRecord.id).then((res)=>{
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
        confirmText: '确认删除该染缸水洗方式？',
        handler: (selectedRecord)=>{
          removeDyevatWashType(selectedRecord.id).then((res)=>{
            $q.notify({
              message: '染缸水洗方式已删除！',
              position: 'top'
            })
            dyevatWashTypeGrid.value.loadData()
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
      const count = dyevatWashTypeGrid.value.selected.length
      if(count>0){
        $q.dialog({
          title: '确认',
          message: `确认删除这 ${count} 条记录？`,
          cancel: true,
          persistent: true
        }).onOk(()=>{
          removeDyevatWashTypes(dyevatWashTypeGrid.value.selected.map(item=>item.id)).then((res)=>{
            $q.notify({
              message: '染缸水洗方式已删除！',
              position: 'top'
            })
            dyevatWashTypeGrid.value.loadData()
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
    placeholder: '染缸水洗方式名称|编码'
  }],
  pagination: {
    sortBy: 'name',
    descending: false,
    page: 1,
    rowsPerPage: 13,
    rowsNumber: 0
  },
  loadData: (params)=>{
    return pageDyevatWashTypes(params)
  }
}

const dyevatWashTypeEditorConfig = {
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
  dyevatWashTypeEditor.value.show({
    title: '新增染缸水洗方式',
    data: {
      status: 'NORMAL'
    },
    onSubmit: (newRecord)=>{
      createDyevatWashType(newRecord).then((res)=>{
        $q.notify({
          message: '染缸水洗方式已创建！',
          position: 'top'
        })
        dyevatWashTypeGrid.value.loadData()
        dyevatWashTypeEditor.value.hide()
      })
    }
  })
}

const showUpdater = (selectedRecord)=>{
  dyevatWashTypeEditor.value.show({
    title: '修改染缸水洗方式',
    data: selectedRecord,
    onSubmit: (updatedRecord)=>{
      updateDyevatWashType(selectedRecord.id, updatedRecord).then((res)=>{
        $q.notify({
          message: '染缸水洗方式已更新！',
          position: 'top'
        })
        dyevatWashTypeGrid.value.loadData()
        dyevatWashTypeEditor.value.hide()
      })
    }
  });
}
</script>
