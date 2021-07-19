<template>
  <nav class="relative px-4 py-4 flex justify-between items-center bg-white">
    <!-- Logo -->
    <router-link to="/" class="text-3xl font-bold leading-none">
      <LogoIcon />
    </router-link>

    <!-- Mobile menu button  -->
    <div class="md:hidden">
      <button class="flex items-center text-blue-600 p-3" @click="onMobileToggle(true)">
        <MenuIcon />
      </button>
    </div>

    <!-- Categories -->
    <ul
      class="hidden absolute top-1/2 left-1/2 transform -translate-y-1/2 -translate-x-1/2 md:flex md:mx-auto md:items-center md:w-auto md:space-x-6"
    >
      <li>
        <a
          class="flex items-center h-10 leading-10 px-4 rounded cursor-pointer no-underline hover:no-underline transition-colors duration-100 mx-1 hover:bg-gray-100"
          @click.prevent="showCategoriesChildren = !showCategoriesChildren"
        >
          <span>Khám phá</span>
          <span class="ml-2">
            <DropdownIcon />
          </span>
        </a>
        <div
          class="flex shadow-md rounded border border-gray-300 text-sm absolute z-30 mt-2"
          v-show="showCategoriesChildren"
          @mouseleave="onHoverCategories()"
        >
          <span
            class="absolute top-0 left-0 w-3 h-3 bg-white border transform rotate-45 -mt-1 ml-6"
          ></span>

          <!-- Parent categories -->
          <div class="flex-none bg-white rounded w-56 relative z-10 py-1">
            <ul class="list-reset">
              <li
                class="relative"
                @mouseenter="item?.children ? onHoverCategories(item.id) : onHoverCategories()"
                v-for="item in menu"
              >
                <router-link
                  :to="item.children ? '' : `/categories/${item.id}`"
                  class="px-4 py-2 flex w-full items-start hover:bg-gray-100 no-underline hover:no-underline transition-colors duration-100 cursor-pointer"
                >
                  <span class="flex-1">{{ item.name }}</span>
                  <span v-if="item.children?.length" class="ml-2">
                    <DroprightIcon />
                  </span>
                </router-link>
              </li>

              <li class="relative">
                <a
                  href="#"
                  class="px-4 py-2 flex w-full items-start hover:bg-gray-100 no-underline hover:no-underline transition-colors duration-100 cursor-pointer"
                >
                  <span class="flex-1">Icons</span>
                </a>
              </li>
            </ul>
          </div>
          <!-- Child categories -->
          <div
            v-if="selectedCatId && selectedCat.children.length > 0"
            class="flex-none bg-white rounded border border-gray-300 text-sm w-56 z-30"
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
      <li>
        <router-link
          to="/favorite"
          class="border-b-2 border-blue-500 text-gray-800 font-medium"
        >Ưa thích</router-link>
      </li>

      <!-- Joined courses -->
      <li>
        <router-link to="/joined" class="text-sm text-gray-400 hover:text-gray-500">Đã tham gia</router-link>
      </li>
    </ul>

    <ul class="hidden md:flex items-center space-x-4">
      <!-- Show if unauthenticated-->
      <template v-if="true">
        <li>
          <router-link to="/signin" class="px-3 py-4 text-gray-700">Đăng nhập</router-link>
        </li>
        <li>
          <router-link to="signup" class="px-3 py-1 text-gray-700 bg-yellow-400 rounded">Đăng ký</router-link>
        </li>
      </template>
      <!-- Show if authenticated-->
      <template v-if="false">
        <li>
          <router-link to="profile" class="px-3 py-4 text-gray-700">Profile</router-link>
        </li>
        <li>
          <router-link to="profile" class="px-3 py-4 text-gray-700">Đăng xuất</router-link>
        </li>
      </template>
    </ul>
  </nav>
</template>

<script setup>
import _ from 'lodash'
import { computed, defineEmit, defineProps, ref } from 'vue'
import DropdownIcon from '../components/Icons/DropdownIcon.vue'
import DroprightIcon from '../components/Icons/DroprightIcon.vue'
import LogoIcon from '../components/Icons/LogoIcon.vue'
import MenuIcon from '../components/Icons/MenuIcon.vue'
import NavMobile from './NavMobile.vue';

const props = defineProps({
  menu: Array,
  showCategoriesChildren: Boolean
})

const emit = defineEmit(['onMobileToggle'])
function onMobileToggle(value) {
  emit('onMobileToggle', value)
}

const selectedCatId = ref(0)
function onHoverCategories(catId = 0) {
  selectedCatId.value = catId
}

const selectedCat = computed(() => _.find(props.menu, ['id', selectedCatId.value]))
</script>
