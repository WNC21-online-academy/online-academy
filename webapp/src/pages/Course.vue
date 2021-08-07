<template>
  <div>
    <CardInfo :detail="state.course" />
  </div>
</template>

<script setup>
import { reactive } from 'vue';
import { useRoute } from 'vue-router'
import CardInfo from '../components/Detail/CardInfo.vue';
import { fetchById } from '../services/courses.service';

const route = useRoute()

// State
const state = reactive({
  course: []
})

// Function get course list 
async function getDetail() {
  state.course = await fetchById({ courseId: route.params.id })
}

// Get course info
await getDetail()
</script>
