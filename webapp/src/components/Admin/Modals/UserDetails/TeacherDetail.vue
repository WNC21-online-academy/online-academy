<template>
  <UserDetail :defaultRole="defaultRole" />
</template>

<script setup>
import UserDetail from './UserDetail.vue';

const defaultRole = {
  id: 'teacher',
  name: 'Giáo viên'
}
</script>
