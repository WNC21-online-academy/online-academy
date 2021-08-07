<template>
  <nav class="relative px-4 py-4 flex justify-between items-center bg-white">
    <!-- Logo -->
    <router-link to="/" class="flex text-3xl text-blue-500 font-bold leading-none space-x-4">
      <LogoIcon />
      <span class="text-lg lg:text-xl">Online Academy</span>
    </router-link>

    <!-- Mobile menu button  -->
    <div class="md:hidden">
      <button class="flex items-center text-blue-600 p-3" @click="onMobileToggle(true)">
        <MenuIcon />
      </button>
    </div>

    <!-- Categories -->
    <ul class="hidden md:flex md:mx-auto md:items-center md:w-auto md:space-x-6">
      <li class="text-gray-500 hover:text-gray-700">
        <a
          class="flex items-center h-10 leading-10 px-4 rounded text-base cursor-pointer no-underline hover:no-underline transition-colors duration-100 mx-1 hover:bg-gray-100"
          :class="{ 'border-b-2 border-blue-500 text-gray-800': route.name === 'categories' }"
          v-click-outside="onCategoriesToggle"
          @click="onCategoriesToggle(!showCategoriesChildren)"
        >
          <span>Khám phá</span>
          <span class="ml-2">
            <DropdownIcon />
          </span>
        </a>
        <div
          class="flex shadow-md rounded border border-gray-300 text-sm absolute z-30 mt-4"
          v-show="showCategoriesChildren"
          @mouseleave="onHoverCategories()"
        >
          <span
            class="absolute top-0 left-0 w-3 h-3 bg-white border transform rotate-45 -mt-1 ml-6"
          ></span>

          <!-- Parent categories -->
          <div class="flex-none bg-white rounded w-72 relative z-10 py-1">
            <ul class="list-reset">
              <li
                class="relative"
                @mouseenter="item?.children ? onHoverCategories(item.id) : onHoverCategories()"
                v-for="item in menu"
              >
                <div
                  v-if="item.children?.length"
                  class="px-4 py-2 flex w-full items-start hover:bg-gray-100 no-underline hover:no-underline transition-colors duration-100 cursor-pointer"
                >
                  <span class="flex-1">{{ item.name }}</span>
                  <span class="ml-2">
                    <DroprightIcon />
                  </span>
                </div>
                <router-link
                  v-else
                  :to="`/categories/${item.id}`"
                  class="px-4 py-2 flex w-full items-start hover:bg-gray-100 no-underline hover:no-underline transition-colors duration-100 cursor-pointer"
                >
                  <span class="flex-1">{{ item.name }}</span>
                </router-link>
              </li>
            </ul>
          </div>
          <!-- Child categories -->
          <div
            v-if="selectedCatId && selectedCat.children.length > 0"
            class="flex-none bg-white rounded border border-gray-300 text-sm w-72 z-30"
          >
            <span class="absolute top-0 w-3 h-3 bg-white border transform rotate-45 -ml-1 mt-2"></span>
            <div class="bg-white rounded w-full relative z-10 py-1">
              <ul class="list-reset">
                <li v-for="child in selectedCat.children">
                  <router-link
                    :to="'/categories/' + child.id"
                    class="px-4 py-2 flex w-full items-start hover:bg-gray-100 no-underline hover:no-underline transition-colors duration-100 cursor-pointer"
                  >
                    <span class="flex-1">{{ child.name }}</span>
                  </router-link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </li>

      <!-- Favorite courses -->
      <li class="m-0">
        <router-link
          to="/favorite"
          class="flex items-center h-10 leading-10 px-4 rounded text-base cursor-pointer text-gray-500 hover:text-gray-700 no-underline hover:no-underline transition-colors duration-100 mx-1 hover:bg-gray-100"
          :class="{ 'border-b-2 border-blue-500 text-gray-800': route.name === 'favorite' }"
        >Ưa thích</router-link>
      </li>

      <!-- Joined courses -->
      <li>
        <router-link
          to="/joined"
          class="flex items-center h-10 leading-10 px-4 rounded text-base cursor-pointer text-gray-500 hover:text-gray-700 no-underline hover:no-underline transition-colors duration-100 mx-1 hover:bg-gray-100"
          :class="{ 'border-b-2 border-blue-500 text-gray-800': route.name === 'joined' }"
        >Đã tham gia</router-link>
      </li>
    </ul>

    <ul class="hidden md:flex items-center space-x-4">
      <!-- Show if unauthenticated-->
      <template v-if="!authenticated">
        <li>
          <router-link
            to="/sign-in"
            class="flex items-center h-10 leading-10 px-4 rounded text-sm cursor-pointer text-gray-600 hover:text-gray-700 no-underline hover:no-underline transition-colors duration-100 mx-1 hover:bg-gray-100 font-semibold"
            :class="{ 'border-b-2 border-blue-500 text-gray-800': route.name === 'sign-in' }"
          >Đăng nhập</router-link>
        </li>
        <li>
          <router-link
            to="/sign-up"
            class="px-3 py-2 transition duration-200 bg-blue-400 hover:bg-blue-500 focus:bg-blue-700 focus:shadow-sm focus:ring-4 focus:ring-blue-500 focus:ring-opacity-50 text-white w-full rounded text-sm shadow-sm hover:shadow-md font-semibold"
          >Đăng ký</router-link>
        </li>
      </template>
      <!-- Show if authenticated-->
      <template v-if="authenticated">
        <li>
          <router-link to="profile" class="px-3 py-4 text-gray-700">Profile</router-link>
        </li>
        <li @click="onLogout">
          <a class="px-3 py-4 text-gray-700">Đăng xuất</a>
        </li>
      </template>
    </ul>
  </nav>
</template>

<script setup>
import * as _ from 'lodash'
import { computed, defineEmit, defineProps, ref } from 'vue'
import { useRoute } from 'vue-router'
import DropdownIcon from '../components/Icons/DropdownIcon.vue'
import DroprightIcon from '../components/Icons/DroprightIcon.vue'
import LogoIcon from '../components/Icons/LogoIcon.vue'
import MenuIcon from '../components/Icons/MenuIcon.vue'
import NavMobile from './NavMobile.vue';

const props = defineProps({
  authenticated: Boolean,
  menu: Array,
  showCategoriesChildren: Boolean
})

const route = useRoute()

const emit = defineEmit(['onCategoriesToggle', 'onMobileToggle', 'onLogout'])
function onCategoriesToggle(value = false) {
  emit('onCategoriesToggle', value)
}
function onMobileToggle(value) {
  emit('onMobileToggle', value)
}

const selectedCatId = ref(0)
function onHoverCategories(catId = 0) {
  selectedCatId.value = catId
}

function onLogout() {
  emit('onLogout')
}

const selectedCat = computed(() => _.find(props.menu, ['id', selectedCatId.value]))
</script>
