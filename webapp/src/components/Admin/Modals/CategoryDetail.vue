<template>
  <!-- Modal Background -->
  <div
    v-show="showModal"
    class="fixed text-gray-500 flex items-center justify-center overflow-auto z-50 bg-black bg-opacity-40 left-0 right-0 top-0 bottom-0"
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
      <div class="px-5 py-7">
        <label
          v-show="formData.id"
          class="font-semibold text-sm text-gray-600 pb-1 block"
        >Mã khóa học</label>
        <input
          v-show="formData.id"
          v-model="formData.id"
          type="text"
          class="border rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full"
          disabled
        />
        <label class="font-semibold text-sm text-gray-600 pb-1 block">Họ tên</label>
        <input
          v-model="formData.name"
          type="text"
          class="border rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full"
          label
          :disabled="!writable"
        />
        <label class="font-semibold text-sm text-gray-600 pb-1 block">Thuộc lĩnh vực</label>
        <CategoriesBox
          class="flex-grow"
          :list="categories"
          :selectedItem="{ id: formData.id_parent, name: formData.name_parent }"
          defaultTitle="Không"
          @onSelect="onSelectCategory"
          :disabled="!writable"
        />

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
          target="_blank"
          class="px-4 py-2 text-sm text-white bg-blue-500 border-blue-500 rounded-xl border transition-colors duration-150 ease-linear border-gray-200 focus:outline-none focus:ring-0 font-bold hover:bg-blue-600 focus:text-indigo"
          :disabled="!writable"
          @click="onSubmit"
        >Lưu</a>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, defineEmit, defineProps, inject, ref, watch } from "vue";
import WarningIcon from '../../Icons/WarningIcon.vue';
import CheckIcon from '../../Icons/CheckIcon.vue';
import CategoriesBox from '../../SearchBox/CategoriesBox.vue';
import { addOrUpdate } from '../../../services/categories.service';

const store = inject('store')

// props
const props = defineProps({
  showModal: Boolean,
  formData: Object,
  writable: Boolean
})


// error messages
const messageError = ref()
const messageSuccess = ref()

// Handle select parent
function onSelectCategory(payload) {
  props.formData.id_parent = payload?.id
  props.formData.name_parent = payload?.name
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

// computed
const categories = computed(() => store.getters.menu() || [])

// watch 
watch(props.formData, () => {
  messageError.value = ''
  messageSuccess.value = ''
})
</script>
