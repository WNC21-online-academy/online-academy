<template>
  <swiper
    :navigation="navigation"
    @swiper="onSwiper"
    @slideChange="onSlideChange"
    :breakpoints="breakpoints"
  >
    <swiper-slide v-for="item in list">
      <Card :item="item" />
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
import SwiperCore, { Navigation, A11y } from 'swiper';
import 'swiper/swiper-bundle.min.css';
import Card from './Card.vue'
import DroprightIcon from '../Icons/DroprightIcon.vue'
import DropleftIcon from '../Icons/DropleftIcon.vue'

// slide config
SwiperCore.use([Navigation, A11y]);
const navigation = {
  nextEl: '.swiper-button-next',
  prevEl: '.swiper-button-prev',
}
const breakpoints = {
  '0': {
    'slidesPerView': 1,
    'spaceBetween': 0
  },
  '680': {
    'slidesPerView': 2,
    'spaceBetween': 20
  },
  '900': {
    "slidesPerView": 3,
    "spaceBetween": 25
  },
  '1200': {
    'slidesPerView': 4,
    'spaceBetween': 25
  }
}

// props
defineProps({
  list: Array
})

// events
const onSwiper = swiper => {
  // console.log(swiper);
}

const onSlideChange = _ => {
  // console.log('slide change');
}
</script>

<style scoped>
.swiper-slide {
  height: auto;
}
.swiper-button-prev,
.swiper-button-next {
  background-color: rgba(52, 101, 238, 0.7);
  color: aliceblue;
}
.swiper-button-prev:hover,
.swiper-button-next:hover {
  color: mediumblue;
}
.swiper-button-prev {
  left: 0 !important;
}
.swiper-button-next {
  right: 0 !important;
}
</style>