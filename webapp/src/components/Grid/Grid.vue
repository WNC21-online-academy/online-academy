<template>
  <div class="p-5 mx-auto max-w-screen-xl">
    <h2 class="font-bold uppercase text-xl pb-4">Khóa học</h2>

    <div v-if="totalPages == 0" class="py-8 font-medium text-center max-w-full">Không có dữ liệu!</div>
    <div
      class="grid grid-flow-row-dense grid-cols-2 gap-3 justify-between sm:grid-cols-3 md:grid-cols-4"
    >
      <div v-for="item in list" :key="item">
        <img
          class="h-48 border border-yellow-700 mb-1 border-solid w-full hover:border-yellow-500"
          alt="Best seller"
          :src="item.thumbnail"
          loading="lazy"
        />
        <router-link :to="`/courses/${item.id}`">
          <h2 class="pt-2 m-0 leading-4 font-semibold">{{ item.name }}</h2>
        </router-link>
        <p>{{ item.tutition }} đ</p>
        <p class="text-green-500 italic font-medium">{{ item.description }}</p>
      </div>
    </div>
  </div>
  <Pagination v-if="totalPages > 0" :totalPages="totalPages" :currentPage="currentPage" />

  <div class="bg-gray-200">
    <section class="py-5 mx-auto max-w-screen-xl sm:flex flex-grow-0 sm:p-5">
      <article class="flex-col justify-center inline-flex self-stretch p-6">
        <h2 class="uppercase font-semibold text-xl">Design</h2>
        <strong class="text-lg pb-2 font-normal font-sans sm:text-2xl">Our 30 Year Journey</strong>
        <p
          class="text-sm pb-4"
        >Join us as we revisit our roots, tracing the path from bright idea to industry disruptors with a plan to fight climate change while creating beautiful things.</p>
        <router-link
          to="signin"
          class="font-semibold uppercase border-black border p-3 max-w-max hover:bg-gray-600 hover:text-white"
        >Join us</router-link>
      </article>
      <figure>
        <img
          src="https://images.unsplash.com/photo-1606170033648-5d55a3edf314?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MjR8fGxpZ2h0c3xlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60"
          alt="Banner"
          looding="lazy"
        />
      </figure>
    </section>
  </div>
</template>

<script setup>
import { computed, defineProps } from 'vue'
import Pagination from './Pagination.vue';
const props = defineProps({
  list: Array,
  totalPages: Number,
  currentPage: Number
})

</script>