<template>
  <div class="py-5">
    <div class="grid grid-cols-2 gap-1">
      <div class="text-center sm:text-left whitespace-nowrap">
        <router-link
          :to="to || '/'"
          class="transition duration-200 mx-5 px-5 py-4 cursor-pointer font-normal text-sm rounded-lg text-gray-500 hover:bg-gray-200 focus:outline-none focus:bg-gray-300 focus:ring-2 focus:ring-gray-400 focus:ring-opacity-50 ring-inset"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            class="w-4 h-4 inline-block align-text-top"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M10 19l-7-7m0 0l7-7m-7 7h18"
            />
          </svg>
          <span class="inline-block ml-1" v-text="title || 'Quay về trang chủ'"></span>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script setup>
import { defineProps } from "vue";

defineProps({
  to: String,
  title: String
})
</script>
