<template>
  <header>
    <NavBar
      :authenticated="store.state.authenticated"
      :menu="menu"
      :showCategoriesChildren="showCategoriesChildren"
      @onCategoriesToggle="onCategoriesToggle"
      @onMobileToggle="onMobileToggle"
      @onLogout="onLogout"
    />
    <NavMobile
      v-show="mobileToggle"
      :authenticated="store.state.authenticated"
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

const showCategoriesChildren = ref(false)
function onCategoriesToggle(value = false) {
  showCategoriesChildren.value = value
}
const mobileToggle = ref(false)
function onMobileToggle(value = false) {
  mobileToggle.value = value
}

function onLogout() {
  logout()
  store.methods.setAuthenticated(false)
  store.methods.setUser({})
  router.push('/')
}

const state = reactive({ mobileToggle, showCategoriesChildren })

</script>
