<template>
  <div>
    <ul class="flex justify-center items-center my-4 font-medium">
      <li
        class="cursor-pointer py-2 px-4 text-gray-500 border-b-8"
        :class="activeTab === 1 ? 'text-green-500 border-green-500' : ''"
        @click="activeTab = 1"
        v-text="'Danh sách bài giảng'"
      ></li>
      <li
        class="cursor-pointer py-2 px-4 text-gray-500 border-b-8"
        :class="activeTab === 2 ? 'text-green-500 border-green-500' : ''"
        @click="activeTab = 2"
        v-text="'Chi tiết khóa học'"
      ></li>
    </ul>

    <div class="max-w-2xl mx-auto py-5">
      <div v-show="activeTab === 1">
        <AdminBase
          :fields="fields"
          :fetchData="fetchLessons"
          :removeItem="remove"
          enableRedirectDetail
          :enableAdd="id > 0"
        />
      </div>
      <div v-show="activeTab === 2">
        <CourseForm />
      </div>
    </div>

    <BackTo to="/teacher/owncourses" title="Quay lại danh sách khóa học" class="max-w-2xl mx-auto " />
  </div>
</template>

<script setup>
import { computed, onMounted, ref } from "vue"
import { useRoute } from "vue-router"
import { fetchAllByCourse, remove } from '../../services/lessons.service'
import BackTo from '../../components/BackTo.vue'
import AdminBase from '../../components/Admin/AdminBase.vue'
import CourseForm from '../../components/Teacher/CourseForm.vue'

const fields = [{
  key: 'sort_order',
  title: 'Thứ tự'
}, {
  key: 'title',
  title: 'Tên bài giảng'
}, {
  key: 'is_draft',
  title: 'Trạng thái',
  type: 'boolean',
  trueValue: 'Nháp',
  falseValue: 'Công khai'
}, {
  key: 'updated_at',
  title: 'Cập nhật',
  type: 'datetime',
  default: 'Không rõ'
}]

const route = useRoute()
const id = computed(() => route.params.id)
const fetchLessons = id.value > 0 ? args => fetchAllByCourse({ ...args, id: id.value }) : null

// state
const activeTab = ref(1)

// on mounted
onMounted(() => {
  if (!(id.value > 0)) {
    activeTab.value = 2
  }
})
</script>
