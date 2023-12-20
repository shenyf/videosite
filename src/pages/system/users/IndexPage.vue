<template>
  <q-page class="q-pa-sm">
    <smart-grid
      ref="userGrid"
      :config="userGridConfig"
    ></smart-grid>
    <form-dialog
      ref="userEditor"
      :config="userEditorConfig"
    />
    <form-dialog
      ref="userPasswordEditor"
      :config="userPasswordEditorConfig"
    />
    <form-dialog
      ref="authEditor"
      :config="authEditorConfig"
    />
  </q-page>
</template>
<script setup>
import {ref,onMounted, h} from "vue";
import { useQuasar } from 'quasar'
import moment from "moment";
import { pageUsers, getUser, removeUser, removeUsers, updateUser, createUser, updateUserPassword, updateUserAuth}from "@/api/system/user";
import { listRoles} from "@/api/system/role";
import SmartGrid from "components/grid/SmartGrid.vue";
import {column_slot_status} from "components/grid/gridmate"
import FormDialog from "components/dialog/FormDialog.vue"

const $q = useQuasar()
const userGrid = ref(null)
const userEditor = ref(null)
const userPasswordEditor = ref(null)
const authEditor = ref(null)

const userGridConfig = {
  title: '用户列表',
  columns: [ {
    name: 'name', label: '姓名', field:'name', align: 'center', sortable: true
  }, {
    name: 'login', label: '登录账号', field: 'login', align: 'center'
  }, {
    name: 'mobile', label: '手机号码', field: 'mobile'
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
        getUser(selectedRecord.id).then((res)=>{
          showUpdater(res.data)
        })
      }
    }, {
      xtype: 'button-group',
      label: '更多',
      color: 'primary',
      items: [{
        label: '授权',
        color: 'primary',
        handler: (selectedRecord)=>{
          getUser(selectedRecord.id).then((res)=> {
            showAuthEditor(res.data)
          })
        }
      }, {
        label: '设置密码',
        color: 'primary',
        handler: (selectedRecord)=>{
          showUserPasswordUpdater(selectedRecord)
        }
      }, {
        label: '删除',
        color: 'negative',
        confirm: true,
        confirmText: '确认删除该用户？',
        handler: (selectedRecord)=>{
          removeUser(selectedRecord.id).then((res)=>{
            $q.notify({
              message: '用户已删除！',
              position: 'top'
            })
            userGrid.value.loadData()
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
      const count = userGrid.value.selected.length
      if(count>0){
        $q.dialog({
          title: '确认',
          message: `确认删除这 ${count} 条记录？`,
          cancel: true,
          persistent: true
        }).onOk(()=>{
          removeUsers(userGrid.value.selected.map(item=>item.id)).then((res)=>{
            $q.notify({
              message: '用户已删除！',
              position: 'top'
            })
            userGrid.value.loadData()
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
    placeholder: '用户名|登录账号|手机号码'
  }],
  pagination: {
    sortBy: 'name',
    descending: false,
    page: 1,
    rowsPerPage: 13,
    rowsNumber: 0
  },
  loadData: (params)=>{
    return pageUsers(params)
  }
}

const userEditorConfig = {
  width: '640px',
  layout: [{
    col: 12,
    fields: [{
      xtype: 'input',
      model: 'login',
      label: '登录账号',
      maxlength: 12,
      rules: [
        val => val && val.length >= 3 && /^[\u4E00-\u9FA5A-Za-z0-9_]+$/.test(val) || '登录账号必须由3~12位中英文字符、数字或下划线组成'
      ],
      col: 6
    },{
      xtype: 'input',
      model: 'name',
      label: '姓名',
      maxlength: 12,
      rules: [
        val => (val && val.length >= 2) && /^[\u4E00-\u9FA5A-Za-z]+$/.test(val) || '姓名必须是2~12位中英文字符'
      ],
      col: 6,
    },{
      xtype: 'input',
      model: 'mobile',
      label: '手机号码',
      maxlength: 11,
      rules: [
        val => val && val.length == 11 && /^[1][3,4,5,7,8][0-9]{9}$/.test(val) || '请输入正确的手机号码'
      ],
      col: 6
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
    }],
  }]
}

const userPasswordEditorConfig = {
  title: '设置密码',
  width: '480px',
  height: '320px',
  layout: [{
    col: 12,
    fields: [{
      xtype: 'password',
      model: 'password',
      label: '密码',
      maxlength: 20,
      rules: [val => val && val.length >= 3 || '密码长度必须至少3位'],
      col: 12,
    }, {
      xtype: 'password-confirm',
      model: 'passwordConfirm',
      label: '密码确认',
      passwordfield: 'password',
      col: 12
    }]
  }]
}

const roleOptions = ref([])

const authEditorConfig = ref({
  title: '授权',
  width: '480px',
  layout: [{
    col: 12,
    fields: [{
      xtype: 'option-group',
      type: 'checkbox',
      model: 'roleIds',
      inline: true,
      options: roleOptions,
      col: 12,
    }]
  }]
})

const showAdder = () =>{
  userEditor.value.show({
    title: '新增用户',
    data: {
      status: 'NORMAL'
    },
    onSubmit: (newRecord)=>{
      createUser(newRecord).then((res)=>{
        $q.notify({
          message: '用户已创建！',
          position: 'top'
        })
        userGrid.value.loadData()
        userEditor.value.hide()
      })
    }
  })
}

const showUpdater = (selectedRecord)=>{
  userEditor.value.show({
    title: '修改用户',
    data: selectedRecord,
    onSubmit: (updatedRecord)=>{
      updateUser(selectedRecord.id, updatedRecord).then((res)=>{
        $q.notify({
          message: '用户信息已更新！',
          position: 'top'
        })
        userGrid.value.loadData()
        userEditor.value.hide()
      })
    }
  });
}
const showUserPasswordUpdater = (selectedRecord)=>{
  userPasswordEditor.value.show({
    data: {password: '', passwordConfirm: ''},
    onSubmit: (passwords)=>{
      updateUserPassword(selectedRecord.id, passwords.password).then(res=>{
        $q.notify({
          message: '密码修改成功！',
          position: 'top'
        })
        userPasswordEditor.value.hide()
      })
    }
  })
}
const showAuthEditor = (selectedRecord)=>{
  authEditor.value.show({
    data: {
      roleIds: selectedRecord.roleIds
    },
    onSubmit: (auth)=>{
      updateUserAuth(selectedRecord.id, auth).then(res=>{
        $q.notify({
          message: '授权成功！',
          position: 'top'
        })
        authEditor.value.hide()
      })
    }
  })
}

onMounted(()=>{
  listRoles().then(res=>{
    roleOptions.value = res.data.map(r=>{return {label:r.name, value: r.id}})
  })
})
</script>
