<template>
  <div class="p-5 mx-auto max-w-screen-xl">
    <h2 class="font-bold uppercase text-gray-700 text-xl pb-4">{{ title || 'Khóa học' }}</h2>

    <div v-if="totalPages == 0" class="py-8 font-medium text-center max-w-full">Không có dữ liệu!</div>
    <div
      class="grid grid-flow-row-dense gap-6 justify-between sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
    >
      <GridItem v-for="item in list" :key="item" :item="item" />
    </div>
  </div>
  <Pagination v-if="totalPages > 0" :totalPages="totalPages" :currentPage="currentPage" />
</template>

<script setup>
import { defineProps } from 'vue'
import Pagination from './Pagination.vue'
import GridItem from './GridItem.vue'

defineProps({
  title: String,
  list: Array,
  totalPages: Number,
  currentPage: Number
})

</script>