<template>
  <div class="border-b tab">
    <div class="border-l-2 border-transparent relative">
      <header class="flex justify-between items-center p-5 select-none tab-label space-x-2">
        <input
          v-model="state.keyword"
          class="flex-grow h-10 px-3 rounded focus:outline-none focus:shadow-outline px-8 shadow-lg"
          type="search"
          placeholder="Tìm kiếm khóa học..."
        />
        <button
          type="button"
          :class="{ 'bg-blue-300': state.showAdvancedSearch, 'bg-blue-500': !state.showAdvancedSearch }"
          class="flex-none text-white px-6 py-2 rounded font-medium mx-3 hover:bg-blue-600 transition duration-200 each-in-out focus:outline-none"
          @click="state.showAdvancedSearch = !state.showAdvancedSearch"
        >Nâng cao</button>
        <button
          type="button"
          class="flex-none bg-gray-700 text-white px-6 py-2 rounded font-medium mx-3 hover:bg-gray-800 transition duration-200 each-in-out"
          @click="onClickSearch"
        >Tìm kiếm</button>
      </header>

      <div
        v-show="state.showAdvancedSearch"
        class="flex flex-col md:flex-row px-5 pb-5 text-grey-darkest space-y-4 md:space-y-0 md:space-x-8"
      >
        <div class="flex w-full md:w-1/2">
          <label class="py-2 pr-5 text-sm leading-5 font-medium text-gray-800">Lĩnh vực</label>
          <CategoriesBox
            class="flex-grow"
            :list="categories"
            :selectedItem="selectedCat"
            @onSelect="onSelectCategory"
          />
        </div>
        <div div class="flex w-full md:w-1/2">
          <label class="py-2 pr-5 text-sm leading-5 font-medium text-gray-800">Sắp xếp</label>
          <SelectBox
            class="flex-grow"
            :list="ordering"
            :selectedItem="selectedOrder"
            @onSelect="onSelectOrder"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import * as _ from 'lodash'
import { computed, inject, reactive } from 'vue';
import { useRouter, useRoute } from 'vue-router'
import CategoriesBox from './CategoriesBox.vue';
import SelectBox from './SelectBox.vue';

const router = useRouter()
const route = useRoute()
const store = inject('store')

// constant
const ordering = [{
  id: 'rate_desc',
  name: 'Đánh giá giảm dần'
},
{
  id: 'rate_asc',
  name: 'Đánh giá tăng dần'
},
{
  id: 'tutition_desc',
  name: 'Giá giảm dần'
},
{
  id: 'tutition_asc',
  name: 'Giá tăng dần'
}, {
  id: '',
  name: 'Không'
}]

// computed
const categories = computed(() => store.getters.menu() || [])
const categoryChildren = computed(() => store.getters.categoryChildren() || [])

// state
const state = reactive({
  showAdvancedSearch: false,
  keyword: route.query.keyword,
})

const selectedCat = reactive({
  id: route.query.category,
  name: store.getters.categoryNameById(route.query.category)
})
const selectedOrder = reactive({
  id: route.query.orderby,
  name: _.find(ordering, { 'id': route.query.orderby })?.name
})

// events
function onSelectCategory(payload) {
  selectedCat.id = payload?.id
  selectedCat.name = payload?.name
}
function onSelectOrder(payload) {
  selectedOrder.id = payload?.id
  selectedOrder.name = payload?.name
}

function onClickSearch() {
  if (!state.keyword && !selectedCat.id && !selectedOrder) return
  const filter = {
    keyword: state.keyword
  }
  if (state.showAdvancedSearch) {
    filter.category = selectedCat.id
    filter.order_by = selectedOrder.id
  }
  router.push({
    path: '/search',
    query: {
      ...filter
    },
  })
}

</script>
