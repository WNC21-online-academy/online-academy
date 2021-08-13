<template>
  <AdminBase
    :fields="fields"
    :fetchData="fetchAll"
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
  key: 'name',
  title: 'Tên khóa'
}, {
  key: 'name_category',
  title: 'Lĩnh vực'
}, {
  key: 'name_teacher',
  title: 'Giáo viên'
}, {
  key: 'registed',
  title: 'Số lượng học viên'
}, {
  key: 'tutition',
  title: 'Học phí'
}]
</script>
