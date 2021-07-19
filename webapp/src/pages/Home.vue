<template>
  <SearchBox />
  <!-- <Carousel :list="topHot"/> -->
  <div class="divide-y-2 divide-yellow-300 divide-dashed">
    <h3 class="p-4 text-2xl font-semibold">Nổi bật</h3>
    <Slide class="py-8" :list="topView" />
  </div>

  <div class="divide-y-2 divide-yellow-300 divide-dashed">
    <h3 class="p-4 text-2xl font-semibold">Phổ biến</h3>
    <Carousel class="py-8 px-4" :list="topView" />
  </div>
  <div class="divide-y-2 divide-yellow-300 divide-dashed">
    <h3 class="p-4 text-2xl font-semibold">Mới nhất</h3>
    <Carousel class="py-8 px-4" :list="topView" />
  </div>
  <div class="divide-y-2 divide-yellow-300 divide-dashed">
    <h3 class="p-4 text-2xl font-semibold">Hot trong tuần</h3>
    <Carousel class="py-8 px-4" :list="topView" />
  </div>
  <!-- <Carousel :list="topNew"/>
  <Carousel :list="topEnroll"/>
  <Carousel :list="topRelated"/>-->
</template>

<script setup>
import SearchBox from '../components/SearchBox.vue'
import Carousel from '../components/Carousel/Carousel.vue'
import Slide from '../components/Slide/Slide.vue'
import { getTopHot, getTopView, getTopNew, getTopEnroll, getTopRelated } from '../services/courses.service'
import { } from 'vue'


// const topHot = await getTopHot()
const topView = await getTopView()
console.log('topView :>> ', topView);
// const topNew = await getTopNew()
// const topEnroll = await getTopEnroll()
// const topRelated = await getTopRelated()

</script>
