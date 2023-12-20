<template>
  <q-page class="q-pa-sm row">
    <div class="col-8">
      <smart-grid
        ref="schemeGrid"
        :config="schemeGridConfig"
      ></smart-grid>
      <form-dialog
        ref="schemeEditor"
        :config="schemeEditorConfig"
      />
    </div>
    <div class="col-4 q-pl-lg">
      <q-timeline color="secondary">
        <q-timeline-entry heading style="font-size:1em;">排程历史</q-timeline-entry>
        <q-btn color="negative" @click="rebuildPlan">重排</q-btn>
        <q-timeline-entry v-for="(build) in builds" :key="build.id"
          :subtitle="`${moment(build.createdAt).fromNow()}`"
          :style="`cursor:pointer; background-color:${currentBuild!=null && currentBuild.id === build.id ? 'lightgray': ''}`"
          @click="()=>currentBuild=build"
        >
          <q-badge :color="BUILD_STATUS[build.status].color">{{BUILD_STATUS[build.status].text}}</q-badge>
        </q-timeline-entry>
      </q-timeline>
    </div>
  </q-page>
</template>
<script setup>
import { ref, onMounted, watch } from "vue";
import { useQuasar } from 'quasar'
import moment from "moment";
import { STATUS as BUILD_STATUS, pageBuilds, getBuild, removeBuild, removeBuilds, updateBuild, createBuild}from "@/api/plan/build";
import { STATUS as SCHEME_STATUS, pageSchemes, getScheme, removeScheme, removeSchemes, updateScheme, createScheme} from "src/api/plan/scheme";
import SmartGrid from "components/grid/SmartGrid.vue";
import FormDialog from "components/dialog/FormDialog.vue"
import { listColors } from "src/api/system/color";

const $q = useQuasar()
const builds = ref([])
const schemeGrid = ref(null)
const schemeEditor = ref(null)
const column_slot_scheme_status = {
  xtype: 'badge',
  defaultValue: 'DISABLED',
  format: SCHEME_STATUS
}
const currentBuild = ref(null)

const schemeGridConfig = ref({
  title: '排程方案列表',
  columns: [ {
    name: 'otdRate', label: '准交率（%）', field: 'otdRate'
  }, {
    name: 'dyevatWashCount', label: '洗缸次数', field: 'dyevatWashCount'
  }, {
    name: 'status', label: '状态', field: 'status',align: 'center', sortable: true,
    slot: column_slot_scheme_status,
  }, {
    name: 'createdAt', label: '创建时间', field: 'createdAt', align: 'center', sortable: true,
    format: (val, row)=> val===null ? '' : moment(val).format('YYYY-MM-DD hh:mm:ss')
  }, {
    name: 'updatedAt', label: '更新时间', field: 'updatedAt', align: 'center', sortable: true,
    format: (val, row)=> val===null ? '' : moment(val).format('YYYY-MM-DD hh:mm:ss')
  }, {
    name: 'ACTIONS', label: '操作', align: 'center',classes: 'bg-grey-2', style:'width: 120px;max-width: 200px',
    actions: [{
      label: '查看详情',
      color: 'primary',
      handler: (selectedRecord)=>{
        getBuild(selectedRecord.id).then((res)=>{
          showBuild(res.data)
        })
      }
    }, {
      label: '应用',
      color: 'negative',
      disabled: (row)=>{return row.status === 'PENDING' && currentBuild.value.status==='PENDING'},
      handler: (selectedRecord)=>{

      }
    }]
  }],
  pagination: {
    sortBy: 'createdAt',
    descending: true,
    page: 1,
    rowsPerPage: 13,
    rowsNumber: 0
  },
  autoload: false,
  loadData: (params)=>{
    return pageSchemes({...params, buildId: currentBuild.value.id})
  }
})

const schemeEditorConfig = {
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
        val => val && val.length >= 2 || '排程方案编码长度至少2位'
      ],
      col: 6
    },{
      xtype: 'input',
      model: 'rgb',
      maxlength: 7,
      minlength: 7,
      label: '排程方案',
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

const showBuild = (selectedRecord)=>{
  schemeEditor.value.show({
    title: '修改排程方案',
    data: selectedRecord,
    onSubmit: (updatedRecord)=>{
      updateBuild(selectedRecord.id, updatedRecord).then((res)=>{
        $q.notify({
          message: '排程方案已更新！',
          position: 'top'
        })
        schemeGrid.value.loadData()
        schemeEditor.value.hide()
      })
    }
  });
}

const loadBuilds = ()=>{
  pageBuilds({pageSize: 8, pageIndex: 0}).then((res)=>{
    builds.value = res.data.content
  })
}

const rebuildPlan = ()=>{
  $q.dialog({
    title: '确认',
    message: `确认重新排产？`,
    cancel: true,
    persistent: true
  }).onOk(()=>{
    createBuild({}).then((res)=>{
      loadBuilds()
    })
  })
}

onMounted(()=>{
  loadBuilds()
})

watch(currentBuild, (newValue)=>{
  schemeGrid.value.loadData()
})
</script>
