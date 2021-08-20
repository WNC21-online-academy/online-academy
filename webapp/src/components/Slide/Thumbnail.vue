<template>
  <div
    class="w-full h-auto relative flex items-center justify-items-center bg-gray-500 shadow-sm rounded"
  >
    <div>
      <img
        :src="item.thumbnail || defaultImageSrc"
        @error="$event.target.src = defaultImageSrc"
        class="object-cover w-full h-96 rounded p-0 p-0 mix-blend-overlay"
      />
      <div class="absolute flex items-center justify-items-center bottom-0 max-w-full w-48"></div>

      <div
        class="title-box absolute flex text-left max-w-full h-full flex-col flex-nowrap top-0 left-1/3 right-0 bottom-48 justify-center justify-items-center text-white opacity-0 z-10 space-y-4"
      >
        <h1 class="block font-bold text-xl max-w-full">{{ item.name }}</h1>
        <p class="text-sm pt-0 m-0 pl-1 max-w-full">{{ item.description }}</p>
    <div class="flex flex-col space-y-0 p-2 pb-0 text-center">
      <p class=" text-sm font-semibold flex">
        <span class="w-2/3">{{ item.name_category }}</span>
        |
        <span class="w-1/3">{{ toCurrency(item.tutition) }}</span>
      </p>
    </div>
    <div class="flex flex-col justify-center px-2">
      <p class=" flex">
        <span class="w-2/3">
          <span class="flex justify-center p-2">
            <StarIcon
              v-show="item.rating > 0"
              v-for="value in RATING_MAX_SCORE"
              class="w-4 h-4 text-yellow-600"
              :fill="value > item.rating ? 'none' : 'currentColor'"
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </span>
        </span>
        |
        <span class="w-1/3 p-1 flex justify-center space-x-1 font-semibold">
          <span>{{ item.view_count || 0 }}</span>
          <EyeIcon class="h-4 w-4" />
        </span>
      </p>
    </div>
        <div class="absolute h-px w-4 bg-white -left-8 top-1/3"></div>
        <div>
          <button
            type="button"
            class="flex-none text-white px-6 py-2 rounded font-medium mx-3 bg-blue-600 hover:bg-blue-500 transition duration-200 each-in-out focus:outline-none"
            @click="onClickJoin(item.id)"
          >Tham gia ngay</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from "vue-router"
import defaultImageSrc from '../../assets/images/placeholder.png'
import { RATING_MAX_SCORE } from '../../utils/contants'
import { toCurrency } from '../../utils/formator'
import StarIcon from '../Icons/StarIcon.vue'
import EyeIcon from '../Icons/EyeIcon.vue'

const router = useRouter()

// props
defineProps({
  item: Object
})

// events
function onClickJoin(id) {
  router.push(`/courses/${id}`)
}
</script>

<style lang="css">
.title-box h1 {
  font-family: "Futura";
}
.title-box p {
  font-family: "HelveticaNow";
}

.swiper-slide .title-box {
  transform: translateX(-50%);
  transition: all 0.7s ease 0.3s;
}
.swiper-slide-active .title-box {
  transform: translateX(0%);
  opacity: 1;
  transition: all 0.7s ease;
}

.swiper-slide img {
  transition: filter 0.7s ease;
  filter: grayscale(100%);
}
.swiper-slide-active img {
  filter: grayscale(0%) brightness(60%);
}

.fortnite-btn {
  background: linear-gradient(#fefb72, #fefca3);
  font-family: "Luckiest Guy";
  transform: skew(-5deg);
}

.fortnite-btn:hover {
  opacity: 0.8;
}

.fortnite-btn-inner {
  background: linear-gradient(#ede801, #fefb72);
  transform: skew(-10deg);
  color: #343f65;
}
</style>