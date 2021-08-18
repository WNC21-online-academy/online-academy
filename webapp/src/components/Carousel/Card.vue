<template>
  <div
    class="bg-white rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition duration-500 mx-auto md:mx-0"
  >
    <router-link :to="`/courses/${item.id}`" class="text-xl font-bold">
      <img :src="item.thumbnail" alt @error="$event.target.src = defaulImageSrc" class="h-48" />
    </router-link>
    <div class="flex flex-col space-y-0 py-2 text-green-600 text-center">
      <router-link :to="`/courses/${item.id}`" class="text-xl font-bold hover:opacity-80">{{ item.name }}</router-link>
      <p class="text-gray-600">{{ item.description }}</p>
      <p class="text-gray-600">{{ toCurrency(item.tutition) }}</p>
      <div class="flex justify-center">
        <button
          class="py-2 px-4 my-2 rounded-full bg-green-600 text-white tracking-widest focus:outline-none hover:bg-green-500 transition duration-200"
          @click="onClickJoin(item.id)"
        >Tham gia</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import { useRouter } from 'vue-router';
import { toCurrency } from '../../utils/formator';
import HeartIcon from '../Icons/HeartIcon.vue';

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