<template>
  <!-- Modal Background -->
  <div
    v-show="showModal"
    class="fixed text-gray-500 flex items-center justify-center overflow-auto z-50 bg-black bg-opacity-40 left-0 right-0 top-0 bottom-0"
  >
    <!-- Modal -->
    <div v-show="showModal" class="bg-white rounded-xl shadow-2xl p-5 w-full sm:w-96 mx-10">
      <!-- Title -->
      <span class="relative font-bold block text-xl mb-3">
        Xóa lĩnh vực {{ item.name }} ?
        <a
          class="absolute top-0 right-0 text-2xl font-bold hover:text-gray-700"
          @click="onToggleModal(false)"
        >&times;</a>
      </span>

      <p v-show="messageError" class="flex font-medium text-sm text-red-700 py-4">
        <WarningIcon class="pr-1" />
        {{ messageError }}
      </p>
      <!-- Buttons -->
      <div class="text-right space-x-5 mt-5">
        <button
          class="px-4 py-2 text-sm bg-white rounded-xl border transition-colors duration-150 ease-linear border-gray-200 text-gray-500 focus:outline-none focus:ring-0 font-bold hover:bg-gray-100 focus:bg-indigo-50 focus:text-indigo"
          @click="onToggleModal(false)"
        >Đóng</button>
        <a
          target="_blank"
          class="px-4 py-2 text-sm text-white bg-blue-500 border-blue-500 rounded-xl border transition-colors duration-150 ease-linear border-gray-200 focus:outline-none focus:ring-0 font-bold hover:bg-blue-600 focus:text-indigo"
          @click="onSubmit"
        >Xóa</a>
      </div>
    </div>
  </div>
</template>

<script setup>
import { defineEmit, defineProps, inject, ref, watch } from "vue";
import WarningIcon from '../../Icons/WarningIcon.vue';
import CheckIcon from '../../Icons/CheckIcon.vue';

const store = inject('store')

// props
const props = defineProps({
  showModal: Boolean,
  item: Object,
  removeItem: Function
})

// error messages
const messageError = ref()

// emit events
const emit = defineEmit(['toggleModal', 'onRemoved'])
function onToggleModal(value) {
  emit('toggleModal', value)
}

// event submit form
async function onSubmit() {
  const { id } = props.item
  const result = await props.removeItem({ id })

  if (!result.message && +result.id > 0) {
    await emit('onRemoved', result.id)
    onToggleModal(false)
  }
  else {
    messageError.value = result.message
  }
}

// watch
watch(() => props.showModal, () => {
  if (!props.showModal) {
    messageError.value = ''
  }
})
</script>
