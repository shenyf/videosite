<template>
  <div>
    <q-toolbar class="justify-center q-pt-sm">
      <q-btn icon="skip_previous" size="lg" class="q-pa-none" @click="previousDay"/>
      <q-input filled v-model="date" mask="date" :rules="['date']" class="q-pb-none">
        <template v-slot:append>
          <q-icon name="event" class="cursor-pointer">
            <q-popup-proxy cover transition-show="scale" transition-hide="scale">
              <q-date v-model="date">
                <div class="row items-center justify-end">
                  <q-btn v-close-popup label="Close" color="primary" flat />
                </div>
              </q-date>
            </q-popup-proxy>
          </q-icon>
        </template>
      </q-input>
      <q-btn icon="skip_next" size="lg" class="q-pa-none" @click="nextDay"/>
    </q-toolbar>
    <div class="gstc-wrapper" ref="gstcElement"></div>
  </div>
</template>

<script setup>
import GSTC from "gantt-schedule-timeline-calendar/dist/gstc.wasm.esm.min.js";
import { Plugin as TimelinePointer } from "gantt-schedule-timeline-calendar/dist/plugins/timeline-pointer.esm.min.js";
import { Plugin as Selection } from "gantt-schedule-timeline-calendar/dist/plugins/selection.esm.min.js";
import { Plugin as ItemResizing } from "gantt-schedule-timeline-calendar/dist/plugins/item-resizing.esm.min.js";
import { Plugin as ItemMovement } from "gantt-schedule-timeline-calendar/dist/plugins/item-movement.esm.min.js";
import { Plugin as Bookmarks } from "gantt-schedule-timeline-calendar/dist/plugins/time-bookmarks.esm.min.js";
import "gantt-schedule-timeline-calendar/dist/style.css";
import { ref, onMounted, onBeforeUnmount, watch } from "vue";
import {list} from "@/api/plan/overview";
import {autoHighContrastColor} from 'utils/color';
import locale from "dayjs/locale/zh-cn";
import moment from 'moment';

const gstc = ref(null);
const gstcElement = ref(null);
const rawData = ref(null);
const date = ref(moment(new Date()).format('yyyy/MM/DD'));

const generateRows=()=>{
  /**
   * @type { import("gantt-schedule-timeline-calendar").Rows }
   */
  const rows = {};
  rawData.value.map(machine=>{
    const id = GSTC.api.GSTCID(machine.id);
    rows[id] = {
      id: id,
      label: machine.name
    }
  })
  return rows;
}

const generateItems=()=> {
  /**
   * @type { import("gantt-schedule-timeline-calendar").Items }
   */
  const items = {};
  rawData.value.forEach(machine=>{
    machine.tasks.forEach(task=>{
      const id = GSTC.api.GSTCID(task.id.toString());
      const rowId = GSTC.api.GSTCID(machine.id);
      items[id] = {
        id: id,
        label: task.productionCard.code,
        rowId: rowId,
        colorRgb: task.productionCard.color.rgb,
        currentWorkingProcessName: task.currentWorkingProcess ? task.currentWorkingProcess.name : '',
        processName: task.process ? task.process.name : '',
        style: {
          background: 'none',
          border: '2px solid gray',
        },
        time: {
          start: moment(task.scheduledStartTime).toDate().getTime(),
          end: moment(task.scheduledFinishTime).toDate().getTime()
        }
      }
    })
  })

  return items;
}

const itemWrapperSlot = (vido, props)=>{
  const { onChange, html, cache } = vido;

  let position;

  function updatePosition() {
    if (props && props.itemData) {
      position = props.itemData.position;
    }
  }

  updatePosition();

  onChange((changedProps) => {
    // if current element is reused to display other item data just update your data so when you click you will display right alert
    props = changedProps;
    updatePosition();
  });

  function onClick(ev) {
    ev.stopPropagation();
    ev.preventDefault();
  }

  return (content) =>
    cache(
      props && props.item
        ? html`${content}`
        : null
    );
}

const itemSlot = (vido, props)=>{
  const { html, onChange, update } = vido;

  let colorRgb = '';
  let cardNo = '';
  let currentWorkingProcessName = '';
  let processName = '';
  onChange((newProps) => {
    props = newProps;
    if (!props || !props.item) return;
    colorRgb = props.item.colorRgb;
    cardNo = props.item.label;
    currentWorkingProcessName = props.item.currentWorkingProcessName;
    processName = props.item.processName;
    update();
  });

  return (content) =>
    html`<div style="width: 100%;color: black;">
        <div class="item-card-no" style="background-color:${colorRgb};color:${autoHighContrastColor(colorRgb)};border-bottom: 2px solid gray">${cardNo}</div>
        <div class="item-current-working-process-name">当前工序: ${currentWorkingProcessName}</div>
        <div class="item-process-name">本道工序: ${processName}</div>
      </div>`
}

const config = {
  licenseKey:
    "====BEGIN LICENSE KEY====\nXOfH/lnVASM6et4Co473t9jPIvhmQ/l0X3Ewog30VudX6GVkOB0n3oDx42NtADJ8HjYrhfXKSNu5EMRb5KzCLvMt/pu7xugjbvpyI1glE7Ha6E5VZwRpb4AC8T1KBF67FKAgaI7YFeOtPFROSCKrW5la38jbE5fo+q2N6wAfEti8la2ie6/7U2V+SdJPqkm/mLY/JBHdvDHoUduwe4zgqBUYLTNUgX6aKdlhpZPuHfj2SMeB/tcTJfH48rN1mgGkNkAT9ovROwI7ReLrdlHrHmJ1UwZZnAfxAC3ftIjgTEHsd/f+JrjW6t+kL6Ef1tT1eQ2DPFLJlhluTD91AsZMUg==||U2FsdGVkX1/SWWqU9YmxtM0T6Nm5mClKwqTaoF9wgZd9rNw2xs4hnY8Ilv8DZtFyNt92xym3eB6WA605N5llLm0D68EQtU9ci1rTEDopZ1ODzcqtTVSoFEloNPFSfW6LTIC9+2LSVBeeHXoLEQiLYHWihHu10Xll3KsH9iBObDACDm1PT7IV4uWvNpNeuKJc\npY3C5SG+3sHRX1aeMnHlKLhaIsOdw2IexjvMqocVpfRpX4wnsabNA0VJ3k95zUPS3vTtSegeDhwbl6j+/FZcGk9i+gAy6LuetlKuARjPYn2LH5Be3Ah+ggSBPlxf3JW9rtWNdUoFByHTcFlhzlU9HnpnBUrgcVMhCQ7SAjN9h2NMGmCr10Rn4OE0WtelNqYVig7KmENaPvFT+k2I0cYZ4KWwxxsQNKbjEAxJxrzK4HkaczCvyQbzj4Ppxx/0q+Cns44OeyWcwYD/vSaJm4Kptwpr+L4y5BoSO/WeqhSUQQ85nvOhtE0pSH/ZXYo3pqjPdQRfNm6NFeBl2lwTmZUEuw==\n====END LICENSE KEY====",
  // plugins: [TimelinePointer(), Selection(), ItemResizing(), ItemMovement(), Bookmarks()],
  plugins: [TimelinePointer(), Selection(), Bookmarks()],
  innerHeight: 780,
  list: {
    columns: {
      data: {
        [GSTC.api.GSTCID("id")]: {
          id: GSTC.api.GSTCID("id"),
          width: 60,
          data: ({ row }) => GSTC.api.sourceID(row.id),
          header: {
            content: "ID",
          },
          hidden: true,
        },
        [GSTC.api.GSTCID("label")]: {
          id: GSTC.api.GSTCID("label"),
          width: 100,
          data: "label",
          header: {
            content: "机械",
          },
        },
      },
    },
    rows: [], //generateRows()
  },
  chart: {
    time: {
      period: 'hour',
      zoom: 16,
    },
    item: {
      height: 75,
    },
    items: []//generateItems(),
  },
  slots: {
    'chart-timeline-items-row-item': { outer: [itemWrapperSlot], content: [itemSlot] },
  },
  locale: locale,
};


const previousDay = ()=>{
  date.value = moment(date.value,'yyyy/MM/DD').add(-1,'days').format('yyyy/MM/DD')
}

const nextDay = ()=>{
  date.value = moment(date.value,'yyyy/MM/DD').add(1,'days').format('yyyy/MM/DD')
}

const loadData = ()=>{
  list({machineType: 'DYEVAT', date: moment(date.value,'yyyy/MM/DD').format('yyyy-MM-DD')}).then((res)=>{
    rawData.value = res.data
    gstc.value.state.update("config.list.rows", generateRows())
    gstc.value.state.update("config.chart.items", generateItems())
  })
}

watch(date, (newValue)=>{
  loadData()
})

onMounted(() => {
  gstc.value = GSTC({
    element: gstcElement.value,
    state: GSTC.api.stateFromConfig(config)
  });

  loadData()
});

onBeforeUnmount(() => {
  if (gstc.value) gstc.value.destroy();
});
</script>
<style scoped>
.gstc-component {
  margin: 0;
  padding: 0;
}
.toolbox {
  padding: 10px;
}
</style>
