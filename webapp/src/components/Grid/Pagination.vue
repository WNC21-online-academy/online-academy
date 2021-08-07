<template>
  <div class="flex flex-col items-center my-12">
    <div class="flex text-gray-700">
      <div
        class="h-12 w-12 mr-1 flex justify-center items-center rounded-full bg-gray-200"
        :class="{
          'cursor-pointer hover:bg-green-300': currentPage != 1,
          'opacity-50': currentPage == 1
        }"
        @click="onClickPrevPage"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="100%"
          height="100%"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          class="feather feather-chevron-left w-6 h-6"
        >
          <polyline points="15 18 9 12 15 6" />
        </svg>
      </div>
      <div class="flex h-12 font-medium rounded-full bg-gray-200">
        <template v-for="item in totalPages">
          <div
            v-if="item < 3 || currentPage == item || totalPages - item < 2"
            class="w-12 md:flex justify-center items-center hidden leading-5 transition duration-150 ease-in rounded-full"
            :class="{
              'cursor-pointer hover:bg-green-300': currentPage != item,
              'bg-green-600 text-white': currentPage == item
            }"
            @click="onClickPagination(item)"
          >{{ item }}</div>

          <div
            v-else-if="(currentPage > 3 && item == currentPage - 1) || (currentPage < totalPages - 2 && item == currentPage + 1) || (currentPage == totalPages && item == totalPages - 2) || (currentPage == 1 && item == 3)"
            class="w-12 md:flex justify-center items-center hidden leading-5 transition duration-150 ease-in rounded-full"
          >...</div>
        </template>
      </div>
      <div
        class="h-12 w-12 ml-1 flex justify-center items-center rounded-full bg-gray-200"
        :class="{
          'cursor-pointer hover:bg-green-300': currentPage != totalPages,
          'opacity-50': currentPage == totalPages
        }"
        @click="onClickNextPage"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="100%"
          height="100%"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          class="feather feather-chevron-right w-6 h-6"
        >
          <polyline points="9 18 15 12 9 6" />
        </svg>
      </div>
    </div>
  </div>
</template>

<script setup>
import { defineProps } from "vue";
import { useRouter, useRoute } from 'vue-router'

const props = defineProps({
  totalPages: Number,
  currentPage: Number
})

const router = useRouter()
const route = useRoute()

function onClickPagination(page) {
  if (page == props.currentPage) {
    return
  }
  router.push({
    path: route.path,
    query: {
      ...route.query,
      page
    }
  })
}

function onClickPrevPage(page) {
  if (props.currentPage > 1) {
    onClickPagination(props.currentPage - 1)
  }
}
function onClickNextPage(page) {
  if (props.currentPage < props.totalPages) {
    onClickPagination(props.currentPage + 1)
  }
}
</script>