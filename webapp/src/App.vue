<template>
  <Suspense>
    <template #default>
      <Layout>
        <router-view />
      </Layout>
    </template>
    <template #fallback>
      <Loading />
    </template>
  </Suspense>
</template>

<script setup>
import { provide } from 'vue'
import store from './store'
import Layout from './layout/Layout.vue'
import Loading from './components/Loading.vue'

provide('store', store)

</script>
