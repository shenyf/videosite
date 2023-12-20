<template>
  <q-page class="q-pa-sm">
    <smart-grid
      ref="deviceGrid"
      :config="deviceGridConfig"
    ></smart-grid>
    <form-dialog
      ref="deviceEditor"
      :config="deviceEditorConfig"
    />
  </q-page>
</template>
<script setup>
import { ref, onMounted, watch } from "vue";
import { useQuasar } from 'quasar'
import moment from "moment";
import { pageDevices, getDevice, removeDevice, removeDevices, updateDevice, createDevice}from "@/api/system/machine";
import SmartGrid from "components/grid/SmartGrid.vue";
import FormDialog from "components/dialog/FormDialog.vue"
import { column_slot_status } from "components/grid/gridmate";
import { listMachineBrands } from "src/api/system/machine-brand";

const $q = useQuasar()
const deviceGrid = ref(null)
const deviceEditor = ref(null)
const machineBrands = ref([])

const deviceGridConfig = {
  title: '设备列表',
  columns: [ {
    name: 'code', label: '编码', field: 'code', align: 'center'
  }, {
    name: 'name', label: '名称', field:'name', align: 'center', sortable: true
  }, {
    name: 'tubes', label: '管数', field: 'tubes', align: 'center', sortable: true
  }, {
    name: 'brand', label: '品牌', field: row=> row.brand? row.brand.name : '', align: 'center'
  }, {
    name: 'capacity', label: '缸容量范围(KG)', field: row=> `${row.minCapacity} -- ${row.maxCapacity}`
  }, {
    name: 'fabricWidth', label: '幅宽范围(CM)', field: row=> `${row.minFabricWidth} -- ${row.maxFabricWidth}`
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
        getDevice(selectedRecord.id).then((res)=>{
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
        confirmText: '确认删除该设备？',
        handler: (selectedRecord)=>{
          removeDevice(selectedRecord.id).then((res)=>{
            $q.notify({
              message: '设备已删除！',
              position: 'top'
            })
            deviceGrid.value.loadData()
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
      const count = deviceGrid.value.selected.length
      if(count>0){
        $q.dialog({
          title: '确认',
          message: `确认删除这 ${count} 条记录？`,
          cancel: true,
          persistent: true
        }).onOk(()=>{
          removeDevices(deviceGrid.value.selected.map(item=>item.id)).then((res)=>{
            $q.notify({
              message: '设备已删除！',
              position: 'top'
            })
            deviceGrid.value.loadData()
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
    placeholder: '设备名称|编码'
  }],
  pagination: {
    sortBy: 'name',
    descending: false,
    page: 1,
    rowsPerPage: 13,
    rowsNumber: 0
  },
  loadData: (params)=>{
    params.conditions.machineType = 'DYEVAT'
    return pageDevices(params)
  }
}

const deviceEditorConfig = ref({
  width: '600px',
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
        val => val && val.length >= 2 || '编码长度至少2位'
      ],
      col: 6
    },{
      xtype: 'input',
      type: 'number',
      model: 'tubes',
      min: 0,
      label: '管数',
      col: 6,
    },{
      xtype: 'select',
      model: 'brandId',
      label: '机械品牌',
      options: machineBrands,
      valueField: 'id',
      labelField: 'name',
      col: 6,
    },{
      xtype: 'input',
      type: 'number',
      model: 'minCapacity',
      min: 1,
      label: '最小缸容量',
      decimal: true,
      col: 3,
    },{
      xtype: 'input',
      type: 'number',
      model: 'maxCapacity',
      min: 1,
      label: '最大缸容量',
      decimal: true,
      col: 3,
    },{
      xtype: 'input',
      type: 'number',
      model: 'minFabricWidth',
      min: 1,
      label: '最小幅宽',
      col: 3,
    },{
      xtype: 'input',
      type: 'number',
      model: 'maxFabricWidth',
      min: 1,
      label: '最大幅宽',
      col: 3,
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
})

const showAdder = () =>{
  deviceEditor.value.show({
    title: '新增设备',
    data: {
      machineType: 'DYEVAT',
      status: 'NORMAL',
    },
    onSubmit: (newRecord)=>{
      createDevice(newRecord).then((res)=>{
        $q.notify({
          message: '设备已创建！',
          position: 'top'
        })
        deviceGrid.value.loadData()
        deviceEditor.value.hide()
      })
    }
  })
}

const showUpdater = (selectedRecord)=>{
  deviceEditor.value.show({
    title: '修改设备',
    data: selectedRecord,
    onSubmit: (updatedRecord)=>{
      updateDevice(selectedRecord.id, updatedRecord).then((res)=>{
        $q.notify({
          message: '设备已更新！',
          position: 'top'
        })
        deviceGrid.value.loadData()
        deviceEditor.value.hide()
      })
    }
  });
}

onMounted(()=>{
  listMachineBrands({conditions: {machineType : 'DYEVAT'}}).then((res)=>{
    machineBrands.value = res.data
  })
})
</script>
