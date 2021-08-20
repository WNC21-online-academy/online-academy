<template>
  <div
    class="flex flex-col bg-white rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition duration-500 mx-auto md:mx-0 h-full"
  >
    <router-link :to="`/courses/${item.id}`" class="text-xl font-bold">
      <img
        :src="item.thumbnail || defaulImageSrc"
        alt
        @error="$event.target.src = defaulImageSrc"
        class="h-40 w-full"
      />
    </router-link>
    <div class="flex flex-col space-y-0 p-2 pb-0 text-green-600 text-center">
      <router-link
        :to="`/courses/${item.id}`"
        class="text-xl font-bold hover:opacity-80"
      >{{ item.name }}</router-link>
      <p class="text-gray-600 text-sm">{{ item.description }}</p>
      <p class="text-gray-600 text-sm font-semibold flex">
        <span class="w-2/3 text-green-600">{{ item.name_category }}</span>
        |
        <span class="w-1/3">{{ toCurrency(item.tutition) }}</span>
      </p>
    </div>
    <div class="flex-1 flex flex-col justify-center px-2">
      <p class="text-gray-600 flex">
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
        <span class="w-1/3 p-1 flex justify-center space-x-1">
          <span>{{ item.view_count || 0 }}</span>
          <EyeIcon class="h-4 w-4" />
        </span>
      </p>
      <button
        class="py-2 px-4 mb-2 mt-auto mx-auto rounded-full bg-green-600 text-white tracking-widest focus:outline-none hover:bg-green-500 transition duration-200"
        @click="onClickJoin(item.id)"
      >Tham gia</button>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { toCurrency } from '../../utils/formator'
import HeartIcon from '../Icons/HeartIcon.vue'
import StarIcon from '../Icons/StarIcon.vue'
import EyeIcon from '../Icons/EyeIcon.vue'
import defaulImageSrc from '../../assets/images/placeholder.png'
import { RATING_MAX_SCORE } from '../../utils/contants'

const router = useRouter()

// props
const props = defineProps({
  item: Object
})

const tutition = computed(() => toCurrency(props.item?.tutition))

function onClickJoin(id) {
  router.push(`/courses/${id}`)
}
</script>