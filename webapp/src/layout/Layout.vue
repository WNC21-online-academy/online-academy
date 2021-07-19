<template>
  <div class="bg-blue-50">
    <Header />
    <main>
      <!-- 
      <template #default>-->
      <slot />
      <!--</template>
        <template #fallback>
          <Loading />
        </template>
      </Suspense>-->
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
import { getCategories } from '../services/categories.service'

const AsyncHeader = defineAsyncComponent({
  loader: () => import('./Header.vue'),
  loadingComponent: import('../components/Loading.vue'),
  delay: 200,
  // errorComponent: 
  // timeout: 3000,
  suspensible: false
})

defineProps({
  msg: String
})

const store = inject('store')
const categories = await getCategories();
store.methods.setCategories(categories)

</script>
