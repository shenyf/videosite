<template>
  <q-page class="q-pa-sm">
    <smart-grid
      ref="productionCardGrid"
      :config="productionCardGridConfig"
    ></smart-grid>
    <form-dialog
      ref="productionCardEditor"
      :config="productionCardEditorConfig"
    />
  </q-page>
</template>
<script setup>
import {ref,onMounted} from "vue";
import { useQuasar } from 'quasar'
import moment from "moment";
import { STATUS as PRODUCTION_CARD_STATUS, pageProductionCards, getProductionCard, removeProductionCard, removeProductionCards, updateProductionCard, createProductionCard}from "@/api/plan/production-card";
import SmartGrid from "components/grid/SmartGrid.vue";
import FormDialog from "components/dialog/FormDialog.vue"
import {listColors} from "src/api/system/color";
import { listProcesses, STANDARD_SPEED_UNITS } from "src/api/system/process";
moment.locale('zh-cn')

const $q = useQuasar()
const productionCardGrid = ref(null)
const productionCardEditor = ref(null)
const colors = ref([])
const column_slot_production_card_status = {
  xtype: 'badge',
  defaultValue: 'DISABLED',
  format: PRODUCTION_CARD_STATUS
}

const column_slot_production_card_process_status = {
  xtype: 'badge',
  defaultValue: 'PENDING',
  format: {
    PENDING: {
      text: '等待中',
      color: 'warning',
    },
    PROCESSING: {
      text: '进行中',
      color: 'primary',
    },
    COMPLETED: {
      text: '已完成',
      color: 'positive',
    }
  }
}

const productionCardGridConfig = {
  title: '生产卡列表',
  columns: [{
    name: 'code', label: '卡号', field: 'code', align: 'center'
  }, {
    name: 'deliveryTime', label: '交期', field: 'deliveryTime', align: 'center',
    format: (val, row)=> val===null ? '' : moment(val).format('YYYY-MM-DD')
  }, {
    name: 'rolls', label: '匹数', field: 'rolls',
  }, {
    name: 'weight', label: '重量(kg)', field: 'weight',
  }, {
    name: 'grayWidth', label: '坯布幅宽(mm)', field: 'grayWidth'
  }, {
    name: 'grayWeightOfLength', label: '坯布克重(g/M2)', field: 'grayWeightOfLength'
  }, {
    name: 'fabricIngredient', label: '面料成份', field: 'fabricIngredient'
  }, {
    name: 'color', label: '颜色', field: row=>row.color? row.color.name : ''
  }, {
    name: 'colorNo', label: '色号', field: 'colorNo'
  }, {
    name: 'status', label: '状态', field: 'status',align: 'center', sortable: true,
    slot: column_slot_production_card_status,
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
        getProductionCard(selectedRecord.id).then((res)=>{
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
        confirmText: '确认删除该生产卡？',
        handler: (selectedRecord)=>{
          removeProductionCard(selectedRecord.id).then((res)=>{
            $q.notify({
              message: '生产卡已删除！',
              position: 'top'
            })
            productionCardGrid.value.loadData()
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
      const count = productionCardGrid.value.selected.length
      if(count>0){
        $q.dialog({
          title: '确认',
          message: `确认删除这 ${count} 条记录？`,
          cancel: true,
          persistent: true
        }).onOk(()=>{
          removeProductionCards(productionCardGrid.value.selected.map(item=>item.id)).then((res)=>{
            $q.notify({
              message: '生产卡已删除！',
              position: 'top'
            })
            productionCardGrid.value.loadData()
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
    placeholder: '卡号'
  }],
  pagination: {
    sortBy: 'updatedAt',
    descending: false,
    page: 1,
    rowsPerPage: 13,
    rowsNumber: 0
  },
  loadData: (params)=>{
    return pageProductionCards(params)
  }
}
const processGridConfig = {
  // title: '工序列表',
  selection: 'single',
  width: '575px',
  height: '550px',
  columns: [{
    name: 'name', label: '名称', field:r=>r.process.name, align: 'center'
  }, {
    name: 'status', label: '状态', field: 'status',align: 'center', sortable: true,
    slot: column_slot_production_card_process_status,
  }, {
    name: 'startTime', label: '开始时间', field: 'startTime', align: 'center', sortable: true,
    format: (val, row)=> val===null || val == undefined ? '' : moment(val).calendar()
  }, {
    name: 'finishTime', label: '结束时间', field: 'finishTime', align: 'center', sortable: true,
    format: (val, row)=> val===null || val == undefined ? '' : moment(val).calendar()
  }],
  // topBar: [{
  //   xtype: 'move-row-up',
  //   color: 'primary',
  //   tooltip: '上移',
  // }, {
  //   xtype: 'move-row-down',
  //   color: 'primary',
  //   tooltip: '下移',
  // }, {
  //   xtype: 'remove-row',
  //   color: 'negative',
  //   tooltip: '删除',
  // }, {
  //   xtype: 'space'
  // }, {
  //   xtype: 'appender',
  //   width: '200px',
  //   model: 'select-append',
  //   label: '搜索并添加',
  //   editable: true,
  //   valueField: 'id',
  //   labelField: 'name',
  //   search: (params)=>{
  //     const {conditions} = params
  //     return listProcesses({conditions})
  //   }
  // }],
  hideBottom: true,
}

const productionCardEditorConfig = ref({
  width: '1024px',
  layout: [{
    col: 5,
    fields: [{
      xtype: 'input',
      model: 'code',
      label: '编码',
      maxlength: 20,
      rules: [
        val => val && val.length >= 2 || '生产卡编码长度至少2位'
      ],
      col: 12
    }, {
      xtype: 'input',
      type: 'date',
      model: 'deliveryDate',
      label: '交期',
      col: 12,
    }, {
      xtype: 'input',
      type: 'number',
      model: 'rolls',
      min: 1,
      label: '匹数',
      col: 6,
    }, {
      xtype: 'input',
      type: 'number',
      decimal: true,
      model: 'weight',
      label: '重量',
      suffix: 'kg',
      col: 6,
    }, {
      xtype: 'input',
      type: 'number',
      decimal: true,
      model: 'grayWidth',
      label: '坯布幅宽',
      suffix: 'mm',
      col: 6,
    }, {
      xtype: 'input',
      type: 'number',
      decimal: true,
      model: 'grayWeightOfLength',
      label: '坯布克重',
      suffix: 'g/M2',
      col: 6,
    }, {
      xtype: 'input',
      model: 'fabricIngredient',
      label: '面料成份',
      maxlength: 32,
      col: 12
    }, {
      xtype: 'select',
      model: 'colorId',
      label: '颜色',
      options: colors,
      valueField: 'id',
      labelField: 'name',
      col: 12,
    }, {
      xtype: 'input',
      model: 'colorNo',
      label: '色号',
      maxlength: 12,
      col: 12
    }, {
      xtype: 'input',
      type: 'textarea',
      model: 'note',
      maxlength: 255,
      label: '备注',
      rows: 3,
      col: 12
    }]
  },{
    col: 7,
    fields: [{
      xtype: 'grid',
      model: 'processes',
      label: '工序列表',
      componentConfig: processGridConfig,
      col: 12
    }],
  }],
})

const showAdder = () =>{
  productionCardEditor.value.show({
    title: '新增生产卡',
    data: {
      status: 'NORMAL'
    },
    onSubmit: (newRecord)=>{
      createProductionCard(newRecord).then((res)=>{
        $q.notify({
          message: '生产卡已创建！',
          position: 'top'
        })
        productionCardGrid.value.loadData()
        productionCardEditor.value.hide()
      })
    }
  })
}

const showUpdater = (selectedRecord)=>{
  selectedRecord.deliveryDate = moment(selectedRecord.deliveryTime).format('YYYY-MM-DD')
  productionCardEditor.value.show({
    title: '修改生产卡',
    data: selectedRecord,
    onSubmit: (updatedRecord)=>{
      updatedRecord.deliveryTime = moment(updatedRecord.deliveryDate).toDate().getTime()
      updateProductionCard(selectedRecord.id, updatedRecord).then((res)=>{
        $q.notify({
          message: '生产卡已更新！',
          position: 'top'
        })
        productionCardGrid.value.loadData()
        productionCardEditor.value.hide()
      })
    }
  });
}

onMounted(()=>{
  listColors().then((res)=>{
    colors.value = res.data
  })
})
</script>
