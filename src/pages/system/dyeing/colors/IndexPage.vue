<template>
  <q-page class="q-pa-sm">
    <smart-grid
      ref="colorGrid"
      :config="colorGridConfig"
    ></smart-grid>
    <form-dialog
      ref="colorEditor"
      :config="colorEditorConfig"
    />
  </q-page>
</template>
<script setup>
import {ref,onMounted} from "vue";
import { useQuasar } from 'quasar'
import moment from "moment";
import { pageColors, getColor, removeColor, removeColors, updateColor, createColor}from "@/api/system/color";
import SmartGrid from "components/grid/SmartGrid.vue";
import FormDialog from "components/dialog/FormDialog.vue"
import { column_slot_status } from "components/grid/gridmate";

const $q = useQuasar()
const colorGrid = ref(null)
const colorEditor = ref(null)

const colorGridConfig = {
  title: '颜色列表',
  columns: [ {
    name: 'code', label: '编码', field: 'code', align: 'center'
  }, {
    name: 'name', label: '名称', field:'name', align: 'center', sortable: true
  }, {
    name: 'rgb', label: 'RGB值', field: 'rgb', align: 'center',
    slot: {
      xtype: 'badge',
    }
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
        getColor(selectedRecord.id).then((res)=>{
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
        confirmText: '确认删除该颜色？',
        handler: (selectedRecord)=>{
          removeColor(selectedRecord.id).then((res)=>{
            $q.notify({
              message: '颜色已删除！',
              position: 'top'
            })
            colorGrid.value.loadData()
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
      const count = colorGrid.value.selected.length
      if(count>0){
        $q.dialog({
          title: '确认',
          message: `确认删除这 ${count} 条记录？`,
          cancel: true,
          persistent: true
        }).onOk(()=>{
          removeColors(colorGrid.value.selected.map(item=>item.id)).then((res)=>{
            $q.notify({
              message: '颜色已删除！',
              position: 'top'
            })
            colorGrid.value.loadData()
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
    placeholder: '颜色名称|编码'
  }],
  pagination: {
    sortBy: 'displayOrder',
    descending: false,
    page: 1,
    rowsPerPage: 13,
    rowsNumber: 0
  },
  loadData: (params)=>{
    return pageColors(params)
  }
}

const colorEditorConfig = {
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
        val => val && val.length >= 2 || '颜色编码长度至少2位'
      ],
      col: 6
    },{
      xtype: 'input',
      model: 'rgb',
      maxlength: 7,
      minlength: 7,
      label: '颜色',
      col: 6,
    },{
      xtype: 'input',
      type: 'number',
      model: 'displayOrder',
      min: 0,
      label: '排序',
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
  }],
}

const showAdder = () =>{
  colorEditor.value.show({
    title: '新增颜色',
    data: {
      status: 'NORMAL'
    },
    onSubmit: (newRecord)=>{
      createColor(newRecord).then((res)=>{
        $q.notify({
          message: '颜色已创建！',
          position: 'top'
        })
        colorGrid.value.loadData()
        colorEditor.value.hide()
      })
    }
  })
}

const showUpdater = (selectedRecord)=>{
  colorEditor.value.show({
    title: '修改颜色',
    data: selectedRecord,
    onSubmit: (updatedRecord)=>{
      updateColor(selectedRecord.id, updatedRecord).then((res)=>{
        $q.notify({
          message: '颜色已更新！',
          position: 'top'
        })
        colorGrid.value.loadData()
        colorEditor.value.hide()
      })
    }
  });
}
</script>
