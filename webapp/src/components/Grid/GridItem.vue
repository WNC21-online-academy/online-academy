<template>
  <div
    class="bg-white rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition duration-500 mx-auto md:mx-0"
  >
    <router-link :to="`/courses/${item.id}`" class="text-xl font-bold">
      <img
        :src="item.thumbnail"
        alt
        @error="$event.target.src = defaulImageSrc"
        class="h-48 w-full"
      />
    </router-link>
    <div class="flex flex-col space-y-2 my-3 text-green-600 text-center">
      <router-link
        :to="`/courses/${item.id}`"
        class="text-xl font-bold hover:opacity-80"
      >{{ item.name }}</router-link>
      <p class="text-gray-600">{{ item.description }}</p>
      <p class="text-gray-600 flex">
        <span class="w-1/2">{{ toCurrency(item.tutition) }}</span>
        |
        <span class="w-1/2 p-1 flex">
          <span class="flex mx-auto">
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
      </p>
      <div class="flex justify-center space-x-4 my-4">
        <router-link :to="`/courses/${item.id}`">
          <button
            class="py-2 px-4 rounded-full bg-green-600 text-white tracking-widest focus:outline-none hover:bg-green-500 transition duration-200"
          >Chi tiết</button>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script setup>
import { defineProps } from 'vue'
import defaulImageSrc from '../../assets/images/placeholder.png'
import { RATING_MAX_SCORE } from '../../utils/contants'
import HeartIcon from '../Icons/HeartIcon.vue'
import StarIcon from '../Icons/StarIcon.vue'
import { toCurrency } from '../../utils/formator'

defineProps({
  item: Object
})

</script>