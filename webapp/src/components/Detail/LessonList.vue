<template>
  <div class="flex justify-center">
    <div class="bg-white rounded-lg w-full my-4">
      <ul class="divide-y divide-gray-300">
        <li v-if="!list.length" class="p-4">
          <div>Chưa có bài giảng</div>
        </li>
        <li
          v-for="item in list"
          class="p-4 hover:bg-gray-50 cursor-pointer"
          @click="onClickLesson(item.id)"
        >
          <div class>
            Bài {{ item.sort_order }}
            <p>{{ item.title }}</p>
          </div>
          <div class>Cập nhật: {{ toDatetime(item.updated_at) }}</div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup>
import { defineProps } from "vue"
import { useRoute, useRouter } from "vue-router";
import { toDatetime } from '../../utils/formator';

// router
const router = useRouter()
const route = useRoute()

// props
const props = defineProps({
  list: Array
})

function onClickLesson(lessonId) {
  router.push({
    name: 'lesson-detail',
    params: {
      ...route.params,
      lessonId
    }
  })

}
</script>
