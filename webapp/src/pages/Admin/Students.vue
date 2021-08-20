<template>
  <AdminBase
    :fields="fields"
    :fetchData="fetchAllStudent"
    :removeItem="remove"
    :detailComponent="UserDetail"
    enableAdd
    enableEdit
    enableRemove
  />
</template>

<script setup>
import { fetchAllStudent, remove } from '../../services/user.service';
import AdminBase from '../../components/Admin/AdminBase.vue';
import UserDetail from '../../components/Admin/Modals/UserDetails/StudentDetail.vue'

const fields = [{
  key: 'avatar',
  title: '',
  type: 'image'
},{
  key: 'fullname',
  title: 'Họ tên'
}, {
  key: 'email',
  title: 'Email'
}, {
  key: 'name_role',
  title: 'Vai trò'
}, {
  key: 'lock',
  title: 'Trạng thái',
  type: 'boolean',
  trueValue: 'Khóa',
  falseValue: 'Hoạt động'
}]

</script>
