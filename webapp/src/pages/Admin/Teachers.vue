<template>
  <AdminBase
    :fields="fields"
    :fetchData="fetchAllTeacher"
    :removeItem="remove"
    :detailComponent="UserDetail"
    enableAdd
    enableEdit
    enableRemove
  />
</template>

<script setup>
import { fetchAllTeacher, remove } from '../../services/user.service'
import AdminBase from '../../components/Admin/AdminBase.vue'
import UserDetail from '../../components/Admin/Modals/UserDetails/TeacherDetail.vue'

const fields = [{
  key: 'fullname',
  title: 'Họ tên'
}, {
  key: 'email',
  title: 'Email'
}, {
  key: 'name_role',
  title: 'Vai trò'
}]

</script>
