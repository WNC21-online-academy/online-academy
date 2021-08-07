<template>
  <div class="flex items-center justify-center border">
    <div class="w-full bg-white shadow-xl rounded-md overflow-hidden">
      <div
        class="bg-cover bg-center h-56 p-4 cursor-pointer"
        :style="{ backgroundImage: `url('${item.thumbnail}')` }"
        @click="onClickJoin(item.id)"
      >
        <div class="flex justify-end">
          <HeartIcon class="cursor-pointer" />
        </div>
      </div>
      <div class="p-4">
        <p
          class="truncate uppercase tracking-wide text-xl font-bold text-gray-700 cursor-pointer"
          @click="onClickJoin(item.id)"
        >{{ item.name }}</p>
        <p class="truncate text-xl text-gray-900">{{ tutition }}</p>
        <p class="h-8 truncate line-clamp-2 text-sm text-gray-700">{{ item.description }}</p>
      </div>
      <div class="flex p-4 border-t border-gray-300 text-gray-700">
        <div class="flex-1 inline-flex items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-6 w-6 fill-current mr-3"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
            />
          </svg>
          <p>
            <span class="text-gray-900 font-bold">3</span> Học viên
          </p>
        </div>
        <div class="flex-1 inline-flex items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-6 w-6 fill-current mr-3"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
            />
          </svg>
          <p>
            <span class="text-gray-900 font-bold">2</span> Đánh giá
          </p>
        </div>
      </div>
      <div class="px-4 pt-3 pb-4 border-t border-gray-300 bg-gray-100 text-center">
        <button
          type="button"
          class="flex-none text-white px-6 py-2 rounded font-medium mx-3 bg-blue-800 hover:bg-blue-600 transition duration-200 each-in-out focus:outline-none"
          @click="onClickJoin(item.id)"
        >Đăng ký ngay</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import { useRouter } from 'vue-router';
import formator from '../../utils/formator';
import HeartIcon from '../Icons/HeartIcon.vue';

const router = useRouter()

// props
const props = defineProps({
  item: Object
})

const tutition = computed(() => formator.toCurrency(props.item?.tutition))

function onClickJoin(id) {
  router.push(`/courses/${id}`)
}
</script>