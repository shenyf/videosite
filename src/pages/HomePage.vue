<template>
  <q-page class="q-ma-sm">
    <q-carousel
      animated
      v-model="slide"
      navigation
      infinite
    >
      <q-carousel-slide name="soft-jazz">
        <q-video
          class="absolute-full"
          src="https://www.youtube.com/embed/k3_tw44QsZQ"
        />
      </q-carousel-slide>

      <q-carousel-slide name="Rihanna">
        <q-video
          class="absolute-full"
          src="https://www.youtube.com/embed/kOkQ4T5WO9E"
        />
      </q-carousel-slide>

      <q-carousel-slide name="ibiza">
        <q-video
          class="absolute-full"
          src="https://www.youtube.com/embed/p87miJIYEEk"
        />
      </q-carousel-slide>
    </q-carousel>
    <div class="q-pt-sm" v-for="(subject, sIndex) in subjects" :key="sIndex">
      <div class="text-h5 q-pb-sm">{{ subject.name }}</div>
      <div class="row q-gutter-sm">
        <q-card class="col-2" v-for="(item,key) in subject.series" :key="key" style="height: 250px;cursor:pointer;" @click="this.$router.push({path: `/series/${item.id}`})">
          <q-card-section>
            <div class="text-h6">{{ item.title }}</div>
            <div class="text-subtitle1 text-green">{{item.watches}}人在看</div>
          </q-card-section>
          <q-card-section>
            {{item.description}}
          </q-card-section>
        </q-card>
      </div>
    </div>
  </q-page>
</template>

<script setup>
import {ref,onMounted} from "vue";
import {listSubjects} from "src/api/homepage";

const slide = ref('Rihanna');
const subjects = ref([])

onMounted(()=>{
  listSubjects().then((res)=>{
    subjects.value = res.data
  })
})
</script>
