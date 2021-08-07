<template>
  <swiper
    :slides-per-view="2"
    :space-between="20"
    :navigation="navigation"
    :centeredSlides="true"
    :pagination="{ clickable: true }"
    :loop="true"
    @swiper="onSwiper"
    @slideChange="onSlideChange"
  >
    <swiper-slide v-for="item in list">
      <Thumbnail :item="item" />
    </swiper-slide>
    <div class="swiper-button-prev">
      <DropleftIcon />
    </div>
    <div class="swiper-button-next">
      <DroprightIcon />
    </div>
  </swiper>
</template>

<script setup>
import { defineProps, reactive } from 'vue'
import { Swiper, SwiperSlide } from 'swiper/vue';
import SwiperCore, { Navigation, Pagination, A11y } from 'swiper';

import 'swiper/swiper-bundle.min.css';
import Thumbnail from './Thumbnail.vue'
import DroprightIcon from '../Icons/DroprightIcon.vue'
import DropleftIcon from '../Icons/DropleftIcon.vue'

SwiperCore.use([Navigation, Pagination, A11y]);

defineProps({
  list: Array
})

const navigation = {
  nextEl: '.swiper-button-next',
  prevEl: '.swiper-button-prev',
}
const onSwiper = swiper => {
  console.log(swiper);
}

const onSlideChange = _ => {
  console.log('slide change');
}

</script>
