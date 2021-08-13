<template>
  <AdminBase
    :fields="fields"
    :fetchData="fetchAll"
    :removeItem="remove"
    :detailComponent="CategoryDetail"
    enableAdd
    enableEdit
    enableRemove
  />
</template>

<script setup>
import { fetchAll, remove } from '../../services/categories.service'
import AdminBase from '../../components/Admin/AdminBase.vue'
import CategoryDetail from '../../components/Admin/Modals/CategoryDetail.vue'

const fields = [{
  key: 'name',
  title: 'Tên lĩnh vực'
}, {
  key: 'counter_courses',
  title: 'Số khóa học',
  default: 0
}, {
  key: 'name_parent',
  title: 'Lĩnh vực cha',
  default: 'Không có'
}]

</script>
