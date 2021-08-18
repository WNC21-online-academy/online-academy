<template>
  <div class="shadow overflow-hidden sm:rounded-md">
    <div class="px-4 py-5 bg-white sm:p-6">
      <div class="grid grid-cols-6 gap-6">
        <div class="col-span-6 sm:col-span-3">
          <label class="block text-sm font-medium text-gray-700">Tên khóa</label>
          <input
            v-model="state.name"
            type="text"
            class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
          />
        </div>

        <div class="col-span-6 sm:col-span-3">
          <label class="block text-sm font-medium text-gray-700">Lĩnh vực</label>
          <CategoriesBox
            class="flex-grow"
            :list="categories"
            :selectedItem="{ id: state.id_category, name: state.name_category }"
            defaultTitle="Không"
            @onSelect="onSelectCategory"
          />
        </div>

        <div class="col-span-6 sm:col-span-3">
          <label class="block text-sm font-medium text-gray-700">Giáo viên phụ trách</label>
          <input
            :value="state.name_creator || store.state.user?.fullname"
            type="tel"
            class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md opacity-50"
            disabled
          />
        </div>

        <div class="col-span-6 sm:col-span-3">
          <label class="block text-sm font-medium text-gray-700">Học phí</label>
          <input
            v-model="state.tutition"
            type="number"
            step="1000"
            class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
          />
        </div>

        <div class="col-span-6 sm:col-span-3">
          <input
            v-model="state.is_completed"
            type="checkbox"
            class="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded"
          />
          <label class="pl-4 text-sm font-medium text-gray-700">Khóa học hoàn thành</label>
        </div>
        <div class="col-span-6 sm:col-span-3">
          <input
            v-model="state.is_draft"
            type="checkbox"
            class="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded"
          />
          <label class="pl-4 text-sm font-medium text-gray-700">Bản nháp</label>
        </div>

        <div class="col-span-6">
          <label class="block text-sm font-medium text-gray-700">Ảnh đại diện</label>
          <img v-show="!!thumbnail" :src="thumbnail" alt class="mt-2 mx-auto max-h-screen" />
          <div
            @dragenter.prevent
            @dragover.prevent
            @drop.prevent="onChangeFile"
            class="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md"
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
                  <input type="file" accept="image/*" class="hidden" @change="onChangeFile" />
                </label>
                <p class="pl-1">hoặc kéo thả vào đây</p>
              </div>
              <p class="text-xs text-gray-500">PNG, JPG, GIF</p>
            </div>
          </div>
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

        <div class="col-span-6">
          <label class="block text-sm font-medium text-gray-700">Nội dung</label>
          <div class="mt-1">
            <ckeditor :editor="ClassicEditor" v-model="state.content"></ckeditor>
          </div>
          <!-- <p
            class="mt-2 text-sm text-gray-500"
          >Brief description for your profile. URLs are hyperlinked.</p>-->
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
        @click="onSubmitCourse"
      >{{ route.params.id > 0 ? 'Cập nhật' : 'Thêm mới' }}</button>
    </div>
  </div>
</template>

<script setup>
import { computed, inject, onMounted, reactive, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import ClassicEditor from '@ckeditor/ckeditor5-build-classic'
import WarningIcon from '../Icons/WarningIcon.vue'
import CheckIcon from '../Icons/CheckIcon.vue'
import CategoriesBox from '../SearchBox/CategoriesBox.vue'
import { useUploadFile } from '../../composables/useUploadFile'
import { addOrUpdate, fetchById } from '../../services/courses.service'
import { BASE_URL } from '../../utils/contants'

// router
const router = useRouter()
const route = useRoute()

// store
const store = inject('store')

// hook
const { fileData, fileUrl, onChangeFile } = useUploadFile()

// state
const state = reactive({
  id: '',
  name: '',
  id_category: '',
  name_category: '',
  id_created_by: '',
  name_creator: '',
  tutition: '',
  thumbnail: '',
  description: '',
  content: '',
  is_completed: false,
  is_draft: true,
})
const message = reactive({
  formError: '',
  formSuccess: ''
})

// computed
const thumbnail = computed(() => fileUrl.value || (state.thumbnail ? BASE_URL + state.thumbnail : null))
const categories = computed(() => store.getters.menu() || [])

// mounted
onMounted(async () => {
  const id = route.params.id
  if (id > 0) {
    const course = await fetchById({ id })
    Object.assign(state, course)
  }
})

// events
async function onSubmitCourse() {
  if (!checkCourse()) return
  const res = await addOrUpdate({ ...state, thumbnail: fileData.value })
  if (res.message) {
    message.formError = res.message
    return
  }
  await Object.assign(state, res)
  message.formSuccess = 'Đã lưu'

  if (state.id) {
    router.replace({
      params: {
        id: state.id
      }
    })
  }
}

function onSelectCategory(payload) {
  state.id_category = payload?.id
  state.name_category = payload?.name
}

function checkCourse() {
  message.formSuccess = ''
  if (!state.name) {
    message.formError = 'Chưa nhập tên'
    return false
  }
  if (!state.tutition) {
    message.formError = 'Chưa nhập học phí'
    return false
  }
  message.formError = ''
  return true
}

// watch
watch(() => state, checkCourse, { deep: true })
</script>
