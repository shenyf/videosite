<template>
  <q-page class="q-pa-sm">
    <smart-grid
      ref="dyevatWashCostGrid"
      :config="dyevatWashCostGridConfig"
    ></smart-grid>
    <form-dialog
      ref="dyevatWashCostEditor"
      :config="dyevatWashCostEditorConfig"
    />
  </q-page>
</template>
<script setup>
import {ref,onMounted} from "vue";
import { useQuasar } from 'quasar'
import moment from "moment";
import { pageDyevatWashCosts, getDyevatWashCost, removeDyevatWashCost, removeDyevatWashCosts, updateDyevatWashCost, createDyevatWashCost, DYEVAT_CATEGORY}from "@/api/system/dyevat-wash-cost";
import SmartGrid from "components/grid/SmartGrid.vue";
import FormDialog from "components/dialog/FormDialog.vue"
import { column_slot_status } from "components/grid/gridmate";
import { listMachineBrands } from "src/api/system/machine-brand";
import { listDyevatWashTypes } from "src/api/system/dyevat-wash-type";

const $q = useQuasar()
const dyevatWashCostGrid = ref(null)
const dyevatWashCostEditor = ref(null)
const machineBrands = ref([])
const dyevatWashTypes = ref([])

const dyevatWashCostGridConfig = {
  title: '洗缸成本计算规则列表',
  columns: [{
    name: 'dyevatBrand', label: '染缸品牌', field: row=>row.dyevatBrand? row.dyevatBrand.name : '', align: 'center', sortable: true
  }, {
    name: 'dyevatCategory', label: '染缸类型', field: row=>row.dyevatCategory? DYEVAT_CATEGORY[row.dyevatCategory] : ''
  }, {
    name: 'tubes', label: '缸管数', field: 'tubes'
  }, {
    name: 'dyevatWashType', label: '洗缸方式', field: row=>row.dyevatWashType? row.dyevatWashType.name : ''
  }, {
    name: 'takeTime', label: '耗时(分钟)', field: 'takeTime'
  }, {
    name: 'electricity', label: '耗电量(千瓦时)', field: 'electricity'
  }, {
    name: 'gas', label: '耗气量(立方米)', field: 'gas'
  }, {
    name: 'water', label: '耗水量(立方米)', field: 'water'
  }, {
    name: 'accessory', label: '辅材消耗(元)', field: 'accessory'
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
        getDyevatWashCost(selectedRecord.id).then((res)=>{
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
        confirmText: '确认删除该洗缸成本计算规则？',
        handler: (selectedRecord)=>{
          removeDyevatWashCost(selectedRecord.id).then((res)=>{
            $q.notify({
              message: '洗缸成本计算规则已删除！',
              position: 'top'
            })
            dyevatWashCostGrid.value.loadData()
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
      const count = dyevatWashCostGrid.value.selected.length
      if(count>0){
        $q.dialog({
          title: '确认',
          message: `确认删除这 ${count} 条记录？`,
          cancel: true,
          persistent: true
        }).onOk(()=>{
          removeDyevatWashCosts(dyevatWashCostGrid.value.selected.map(item=>item.id)).then((res)=>{
            $q.notify({
              message: '洗缸成本计算规则已删除！',
              position: 'top'
            })
            dyevatWashCostGrid.value.loadData()
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
    placeholder: '染缸品牌'
  }],
  pagination: {
    sortBy: 'createdAt',
    descending: true,
    page: 1,
    rowsPerPage: 13,
    rowsNumber: 0
  },
  loadData: (params)=>{
    return pageDyevatWashCosts(params)
  }
}

const dyevatWashCostEditorConfig = ref({
  width: '640px',
  layout: [{
    col: 12,
    fields: [{
      xtype: 'select',
      model: 'dyevatBrandId',
      label: '机械品牌',
      options: machineBrands,
      valueField: 'id',
      labelField: 'name',
      col: 6,
    }, {
      xtype: 'option-group',
      model: 'dyevatCategory',
      label: '染缸类型',
      options: [{
        label: '溢流缸',
        value: 'OVERFLOW'
      }, {
        label: '气流缸',
        value: 'AIRFLOW'
      }],
      inline: true,
      col: 6,
    }, {
      xtype: 'input',
      type: 'number',
      model: 'tubes',
      min: 0,
      label: '管数',
      col: 3,
    }, {
      xtype: 'option-group',
      model: 'dyevatWashTypeId',
      label: '洗缸方式',
      options: dyevatWashTypes,
      inline: true,
      col: 9,
    }, {
      xtype: 'input',
      type: 'number',
      model: 'takeTime',
      min: 0,
      label: '耗时',
      suffix: '分钟',
      col: 3,
    }, {
      xtype: 'input',
      type: 'number',
      model: 'electricity',
      min: 0,
      label: '耗电',
      suffix: 'kW·h',
      decimal: true,
      col: 3,
    }, {
      xtype: 'input',
      type: 'number',
      model: 'gas',
      min: 0,
      label: '耗汽',
      suffix: '立方米',
      decimal: true,
      col: 3,
    }, {
      xtype: 'input',
      type: 'number',
      model: 'water',
      min: 0,
      label: '耗水',
      suffix: '立方米',
      decimal: true,
      col: 3,
    }, {
      xtype: 'input',
      type: 'number',
      model: 'accessory',
      min: 0,
      label: '辅材消耗',
      suffix: '元',
      decimal: true,
      col: 3,
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
})

const showAdder = () =>{
  dyevatWashCostEditor.value.show({
    title: '新增洗缸成本计算规则',
    data: {
      status: 'NORMAL'
    },
    onSubmit: (newRecord)=>{
      createDyevatWashCost(newRecord).then((res)=>{
        $q.notify({
          message: '洗缸成本计算规则已创建！',
          position: 'top'
        })
        dyevatWashCostGrid.value.loadData()
        dyevatWashCostEditor.value.hide()
      })
    }
  })
}

const showUpdater = (selectedRecord)=>{
  dyevatWashCostEditor.value.show({
    title: '修改洗缸成本计算规则',
    data: selectedRecord,
    onSubmit: (updatedRecord)=>{
      updateDyevatWashCost(selectedRecord.id, updatedRecord).then((res)=>{
        $q.notify({
          message: '洗缸成本计算规则已更新！',
          position: 'top'
        })
        dyevatWashCostGrid.value.loadData()
        dyevatWashCostEditor.value.hide()
      })
    }
  });
}

onMounted(()=>{
  listMachineBrands({conditions: {machineType : 'DYEVAT'}}).then((res)=>{
    machineBrands.value = res.data
  })
  listDyevatWashTypes().then(res=>{
    dyevatWashTypes.value = res.data.map(t=>{return {label: t.name, value: t.id}})
  })
})
</script>
