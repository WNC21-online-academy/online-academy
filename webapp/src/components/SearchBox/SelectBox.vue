<template>
  <div class="space-y-1">
    <div class="w-full relative">
      <span class="inline-block w-full rounded-md shadow-sm">
        <button
          v-click-outside="toggleSelect"
          @click="toggleSelect(!open)"
          type="button"
          class="w-full rounded-md border border-gray-300 bg-white pl-3 pr-10 py-2 text-left focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition ease-in-out duration-150 sm:text-sm sm:leading-5 cursor-default"
          :class="{ 'cursor-pointer': !disabled }"
          :disabled="disabled"
        >
          <div class="flex items-center space-x-3">
            <span class="block truncate">{{ selectedItem.name || 'Không' }}</span>
          </div>
          <span class="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
            <svg class="h-5 w-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
              <path
                d="M10 3a1 1 0 01.707.293l3 3a1 1 0 01-1.414 1.414L10 5.414 7.707 7.707a1 1 0 01-1.414-1.414l3-3A1 1 0 0110 3zm-3.707 9.293a1 1 0 011.414 0L10 14.586l2.293-2.293a1 1 0 011.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z"
                clip-rule="evenodd"
                fill-rule="evenodd"
              />
            </svg>
          </span>
        </button>
      </span>
      <div v-show="open" class="absolute mt-1 w-full rounded-md bg-white shadow-lg z-10">
        <ul
          tabindex="-1"
          class="max-h-56 rounded-md text-base leading-6 shadow-xs overflow-auto focus:outline-none sm:text-sm sm:leading-5"
        >
          <li
            v-for="item in list"
            :class="{ 'text-white bg-blue-500 cursor-default': selectedItem.id === item.id, 'text-gray-900 hover:text-gray-900 hover:bg-indigo-200 cursor-pointer': selectedItem.id !== item.id }"
            class="select-none relative py-2 pl-4 pr-9"
            @click="onSelect(item)"
          >
            <div class="flex items-center space-x-3">
              <span
                :class="{ 'font-semibold': selectedItem.id === item.id, 'font-normal': selectedItem.id !== item.id }"
                class="font-normal block truncate"
              >{{ item.name }}</span>
            </div>
            <span
              v-show="selectedItem.id === item.id"
              :class="{ 'text-white': selectedItem.id === item.id, 'text-indig o-600': selectedItem.id !== item.id }"
              class="absolute inset-y-0 right-0 flex items-center pr-4"
            >
              <svg class="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fill-rule="evenodd"
                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                  clip-rule="evenodd"
                />
              </svg>
            </span>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, defineEmit, defineProps, reactive, ref, toRefs } from "vue";

const props = defineProps({
  list: Array,
  selectedItem: Object,
  disabled: Boolean
})

const open = ref(false)

function toggleSelect(value = false) {
  open.value = value
}

const emit = defineEmit(['onSelect'])
function onSelect(payload) {
  emit('onSelect', payload)
}
</script>
