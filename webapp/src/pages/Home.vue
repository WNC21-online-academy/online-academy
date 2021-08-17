<template>
  <SearchBox />
  <div>
    <h3 class="p-5 text-2xl font-semibold">Khóa học nổi bật</h3>
    <Slide class="py-2" :list="state.topHot" />
  </div>
  <div>
    <h3 class="p-5 text-2xl font-semibold">Khóa học nhiều người quan tâm</h3>
    <Carousel class="mx-5" :list="state.topView" />
  </div>
  <div>
    <h3 class="p-5 text-2xl font-semibold">Khóa học mới</h3>
    <Carousel class="mx-5" :list="state.topNew" />
  </div>
  <div>
    <h3 class="p-5 text-2xl font-semibold">Khóa học phổ biến trong tuần</h3>
    <Carousel class="mx-5" :list="state.topWeek" />
  </div>
  <div>
    <h3 class="p-5 text-2xl font-semibold">Khóa học liên quan</h3>
    <Carousel class="mx-5" :list="state.topRelated" />
  </div>
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
