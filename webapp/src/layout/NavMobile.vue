<template>
  <div class="relative z-50">
    <div class="fixed inset-0 bg-gray-800 opacity-25" @click="closeMobileMenu()"></div>
    <nav
      class="fixed top-0 left-0 bottom-0 flex flex-col w-5/6 max-w-sm py-6 px-6 bg-white border-r overflow-y-auto"
    >
      <div class="flex items-center mb-8">
        <router-link to="/" class="mr-auto text-3xl font-bold leading-none">
          <LogoIcon />
        </router-link>
        <button class="navbar-close" @click="closeMobileMenu">
          <CloseIcon />
        </button>
      </div>
      <div>
        <ul>
          <li class="mb-1">
            <router-link
              to="/profile"
              class="block p-4 text-sm font-semibold text-gray-400 hover:bg-blue-50 hover:text-blue-600 rounded"
            >Cá nhân</router-link>
          </li>
          <li class="mb-1">
            <router-link
              to="/favorite"
              class="block p-4 text-sm font-semibold text-gray-400 hover:bg-blue-50 hover:text-blue-600 rounded"
            >Yêu thích</router-link>
          </li>
          <li class="mb-1">
            <router-link
              to="/joined"
              class="block p-4 text-sm font-semibold text-gray-400 hover:bg-blue-50 hover:text-blue-600 rounded"
            >Đã tham gia</router-link>
          </li>
          <li class="mb-1">
            <router-link
              to="/categories"
              class="block p-4 text-sm font-semibold text-gray-400 hover:bg-blue-50 hover:text-blue-600 rounded"
            >Lĩnh vực</router-link>
          </li>
          <li class="mb-1">
            <router-link
              to="/search"
              class="block p-4 text-sm font-semibold text-gray-400 hover:bg-blue-50 hover:text-blue-600 rounded"
            >Tìm kiếm</router-link>
          </li>
        </ul>
      </div>
      <div class="mt-auto">
        <div v-show="!authenticated" class="pt-6">
          <router-link
            to="/sign-in"
            class="block px-4 py-3 mb-3 leading-loose text-xs text-center font-semibold leading-none bg-gray-50 hover:bg-gray-100 rounded-xl"
          >Đăng nhập</router-link>
          <router-link
            to="/sign-up"
            class="block px-4 py-3 mb-2 leading-loose text-xs text-center text-white font-semibold bg-blue-600 hover:bg-blue-700 rounded-xl"
          >Đăng ký</router-link>
        </div>
        <div v-show="authenticated" class="pt-6">
          <router-link
            to="/profile"
            class="block px-4 py-3 mb-2 leading-loose text-xs text-center text-white font-semibold bg-blue-600 hover:bg-blue-700 rounded-xl"
          >Cập nhập thông tin</router-link>
          <a
            @click="onLogout"
            class="block px-4 py-3 mb-3 leading-loose text-xs text-center font-semibold leading-none bg-gray-50 hover:bg-gray-100 rounded-xl"
          >Đăng xuất</a>
        </div>
        <p class="my-4 text-xs text-center text-gray-400">
          <span>Copyright © 2021</span>
        </p>
      </div>
    </nav>
  </div>
</template>

<script setup>
import { defineEmit } from 'vue'
import CloseIcon from '../components/Icons/CloseIcon.vue'
import LogoIcon from '../components/Icons/LogoIcon.vue'

defineProps({
  authenticated: Boolean,
  menu: Array,
})
const emit = defineEmit(['onMobileToggle', 'onLogout'])

function closeMobileMenu() {
  emit('onMobileToggle', false)
}

function onLogout() {
  emit('onLogout')
}

</script>
