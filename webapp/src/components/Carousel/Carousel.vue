<template>
  <swiper
    navigation
    :pagination="{ clickable: true }"
    @swiper="onSwiper"
    @slideChange="onSlideChange"
    :breakpoints="breakpoints"
  >
    <!-- <swiper-slide v-for="item in list">{{ item.name }}</swiper-slide> -->

    <swiper-slide v-for="item in list">
      <Card :item="item" />
    </swiper-slide>
  </swiper>
</template>

<script setup>
import { defineProps, reactive } from 'vue'
import { Swiper, SwiperSlide } from 'swiper/vue';
import SwiperCore, { Navigation, Pagination, A11y } from 'swiper';

// import SwiperCore, { EffectFade } from 'swiper';
import 'swiper/swiper-bundle.min.css';
// import 'swiper/components/effect-fade/effect-fade.min.css';
import Card from './Card.vue'
import DroprightIcon from '../Icons/DroprightIcon.vue'

SwiperCore.use([Navigation, Pagination, A11y]);

// SwiperCore.use([EffectFade]);
defineProps({
  list: Array
})

const onSwiper = swiper => {
  console.log(swiper);
}

const onSlideChange = _ => {
  console.log('slide change');
}

const breakpoints = {
  '0': {
    'slidesPerView': 1
  },
  '640': {
    'slidesPerView': 2,
    'spaceBetween': 10
  },
  '768': {
    "slidesPerView": 3,
    "spaceBetween": 10
  },
  '1024': {
    'slidesPerView': 4,
    'spaceBetween': 10
  }
}
</script>