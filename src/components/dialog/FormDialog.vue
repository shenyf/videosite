<template>
  <q-dialog v-model="shown" persistent :position="config.position" >
    <q-card :style="`width:${width};height:${height};max-width:${width}`" transition-show="rotate" transition-hide="rotate">
      <q-card-section class="q-pb-none">
        <div class="text-h6">
          {{ title }}
          <q-btn dense flat icon="close" v-close-popup class="float-right"></q-btn>
        </div>
      </q-card-section>
      <q-card-section class="q-pt-none">
        <q-form class="row" @submit="onSubmit">
          <div class="col-12 row items-start q-col-gutter-sm">
            <template v-for="(layout, lindex) in config.layout" :key="lindex">
              <div :class="`col-${layout.col} row`">
                <template v-for="(field, findex) in layout.fields" :key="findex">
                  <q-input
                    v-if="field.xtype ==='input' && (!field.type || field.type!=='number')"
                    :type="`${field.type || 'text'}`"
                    v-model="data[field.model]"
                    :label="field.label"
                    lazy-rules
                    counter
                    :maxlength="field.maxlength"
                    :rules="field.rules"
                    :rows="field.rows"
                    :class="`col-${field.col} q-pr-sm`"
                  />
                  <q-input
                    v-if="field.xtype ==='input' && field.type && field.type==='number'"
                    type="number"
                    v-model.number="data[field.model]"
                    :label="field.label"
                    :prefix="field.prefix"
                    :suffix="field.suffix"
                    lazy-rules
                    :min="field.min"
                    :max="field.max"
                    :rules="field.rules"
                    :step="field.decimal ? 'any' : false"
                    input-class="text-right"
                    :class="`col-${field.col} q-pr-sm`"
                  />
                  <q-input v-if="field.xtype==='date'"
                           v-model="data[field.model]"
                           :rules="['date']">
                    <template v-slot:append>
                      <q-icon name="event" class="cursor-pointer">
                        <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                          <q-date v-model="data[field.model]">
                            <div class="row items-center justify-end">
                              <q-btn v-close-popup label="Close" color="primary" flat />
                            </div>
                          </q-date>
                        </q-popup-proxy>
                      </q-icon>
                    </template>
                  </q-input>
                  <q-toggle v-if="field.xtype === 'toggle'"
                            v-model="data[field.model]"
                            :label="`${data[field.model]===field.trueValue ? field.trueLabel : field.falseLabel }`"
                            :true-value="field.trueValue"
                            :false-value="field.falseValue"
                  />
                  <q-input
                    v-if="field.xtype === 'password'"
                    type="password"
                    v-model="data[field.model]"
                    :label="field.label"
                    lazy-rules
                    counter
                    :maxlength="field.maxlength"
                    :rules="field.rules"
                    :class="`col-${field.col} q-pr-sm`"
                  />
                  <q-input
                    v-if="field.xtype === 'password-confirm'"
                    type="password"
                    v-model="data[field.model]"
                    :label="field.label"
                    lazy-rules
                    :rules="[val => validatePasswordConfirm(val, field.passwordfield)]"
                    :class="`col-${field.col} q-pr-sm`"
                  />
<!--                  <div v-if="field.xtype === 'checkbox-group'"-->
<!--                       :class="`col-${field.col} row`">-->
<!--                    <template v-for="(option,cbIndex) in field.options" :key="cbIndex">-->
<!--                      <q-checkbox :class="`col-${field.optioncol}`" v-model="data[field.model]" :val="option[field.valuefield]" :label="option[field.displayfield]" />-->
<!--                    </template>-->
<!--                  </div>-->
                  <q-field v-if="field.xtype==='option-group'" :label="field.label" stack-label :class="`col-${field.col} row`">
                    <template v-slot:control>
                      <q-option-group
                        v-model="data[field.model]"
                        :options="field.options"
                        :inline="field.inline"
                        :type="field.type"
                        size="xs"
                        dense
                      />
                    </template>
                  </q-field>
                  <q-select v-if="field.xtype==='select'"
                    v-model="data[field.model]"
                    :options="field.options"
                    :option-value="field.valueField"
                    :option-label="field.labelField"
                    :label="field.label"
                    :class="`col-${field.col} q-pr-sm`"
                    emit-value
                    map-options
                  />
                  <q-field v-if="field.xtype==='range'" :label="field.label" :class="`col-${field.col}`" stack-label>
                    <template v-slot:control>
                      <q-range
                        v-model="data[field.model]"
                        :min="field.min"
                        :max="field.max"
                        label-always
                        :color="field.color"
                      />
                    </template>
                  </q-field>
                  <q-field v-if="field.xtype==='grid'" :label="field.label" stack-label borderless>
                    <template v-slot:control>
                      <smart-grid
                        :config="field.componentConfig"
                        :data="data[field.model]"
                        :class="`col-${field.col}`"
                        @rows-changed="(newRows)=> data[field.model] = newRows"
                      />
                    </template>
                  </q-field>
<!--                  <div v-if="field.xtype === 'grid'" :class="`col-${field.col}`">-->
<!--                    <span class="text-subtitle1">{{ field.componentConfig.title }}</span>-->
<!--                    <smart-grid-->
<!--                      :config="field.componentConfig"-->
<!--                      :data="data[field.model]"-->
<!--                      :class="`col-${field.col}`"-->
<!--                      @rows-changed="(newRows)=> data[field.model] = newRows"-->
<!--                    />-->
<!--                  </div>-->
                </template>
              </div>
            </template>
          </div>
          <div class="q-pt-md col-12 row justify-end">
            <q-btn label="确定" type="submit" color="primary"/>
            <q-btn label="取消" type="reset" color="primary" flat class="q-ml-sm" v-close-popup />
          </div>
        </q-form>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>
<script setup>
import {ref, defineProps , onMounted} from "vue";
import _ from "lodash"
import SmartGrid from "components/grid/SmartGrid.vue";

const props = defineProps({
  config: {
    type: Object,
    default: ()=>{
      return {
        position: 'standard',
        title: '',
        width: '600px',
        height: '400px',
        onSubmit: null
      }
    }
  }
})

const customFields = ref([])
const shown = ref(false)
const title = ref(props.config.title || "")
const width = ref(props.config.width)
const height = ref(props.config.height)
const data = ref({})
const doSubmit = ref(null)

const validatePasswordConfirm = (value, passwordField)=>{
  return value && value===data.value[passwordField] || "密码与密码确认不一致"
}

const show = (params)=>{
  doSubmit.value = params.onSubmit
  title.value = params && params.title ? params.title : props.config.title
  width.value = params && params.width ? params.width : props.config.width
  height.value = params && params.height ? params.height : props.config.height
  data.value = _.cloneDeep(params.data)
  shown.value = true
}

const hide = ()=>{
  shown.value = false
}

const onSubmit = (event)=>{
  doSubmit.value(data.value)
}

defineExpose({
  show,
  hide
})
</script>
