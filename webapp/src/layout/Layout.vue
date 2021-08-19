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
import { defineProps, defineAsyncComponent, inject, ref, onMounted } from 'vue'
import Header from './Header.vue'
import Footer from './Footer.vue'
import Loading from '../components/Loading.vue'

const store = inject('store')

onMounted(async () => await store.methods.loadCategories())
</script>