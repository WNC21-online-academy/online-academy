<template>
  <UserDetail :defaultRole="defaultRole" />
</template>

<script setup>
import UserDetail from './UserDetail.vue';

const defaultRole = {
  id: 'student',
  name: 'Học viên'
}
</script>
