<template>
  <header>
    <NavBar
      :menu="menu"
      :showCategoriesChildren="showCategoriesChildren"
      @onMobileToggle="onMobileToggle"
    />
    <NavMobile v-show="mobileToggle" :menu="menu" @onMobileToggle="onMobileToggle" />
  </header>
</template>

<script setup>
import { inject, reactive, ref } from 'vue'
import NavBar from './NavBar.vue';
import NavMobile from './NavMobile.vue';

const store = inject('store')
const menu = reactive(store.getters.menu())

const showCategoriesChildren = ref(false)
const mobileToggle = ref(false)
function onMobileToggle(value = false) {
  mobileToggle.value = value
}

const state = reactive({ mobileToggle, showCategoriesChildren })
</script>
