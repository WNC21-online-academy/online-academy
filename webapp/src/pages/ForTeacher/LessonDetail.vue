<template>
  <div>
    <ul class="flex justify-center items-center my-4 font-medium">
      <li
        class="cursor-pointer py-2 px-4 text-gray-500 border-b-8"
        :class="activeTab === 1 ? 'text-green-500 border-green-500' : ''"
        @click="activeTab = 1"
        v-text="'Chi tiết bài giảng'"
      ></li>
    </ul>

    <div class="max-w-2xl mx-auto py-5">
      <div v-show="activeTab === 1">
        <LessonForm />
      </div>
    </div>

    <BackTo
      :to="`/teacher/owncourses/${route.params.id}`"
      title="Quay lại chi tiết khóa học"
      class="max-w-2xl mx-auto"
    />
  </div>
</template>

<script setup>
import { computed, onMounted, ref } from "vue"
import { useRoute } from "vue-router"
import BackTo from '../../components/BackTo.vue'
import LessonForm from '../../components/Teacher/LessonForm.vue'

// route
const route = useRoute()

// state
const activeTab = ref(1)
</script>
