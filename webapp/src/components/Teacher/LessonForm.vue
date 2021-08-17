<template>
  <div class="shadow overflow-hidden sm:rounded-md">
    <div class="px-4 py-5 bg-white sm:p-6">
      <div class="grid grid-cols-6 gap-6">
        <div class="col-span-6 sm:col-span-3">
          <label class="block text-sm font-medium text-gray-700">Tiêu đề</label>
          <input
            v-model="state.title"
            type="text"
            class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
          />
        </div>

        <div class="col-span-6 sm:col-span-3">
          <label class="block text-sm font-medium text-gray-700">Thứ tự bài học</label>
          <input
            v-model="state.sort_order"
            type="number"
            step="1000"
            class="mt-1 focus:rsort_orderng-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
          />
        </div>

        <div class="col-span-6 sm:col-span-3">
          <label class="block text-sm font-medium text-gray-700">Bản nháp?</label>
          <input
            v-model="state.is_draft"
            type="checkbox"
            class="mt-6 focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded"
          />
        </div>

        <div class="col-span-6 sm:col-span-3">
          <label class="block text-sm font-medium text-gray-700">Thuộc khóa học</label>
          <input
            :value="state.name_course"
            type="tel"
            class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md opacity-50"
            disabled
          />
        </div>

        <div class="col-span-6">
          <label class="block text-sm font-medium text-gray-700">Mô tả</label>

          <div class="mt-1">
            <textarea
              v-model="state.description"
              rows="3"
              class="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 mt-1 block w-full sm:text-sm border border-gray-300 rounded-md"
              placeholder="Mô tả ngắn gọn"
            ></textarea>
          </div>
        </div>
      </div>
      <p v-show="message.formError" class="flex font-medium text-sm text-red-700 pt-4">
        <WarningIcon class="pr-1" />
        {{ message.formError }}
      </p>
      <p v-show="message.formSuccess" class="flex font-medium text-sm text-green-600 pt-4">
        <CheckIcon class="pr-1" />
        {{ message.formSuccess }}
      </p>
    </div>
    <div class="px-4 py-3 bg-gray-50 text-right sm:px-6">
      <button
        type="button"
        class="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        @click="onSubmitLesson"
      >{{ route.params.lessonId > 0 ? 'Cập nhật thông tin' : 'Thêm mới' }}</button>
    </div>
  </div>

  <div v-show="route.params.id > 0" class="shadow overflow-hidden sm:rounded-md">
    <div class="md:col-span-1">
      <div class="px-4 sm:px-0">
        <h3 class="text-lg font-medium leading-6 text-gray-900 pt-8 pb-2">Video bài giảng</h3>
      </div>
    </div>
    <div class="px-4 py-5 bg-white sm:p-6">
      <div class="grid grid-cols-6 gap-6">
        <div class="col-span-6">
          <video
            v-show="!fileUrl && !!video"
            :src="video"
            class="mt-2 w-full max-h-screen"
            controls
          ></video>
          <label class="italic text-sm">{{ fileData.name }}</label>

          <div
            @dragenter.prevent
            @dragover.prevent
            @drop.prevent="onChangeVideo"
            class="mt-2 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md"
          >
            <div class="space-y-1 text-center">
              <svg
                class="mx-auto h-12 w-12 text-gray-400"
                stroke="currentColor"
                fill="none"
                viewBox="0 0 48 48"
                aria-hidden="true"
              >
                <path
                  d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
              <div class="flex text-sm text-gray-600">
                <label
                  class="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500"
                >
                  <span>Tải lên</span>
                  <input type="file" accept="video/*" class="hidden" @change="onChangeVideo" />
                </label>
                <p class="pl-1">hoặc kéo thả vào đây</p>
              </div>
              <p class="text-xs text-gray-500">MKV, MP4</p>
            </div>
          </div>
        </div>
      </div>
      <p v-show="message.videoError" class="flex font-medium text-sm text-red-700 pt-4">
        <WarningIcon class="pr-1" />
        {{ message.videoError }}
      </p>
      <p v-show="message.videoSuccess" class="flex font-medium text-sm text-green-600 pt-4">
        <CheckIcon class="pr-1" />
        {{ message.videoSuccess }}
      </p>
    </div>
    <div class="px-4 py-3 bg-gray-50 text-right sm:px-6">
      <div v-show="uploadProgress > 0" class="p-1">{{ uploadProgress }}%</div>
      <button
        type="button"
        class="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        :class="{ 'hover:bg-indigo-600 opacity-50 cursor-default': !(fileUrl && route.params.lessonId > 0) }"
        :disabled="!(fileUrl && route.params.lessonId > 0)"
        @click="onSubmitUploadVideo"
      >Cập nhật video</button>
    </div>
  </div>
</template>

<script setup>
import { computed, inject, onMounted, reactive, ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import ClassicEditor from '@ckeditor/ckeditor5-build-classic'
import WarningIcon from '../Icons/WarningIcon.vue'
import CheckIcon from '../Icons/CheckIcon.vue'
import { useUploadFile } from '../../composables/useUploadFile'
import { addOrUpdate, fetchById, uploadVideo } from '../../services/lessons.service'
import { fetchById as fetchCourseById } from '../../services/courses.service'
import { BASE_URL } from '../../utils/contants'

// router
const router = useRouter()
const route = useRoute()

// store
const store = inject('store')

// hook
const { fileData, fileUrl, clearFile, onChangeFile } = useUploadFile()

// state
const state = reactive({
  id: route.params.lessonId,
  title: '',
  id_course: '',
  name_course: '',
  sort_order: '',
  description: '',
  video: '',
  is_draft: true
})
const message = reactive({
  formError: '',
  formSuccess: '',
  videoError: '',
  videoSuccess: ''
})
const uploadProgress = ref(0)

// computed
const video = computed(() => state.video ? BASE_URL + state.video : null)

// mounted
onMounted(async () => {
  const lessonId = route.params.lessonId
  if (lessonId > 0) {
    const lesson = await fetchById({ id: lessonId })
    Object.assign(state, lesson)
  }
  else {
    const courseId = route.params.id
    if (courseId > 0) {
      const course = await fetchCourseById({ id: courseId })
      state.id_course = course.id
      state.name_course = course.name
    }
  }
})

// events
function onChangeVideo() {
  onChangeFile(...arguments)
  uploadProgress.value = 0
}
async function onSubmitLesson() {
  if (!checkLesson()) return
  const res = await addOrUpdate(state)
  if (res.message) {
    message.formError = res.message
    return
  }
  await Object.assign(state, res)
  message.formSuccess = 'Đã lưu'

  if (state.id) {
    router.replace({
      params: {
        lessonId: state.id
      }
    })
  }
}

async function onSubmitUploadVideo() {
  if (!checkVideo()) return
  const res = await uploadVideo({ id: state.id, video: fileData.value }, event => {
    uploadProgress.value = Math.round((100 * event.loaded) / event.total)
  })
  if (res.message) {
    message.videoError = res.message
    return
  }
  state.video = res.video
  await clearFile()
  message.videoSuccess = 'Đã lưu'
}

function checkLesson() {
  message.formSuccess = ''
  if (!state.title) {
    message.formError = 'Chưa nhập tiêu đề'
    return false
  }
  if (!state.sort_order) {
    message.formError = 'Chưa nhập số thứ tự'
    return false
  }
  message.formError = ''
  return true
}

function checkVideo() {
  message.videoSuccess = ''
  if (!(route.params.lessonId > 0)) {
    message.videoError = 'Lưu thông tin bài giảng trước'
    return false
  }
  message.videoError = ''
  return true
}

// watch
watch(() => state, checkLesson, { deep: true })
watch(() => fileUrl.value, checkVideo, { deep: true })
</script>
