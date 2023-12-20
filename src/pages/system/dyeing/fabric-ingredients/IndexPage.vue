<template>
  <q-page class="q-pa-sm">
    <smart-grid
      ref="fabricIngredientGrid"
      :config="fabricIngredientGridConfig"
    ></smart-grid>
    <form-dialog
      ref="fabricIngredientEditor"
      :config="fabricIngredientEditorConfig"
    />
  </q-page>
</template>
<script setup>
import {ref,onMounted} from "vue";
import { useQuasar } from 'quasar'
import moment from "moment";
import { pageFabricIngredients, getFabricIngredient, removeFabricIngredient, removeFabricIngredients, updateFabricIngredient, createFabricIngredient}from "@/api/system/fabric-ingredient";
import { listDyeTypes} from "src/api/system/dye-type";
import SmartGrid from "components/grid/SmartGrid.vue";
import FormDialog from "components/dialog/FormDialog.vue"
import { column_slot_status } from "components/grid/gridmate";

const $q = useQuasar()
const fabricIngredientGrid = ref(null)
const fabricIngredientEditor = ref(null)
const dyeTypes = ref([])

const fabricIngredientGridConfig = {
  title: '染料类型列表',
  columns: [{
    name: 'code', label: '编码', field: 'code', align: 'center'
  }, {
    name: 'name', label: '名称', field:'name', align: 'center', sortable: true
  }, {
    name: 'dyeTypeName', label: '适用染料类型', field: row=>row.dyeType? row.dyeType.name : ''
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
        getFabricIngredient(selectedRecord.id).then((res)=>{
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
        confirmText: '确认删除该面料成份？',
        handler: (selectedRecord)=>{
          removeFabricIngredient(selectedRecord.id).then((res)=>{
            $q.notify({
              message: '面料成份已删除！',
              position: 'top'
            })
            fabricIngredientGrid.value.loadData()
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
      const count = fabricIngredientGrid.value.selected.length
      if(count>0){
        $q.dialog({
          title: '确认',
          message: `确认删除这 ${count} 条记录？`,
          cancel: true,
          persistent: true
        }).onOk(()=>{
          removeFabricIngredients(fabricIngredientGrid.value.selected.map(item=>item.id)).then((res)=>{
            $q.notify({
              message: '面料成份已删除！',
              position: 'top'
            })
            fabricIngredientGrid.value.loadData()
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
    placeholder: '面料成份名称|编码'
  }],
  pagination: {
    sortBy: 'name',
    descending: false,
    page: 1,
    rowsPerPage: 13,
    rowsNumber: 0
  },
  loadData: (params)=>{
    return pageFabricIngredients(params)
  }
}

const fabricIngredientEditorConfig = ref({
  width: '640px',
  layout: [{
    col: 12,
    fields: [{
      xtype: 'input',
      model: 'name',
      label: '名称',
      maxlength: 12,
      rules: [
        val => (val && val.length >= 1) && /^[\u4E00-\u9FA5A-Za-z0-9]+$/.test(val) || '名称必须是1~12位中英文字符或数字'
      ],
      col: 6,
    }, {
      xtype: 'input',
      model: 'code',
      label: '编码',
      maxlength: 20,
      rules: [
        val => val && val.length >= 1 || '面料成份编码长度至少1位'
      ],
      col: 6
    }, {
      xtype: 'select',
      model: 'dyeTypeId',
      label: '适用染料类型',
      options: dyeTypes,
      valueField: 'id',
      labelField: 'name',
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
})

const showAdder = () =>{
  fabricIngredientEditor.value.show({
    title: '新增面料成份',
    data: {
      status: 'NORMAL',
    },
    onSubmit: (newRecord)=>{
      createFabricIngredient(newRecord).then((res)=>{
        $q.notify({
          message: '面料成份已创建！',
          position: 'top'
        })
        fabricIngredientGrid.value.loadData()
        fabricIngredientEditor.value.hide()
      })
    }
  })
}

const showUpdater = (selectedRecord)=>{
  fabricIngredientEditor.value.show({
    title: '修改面料成份',
    data: selectedRecord,
    onSubmit: (updatedRecord)=>{
      console.log(updatedRecord,'<<<<<<<<<<<<<<,,updated')
      updateFabricIngredient(selectedRecord.id, updatedRecord).then((res)=>{
        $q.notify({
          message: '面料成份已更新！',
          position: 'top'
        })
        fabricIngredientGrid.value.loadData()
        fabricIngredientEditor.value.hide()
      })
    }
  });
}

onMounted(()=>{
  listDyeTypes().then((res)=>{
    dyeTypes.value = res.data
  })
})
</script>
