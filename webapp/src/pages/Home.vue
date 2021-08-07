<template>
  <SearchBox />
  <div>
    <h3 class="p-5 text-2xl font-semibold">Khóa học nổi bật</h3>
    <Slide class="py-2" :list="topHot" />
  </div>
  <div>
    <h3 class="p-5 text-2xl font-semibold">Khóa học nhiều người quan tâm</h3>
    <Carousel class="mx-5" :list="topView" />
  </div>
  <div>
    <h3 class="p-5 text-2xl font-semibold">Khóa học mới</h3>
    <Carousel class="mx-5" :list="topNew" />
  </div>
  <div>
    <h3 class="p-5 text-2xl font-semibold">Khóa học phổ biến trong tuần</h3>
    <Carousel class="mx-5" :list="topWeek" />
  </div>
  <div>
    <h3 class="p-5 text-2xl font-semibold">Khóa học liên quan</h3>
    <Carousel class="mx-5" :list="topRelated" />
  </div>
</template>

<script setup>
import SearchBox from '../components/SearchBox/SearchBox.vue'
import Carousel from '../components/Carousel/Carousel.vue'
import Slide from '../components/Slide/Slide.vue'
import { getTopHot, getTopView, getTopNew, getTopWeek, getTopRelated } from '../services/courses.service'

const topHot = await getTopHot()
const topView = await getTopView()
const topNew = await getTopNew()
const topWeek = await getTopWeek()
const topRelated = await getTopRelated()

</script>
