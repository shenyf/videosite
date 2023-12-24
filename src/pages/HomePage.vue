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
    <div class="q-pt-sm">
<!--      <div class="text-h5 q-pb-sm">{{ course.name }}</div>-->
      <div class="row q-gutter-sm">
        <div class="col-2" v-for="(cause,key) in courses" :key="key" style="height: 250px;cursor:pointer;" @click="this.$router.push({path: `/series/${item.id}`})">
          <q-img
            src="https://cdn.quasar.dev/img/parallax2.jpg"
            spinner-color="white"
            style="height: 170px; max-width: 300px"
            img-class="my-custom-image"
            class="rounded-borders"
          >
            <div class="q-pa-none absolute-bottom text-subtitle3 text-left" >
              <q-icon name="mdi-youtube" class="q-pl-sm" size="sm"/>
              <span class="q-pl-sm">1234</span>
              <span class="q-pl-sm">全10课</span>
            </div>
          </q-img>
          <div>
            <div class="text-h6">{{ cause.name }}</div>
            <div class="text-subtitle3">
              <span class="float-left">人工智能 / 基础</span>
              <span class="float-right">100人在看</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </q-page>
</template>

<script setup>
import {ref,onMounted} from "vue";
import {listCourses} from "src/api/homepage";

const slide = ref('Rihanna');
const courses = ref([])

onMounted(()=>{
  listCourses().then((res)=>{
    courses.value = res.data
  })
})
</script>
