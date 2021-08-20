<template>
  <div>
    <CardInfo
      :data="state.course"
      :lessons="state.lessons"
      :comments="state.comments"
      @loadData="getData"
      @onAddedComment="onAddedComment"
    />
  </div>
</template>

<script setup>
import { inject, onMounted, reactive } from 'vue';
import { useRoute } from 'vue-router'
import CardInfo from '../components/Detail/CardInfo.vue';
import { fetchById } from '../services/courses.service';
import { fetchAllByCourse as fetchLessons } from '../services/lessons.service';
import { fetchByCourse as fetchComments } from '../services/rating.service';

const route = useRoute()

const store = inject('store')

// State
const state = reactive({
  course: {},
  lessons: [],
  comments: []
})

// Function get data
async function getData() {
  await getDetail()
  if (state.course.id && state.course.is_joined) {
    await getLessons(state.course.id)
  }
  await getComments(state.course.id)
}

async function getDetail(id) {
  const payload = {
    id: id || route.params.id,
    userId: store.state.user?.id
  }
  state.course = await fetchById(payload)
}
async function getLessons(courseId) {
  const res = await fetchLessons({ id: courseId || route.params.id })
  if (res.message) {
    return
  }
  state.lessons = res.list
}
async function getComments(courseId) {
  const res = await fetchComments({ id: courseId || route.params.id })
  if (res.message) {
    return
  }
  state.comments = res.list
}

function onAddedComment(item) {
  state.comments.unshift(item)
}

// Get course info
onMounted(async () => {
  await getData()
})
</script>
