<template>
  <div>
    <Header />

    <main class="min-h-screen">
      <slot />
    </main>

    <footer>
      <Footer />
    </footer>
  </div>
</template>

<script setup>
import { defineProps, defineAsyncComponent, inject, ref } from 'vue'
import Header from './Header.vue'
import Footer from './Footer.vue'
import Loading from '../components/Loading.vue'

// const AsyncHeader = defineAsyncComponent({
//   loader: () => import('./Header.vue'),
//   loadingComponent: import('../components/Loading.vue'),
//   delay: 200,
//   // errorComponent: 
//   // timeout: 3000,
//   suspensible: false
// })

</script>
