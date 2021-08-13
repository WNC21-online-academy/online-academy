<template>
  <header>
    <NavBar
      :menu="menu"
      :showCategoriesChildren="showCategoriesChildren"
      @onCategoriesToggle="onCategoriesToggle"
      @onMobileToggle="onMobileToggle"
      @onLogout="onLogout"
    />
    <NavMobile
      v-show="mobileToggle"
      :menu="menu"
      @onMobileToggle="onMobileToggle"
      @onLogout="onLogout"
    />
  </header>
</template>

<script setup>
import { computed, inject, reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import NavBar from './NavBar.vue'
import NavMobile from './NavMobile.vue'
import { logout } from '../services/auth.service'

const store = inject('store')
const router = useRouter()
const menu = reactive(store.getters.menu())

// declare navbar dropdown variable
const showCategoriesChildren = ref(false)
function onCategoriesToggle(value = false) {
  showCategoriesChildren.value = value
}

// declare toggle on mobile variable
const mobileToggle = ref(false)
function onMobileToggle(value = false) {
  mobileToggle.value = value
}

// logout
function onLogout() {
  logout()
  store.methods.setAuthenticated(false)
  store.methods.setUser({})
  router.push('/')
}

// state
const state = reactive({ mobileToggle, showCategoriesChildren })

</script>
