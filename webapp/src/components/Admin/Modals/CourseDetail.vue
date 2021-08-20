<template>
  <!-- Modal Background -->
  <div
    v-show="showModal"
    class="fixed text-gray-500 flex justify-center overflow-auto z-50 bg-black bg-opacity-40 top-0"
    @scroll.prevent
  >
    <!-- Modal -->
    <div v-show="showModal" class="bg-white rounded-xl shadow-2xl p-6 sm:w-10/12 mx-10">
      <!-- Title -->
      <span class="relative font-bold block text-2xl mb-3">
        Thông tin lĩnh vực
        <a
          class="absolute top-0 right-0 text-2xl font-bold hover:text-gray-700"
          @click="onToggleModal(false)"
        >&times;</a>
      </span>
      <!-- Form -->
      <div class="flex flex-wrap">
        <div class="w-full px-3 pb-4">
          <label class="font-semibold text-sm text-gray-600">Đình chỉ khóa học</label>
          <input
            v-model="state.is_suspended"
            type="checkbox"
            class="focus:ring-indigo-500 ml-4 h-4 w-4 text-indigo-600 border-gray-300 rounded"
            @change="onClickSuspend"
          />
        </div>
        <div class="md:w-1/2 px-3">
          <label
            v-show="state.id"
            class="font-semibold text-sm text-gray-600 pb-1 block"
          >Mã khóa học</label>
          <input
            v-show="state.id"
            v-model="state.id"
            type="text"
            class="border rounded-lg px-3 py-2 text-sm w-full"
            disabled
          />
        </div>
        <div class="md:w-1/2 px-3">
          <label class="font-semibold text-sm text-gray-600 pb-1 block">Tên khóa</label>
          <input
            v-model="state.name"
            type="text"
            class="border rounded-lg px-3 py-2 text-sm w-full"
            label
            :disabled="!writable"
          />
        </div>
        <div class="md:w-1/2 p-3">
          <label class="font-semibold text-sm text-gray-600 pb-1 block">Thuộc lĩnh vực</label>
          <CategoriesBox
            class="flex-grow"
            :list="categories"
            :selectedItem="{ id: state.id_category, name: state.name_category }"
            defaultTitle="Không"
            @onSelect="onSelectCategory"
            :disabled="!writable"
          />
        </div>
        <div class="md:w-1/2 px-3">
          <label class="font-semibold text-sm text-gray-600 pb-1 block">Giáo viên phụ trách</label>
          <input
            v-model="state.name_creator"
            type="text"
            class="border rounded-lg px-3 py-2 text-sm w-full"
            label
            :disabled="!writable"
          />
        </div>
        <div class="md:w-1/2 px-3">
          <label class="font-semibold text-sm text-gray-600 pb-1 block">Mô tả</label>
          <textarea
            v-model="state.description"
            type="text"
            class="border rounded-lg px-3 py-2 text-sm w-full"
            rows="4"
            cols="50"
            :disabled="!writable"
          />
        </div>
        <div class="md:w-1/2 px-3">
          <label class="font-semibold text-sm text-gray-600 pb-1 block">Nội dung</label>
          <textarea
            v-model="state.content"
            type="text"
            class="border rounded-lg px-3 py-2 text-sm w-full"
            rows="4"
            cols="50"
            :disabled="!writable"
          />
        </div>
        <div class="md:w-1/2 px-3">
          <label class="font-semibold text-sm text-gray-600 pb-1 block">Học phí</label>
          <input
            v-model="state.tutition"
            type="text"
            class="border rounded-lg px-3 py-2 text-sm w-full"
            label
            :disabled="!writable"
          />
        </div>
        <div class="md:w-1/2 p-3">
          <label class="font-semibold text-sm text-gray-600 pb-1 block">Lượt xem</label>
          <input
            v-model="state.view_count"
            type="number"
            class="border rounded-lg px-3 py-2 text-sm w-full"
            label
            :disabled="!writable"
          />
        </div>
        <div class="md:w-1/2 p-3">
          <label class="font-semibold text-sm text-gray-600 pb-1 block">Hoàn thành</label>
          <div
            class="px-3 py-2 text-sm w-full"
          >{{ state.is_completed ? 'Đã hoàn thành' : 'Chưa hoàn thành' }}</div>
        </div>
        <div class="md:w-1/2 p-3">
          <label class="font-semibold text-sm text-gray-600 pb-1 block">Đánh giá trung binh</label>
          <div
            class="px-3 py-2 text-sm w-full"
          >{{ state.rating ? `${state.rating} điểm` : 'Chưa có đánh giá' }}</div>
        </div>

        <p v-show="messageError" class="flex font-medium text-sm text-red-700 py-4">
          <WarningIcon class="pr-1" />
          {{ messageError }}
        </p>
        <p v-show="messageSuccess" class="flex font-medium text-sm text-green-600 py-4">
          <CheckIcon class="pr-1" />
          {{ messageSuccess }}
        </p>
      </div>
      <!-- Buttons -->
      <div class="text-right space-x-5 mt-5">
        <button
          class="px-4 py-2 text-sm bg-white rounded-xl border transition-colors duration-150 ease-linear border-gray-200 text-gray-500 focus:outline-none focus:ring-0 font-bold hover:bg-gray-100 focus:bg-indigo-50 focus:text-indigo"
          @click="onToggleModal(false)"
        >Đóng</button>
        <a
          v-if="writable"
          class="px-4 py-2 text-sm text-white bg-blue-500 border-blue-500 rounded-xl border transition-colors duration-150 ease-linear border-gray-200 focus:outline-none focus:ring-0 font-bold hover:bg-blue-600 focus:text-indigo"
          @click="onSubmit"
        >Lưu</a>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, defineEmit, defineProps, inject, onMounted, reactive, ref, watch } from "vue";
import WarningIcon from '../../Icons/WarningIcon.vue'
import CheckIcon from '../../Icons/CheckIcon.vue'
import CategoriesBox from '../../SearchBox/CategoriesBox.vue'
import { fetchById, suspend } from '../../../services/courses.service'

const store = inject('store')

// props
const props = defineProps({
  showModal: Boolean,
  formData: Object,
  writable: Boolean
})

// state
const state = reactive({
  is_suspended: false
})

// error messages
const messageError = ref()
const messageSuccess = ref()

// on mounted
onMounted(async () => {
  const id = props.formData.id
  if (id > 0) {
    const res = await fetchById({ id })
    await Object.assign(state, res)
  }
})

// Handle select parent
function onSelectCategory(payload) {
  props.formData.id_category = payload?.id
  props.formData.name_category = payload?.name
}

// emit events
const emit = defineEmit(['toggleModal', 'onAdded', 'onUpdated'])
function onToggleModal(value) {
  emit('toggleModal', value)
}

// event submit form
async function onSubmit() {
  if (!props.formData.name) {
    messageError.value = 'Chưa nhập tên lĩnh vực'
    return
  }

  const result = await addOrUpdate(props.formData)

  if (result?.message) {
    messageError.value = result.message
  }
  else {
    await emit(props.formData.id ? 'onUpdated' : 'onAdded', result)
    messageSuccess.value = 'Đã lưu'
  }
}

async function onClickSuspend() {
  const res = await suspend({
    id: props.formData.id,
    is_suspended: state.is_suspended
  })
  if (res) {
    await Object.assign(state, res)
  }
}

// computed
const categories = computed(() => store.getters.menu() || [])

// watch 
watch(props.formData, () => {
  messageError.value = ''
  messageSuccess.value = ''
})
</script>
