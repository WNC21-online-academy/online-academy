<template>
  <SearchBox />
  <div class="py-5">
    <h3 class="px-5 text-xl font-semibold text-gray-700">Khóa học nổi bật</h3>
    <Slide class="py-4" :list="state.topHot" />
  </div>
  <div class="py-5">
    <h3 class="px-5 my-3 text-xl font-semibold text-gray-700">Khóa học nhiều người quan tâm</h3>
    <Carousel class="mx-5 py-4" :list="state.topView" />
  </div>
  <div class="py-5">
    <h3 class="px-5 my-3 text-xl font-semibold text-gray-700">Khóa học mới</h3>
    <Carousel class="mx-5 py-4" :list="state.topNew" />
  </div>
  <div class="py-5">
    <h3 class="px-5 my-3 text-xl font-semibold text-gray-700">Khóa học phổ biến trong tuần</h3>
    <Carousel class="mx-5 py-4" :list="state.topWeek" />
  </div>
  <!-- <div class="py-5">
    <h3 class="px-5 my-3 text-xl font-semibold text-gray-700">Khóa học liên quan</h3>
    <Carousel class="mx-5 py-4" :list="state.topRelated" />
  </div> -->
</template>

<script setup>
import SearchBox from '../components/SearchBox/SearchBox.vue'
import Carousel from '../components/Carousel/Carousel.vue'
import Slide from '../components/Slide/Slide.vue'
import { getTopHot, getTopView, getTopNew, getTopWeek, getTopRelated } from '../services/courses.service'
import { onMounted, reactive } from '@vue/runtime-core'

const state = reactive({
  topHot: [],
  topView: [],
  topNew: [],
  topWeek: [],
  topRelated: []
})

onMounted(async () => {
  state.topHot = await getTopHot()
  state.topView = await getTopView()
  state.topNew = await getTopNew()
  state.topWeek = await getTopWeek()
  state.topRelated = await getTopRelated()
})

</script>
