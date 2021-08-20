<template>
  <div class="flex max-w-2xl w-full bg-white rounded-lg overflow-hidden mx-auto">
    <div class="flex flex-col m-5">
      <div class="relative">
        <video :src="video" class="mt-2 w-full max-h-screen w-30 h-30" controls></video>
        <div class="absolute bottom-0 w-full">
          <span class="text-white text-xs uppercase px-2">red</span>
        </div>
      </div>
      <div>
        <div>
          <div class="relative my-6 text-gray-700">
            <h2 class="text-sm text-gray-500 tracking-widest">BÀI GIẢNG {{ state.data.sort_order }}</h2>
            <h1 class="text-3xl font-semibold mb-1 text-green-600">{{ state.data.title }}</h1>
            <div class="flex mb-4">
              <span class="flex items-center font-medium">Khóa học: {{ state.data.name_course }}</span>
              <span class="flex ml-6 pl-3 py-2 border-l-2 border-gray-200 text-gray-500 space-x-2">
                <span class="ml-3">Cập nhật: {{ toDatetime(state.data.updated_at) }}</span>
              </span>
            </div>
            <p class="h-24 line-clamp-3 leading-relaxed bg-light-50">{{ state.data.description }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, onMounted, reactive } from "vue"
import { useRoute } from "vue-router"
import { fetchById } from '../services/lessons.service'
import { BASE_URL } from '../utils/contants';
import { toDatetime } from '../utils/formator';


const route = useRoute()

// State
const state = reactive({
  data: {},
})

// computed
const video = computed(() => state.data.video ? BASE_URL + state.data.video : null)

// Function get data
async function getData() {
  const id = route.params.lessonId
  if (id > 0) {
    state.data = await fetchById({ id })
  }
}

// on mounted
onMounted(async () => {
  await getData()
})

</script>
