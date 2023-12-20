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
      <div class="text-h5 q-pb-sm">人工智能</div>
      <div class="row q-gutter-sm">
        <q-card class="col-2" v-for="(item,key) in series" :key="key" style="height: 250px;">
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
const slide = ref('Rihanna');
const series = ref([{
  title: '入门篇',
  watches: 123,
  updatedAt: '2023-12-10',
  description: '讲解了：AI 、机器学习、深度学习是怎么回事，他们之间的关系，常见的 AI 算法等知识。「人工智能入门」AI 是什么？',
}, {
  title: '进阶篇',
  watches: 456,
  updatedAt: '2023-12-10',
  description: '讲解了：深度学习的概念，它是如何运作的？当有人问你这些概念的时候，你可以通熟易懂地讲解了。「人工智能入门」深度学习是如何工作的？',
}, {
  title: '高级篇',
  watches: 789,
  updatedAt: '2023-12-10',
  description: 'AI 为什么这么重要，以至于大家都在谈论，对此寄予厚望；为什么 AI 的爆发正好在当下，明天的生活会因此发生什么改变。'
}])
</script>
