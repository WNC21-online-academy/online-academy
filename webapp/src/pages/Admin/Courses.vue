<template>
  <AdminBase
    :fields="fields"
    :fetchData="fetchCourses"
    :removeItem="remove"
    :detailComponent="CourseDetail"
    enableRead
    enableRemove
  />
</template>

<script setup>
import { fetchAll, remove } from '../../services/courses.service'
import AdminBase from '../../components/Admin/AdminBase.vue'
import CourseDetail from '../../components/Admin/Modals/CourseDetail.vue'

const fields = [{
  key: 'thumbnail',
  title: '',
  type: 'image'
}, {
  key: 'name',
  title: 'Tên khóa'
}, {
  key: 'name_category',
  title: 'Lĩnh vực',
  default: 'Không có'
}, {
  key: 'name_creator',
  title: 'Giáo viên'
}, {
  key: 'registed',
  title: 'Số lượng học viên',
  default: 0
}, {
  key: 'is_suspended',
  title: 'Trạng thái',
  type: 'boolean',
  trueValue: 'Đình chỉ',
  falseValue: 'Hoạt động'
}]

function fetchCourses() {
  return fetchAll(Object.assign({}, ...arguments, { is_suspended: true }))
}
</script>
