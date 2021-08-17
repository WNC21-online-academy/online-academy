<template>
  <div>
    <ul class="flex justify-center items-center my-4 font-medium">
      <li
        class="cursor-pointer py-2 px-4 text-gray-500 border-b-8"
        :class="activeTab === 1 ? 'text-green-500 border-green-500' : ''"
        @click="activeTab = 1"
        v-text="'Khóa học đang quản lý'"
      ></li>
      <li
        class="cursor-pointer py-2 px-4 text-gray-500 border-b-8"
        :class="activeTab === 2 ? 'text-green-500 border-green-500' : ''"
        @click="activeTab = 2"
        v-text="'Thông tin giảng viên'"
      ></li>
    </ul>

    <div class="max-w-2xl mx-auto py-5">
      <div v-show="activeTab === 1">
        <AdminBase
          :fields="fields"
          :fetchData="fetchAllByTeacher"
          :removeItem="remove"
          enableAdd
          enableRedirectDetail
          enableRemove
        />
      </div>
      <div v-show="activeTab === 2">
        <ProfileForm />
      </div>
    </div>

    <BackTo class="max-w-2xl mx-auto" />
  </div>
</template>

<script setup>
import { ref } from "vue"
import { fetchAllByTeacher, remove } from '../../services/courses.service'
import BackTo from '../../components/BackTo.vue'
import AdminBase from '../../components/Admin/AdminBase.vue'
import ProfileForm from '../../components/Teacher/ProfileForm.vue'

const fields = [{
  key: 'thumbnail',
  title: '     ',
  type: 'image'
}, {
  key: 'name',
  title: 'Tên khóa học'
}, {
  key: 'name_category',
  title: 'Lĩnh vực',
  default: 'Không có'
},{
  key: 'is_completed',
  title: 'Hoàn thành',
  type: 'boolean',
  trueValue: 'Rối',
  falseValue: 'Chưa'
}, {
  key: 'is_draft',
  title: 'Trạng thái',
  type: 'boolean',
  trueValue: 'Nháp',
  falseValue: 'Công khai'
},  {
  key: 'updated_at',
  title: 'Cập nhật',
  type: 'datetime',
  default: 'Không rõ'
}]

// state
const activeTab = ref(1)
</script>
