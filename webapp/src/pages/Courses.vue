<template>
  <SearchBox />
  <Grid :list="state.courses" :totalPages="+totalPages" :currentPage="+currentPage" />
</template>

<script setup>
import { computed, onMounted, reactive, watch } from 'vue';
import { onBeforeRouteUpdate, useRoute, useRouter } from 'vue-router'
import Grid from '../components/Grid/Grid.vue';
import SearchBox from '../components/SearchBox/SearchBox.vue';
import { search } from '../services/courses.service';

const router = useRouter()
const route = useRoute()
const perPage = 8
const defaultPage = 1

// State
const state = reactive({
  courses: [],
  count: 0,
})

// Computed
const totalPages = computed(function () {
  return Math.ceil(state.count / perPage)
})
const currentPage = computed(function () {
  return route.query.page || defaultPage
})
const categoryId = computed(function () {
  return route.params.id || route.query.category
})

// Function get course list 
async function searchCourses() {
  const searchResult = await search({
    keyword: route.query.keyword,
    categoryId: categoryId.value,
    orderBy: route.query.order_by,
    limit: perPage,
    offset: perPage * (currentPage.value - 1)
  })
  state.courses = searchResult.list
  state.count = searchResult.count

}

// Get course list
await searchCourses()

// Watch query params to refetch course list
watch(() => route.query, async () => {
  await searchCourses()
})

// redirect on invalid page
if (currentPage.value > totalPages.value) {
  router.push({
    path: route.path,
    query: {
      ...route.query,
      page: undefined
    }
  })
}
</script>
