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

    <!-- Desktop menu -->
    <ul class="hidden md:flex md:mx-auto md:items-center md:w-auto md:space-x-6">
      <template v-if="store.getters.isAdmin()">
        <li class="text-gray-500 hover:text-gray-700">
          <a
            class="flex items-center h-10 leading-10 px-4 rounded text-base cursor-pointer no-underline hover:no-underline transition-colors duration-100 mx-1 hover:bg-gray-100"
            :class="{ 'border-b-2 border-blue-500 text-gray-800': route.name === 'admin' }"
            v-click-outside="onToggleAdmin"
            @click="onToggleAdmin(!toggleAdmin)"
          >
            <span>Quản lý</span>
            <span class="ml-2">
              <DropdownIcon />
            </span>
          </a>
          <div
            class="flex shadow-md rounded border border-gray-300 text-sm absolute z-30 mt-4"
            v-show="toggleAdmin"
          >
            <span
              class="absolute top-0 left-0 w-3 h-3 bg-white border transform rotate-45 -mt-1 ml-6"
            ></span>

            <!-- Admin nav -->
            <div class="flex-none bg-white rounded w-72 relative z-10 py-1">
              <ul class="list-reset">
                <li class="relative">
                  <router-link
                    to="/admin/teachers"
                    class="px-4 py-2 flex w-full items-start hover:bg-gray-100 no-underline hover:no-underline transition-colors duration-100 cursor-pointer"
                  >
                    <span class="flex-1">Quản lý giáo viên</span>
                  </router-link>
                </li>
                <li class="relative">
                  <router-link
                    to="/admin/students"
                    class="px-4 py-2 flex w-full items-start hover:bg-gray-100 no-underline hover:no-underline transition-colors duration-100 cursor-pointer"
                  >
                    <span class="flex-1">Quản lý học viên</span>
                  </router-link>
                </li>
                <li class="relative">
                  <router-link
                    to="/admin/categories"
                    class="px-4 py-2 flex w-full items-start hover:bg-gray-100 no-underline hover:no-underline transition-colors duration-100 cursor-pointer"
                  >
                    <span class="flex-1">Quản lý lĩnh vực</span>
                  </router-link>
                </li>
                <li class="relative">
                  <router-link
                    to="/admin/courses"
                    class="px-4 py-2 flex w-full items-start hover:bg-gray-100 no-underline hover:no-underline transition-colors duration-100 cursor-pointer"
                  >
                    <span class="flex-1">Quản lý khóa học</span>
                  </router-link>
                </li>
              </ul>
            </div>
          </div>
        </li>
      </template>

      <template v-if="store.getters.isTeacher()">
        <li class="text-gray-500 hover:text-gray-700">
          <router-link
            to="/teacher/owncourses"
            class="flex items-center h-10 leading-10 px-4 rounded text-base cursor-pointer no-underline hover:no-underline transition-colors duration-100 mx-1 hover:bg-gray-100"
            :class="{ 'border-b-2 border-blue-500 text-gray-800': route.name === 'admin' }"
          >
            <span>Quản lý khóa học</span>
          </router-link>
        </li>
      </template>

      <!-- Categories -->
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
                v-for="item in menu"
                class="relative"
                @mouseenter="item?.children ? onHoverCategories(item.id) : onHoverCategories()"
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

      <template v-if="store.getters.isStudent()">
        <!-- Joined courses -->
        <li>
          <router-link
            to="/joined"
            class="flex items-center h-10 leading-10 px-4 rounded text-base cursor-pointer text-gray-500 hover:text-gray-700 no-underline hover:no-underline transition-colors duration-100 mx-1 hover:bg-gray-100"
            :class="{ 'border-b-2 border-blue-500 text-gray-800': route.name === 'joined' }"
          >Đã tham gia</router-link>
        </li>

        <!-- Favorite courses -->
        <li class="m-0">
          <router-link
            to="/favorite"
            class="flex items-center h-10 leading-10 px-4 rounded text-base cursor-pointer text-gray-500 hover:text-gray-700 no-underline hover:no-underline transition-colors duration-100 mx-1 hover:bg-gray-100"
            :class="{ 'border-b-2 border-blue-500 text-gray-800': route.name === 'favorite' }"
          >Yêu thích</router-link>
        </li>
      </template>
    </ul>

    <ul class="hidden md:flex items-center space-x-4">
      <!-- Show if unauthenticated-->
      <template v-if="!store.state.authenticated">
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
      <template v-if="store.state.authenticated">
        <li>
          <button
            v-click-outside="onToggleProfile"
            @click="onToggleProfile(!showProfileDropdown)"
            class="flex flex-row items-center w-full px-2 py-2 mt-2 text-sm font-semibold text-left bg-transparent rounded-full md:w-auto md:mt-0 md:ml-2 hover:text-gray-900 focus:text-gray-900 hover:bg-gray-200 focus:bg-gray-200 focus:outline-none focus:shadow-outline"
          >
            <span class="w-8 h-8 rounded-full p-1">
              <Avatar :src="store.state.user?.avatar" />
            </span>
          </button>
          <div
            v-show="showProfileDropdown"
            class="absolute right-0 w-full mt-5 origin-top-right rounded-md shadow-lg md:w-48 z-10"
          >
            <div class="px-2 py-2 bg-white rounded-md shadow">
              <router-link
                to="/profile"
                class="block p-2 mt-2 bg-transparent rounded-lg text-sm font-semibold md:mt-0 hover:text-gray-900 focus:text-gray-900 hover:bg-gray-200 focus:bg-gray-200 focus:outline-none focus:shadow-outline"
              >Cập nhật thông tin</router-link>
            </div>
          </div>
          <!-- <router-link to="profile" class="px-3 py-4 text-gray-700">Profile</router-link> -->
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
import { computed, defineEmit, defineProps, inject, ref } from 'vue'
import { useRoute } from 'vue-router'
import DropdownIcon from '../components/Icons/DropdownIcon.vue'
import DroprightIcon from '../components/Icons/DroprightIcon.vue'
import LogoIcon from '../components/Icons/LogoIcon.vue'
import MenuIcon from '../components/Icons/MenuIcon.vue'
import Avatar from '../components/Avatar.vue'
import { BASE_URL } from '../utils/contants';

// store
const store = inject('store')
// route
const route = useRoute()

// props
const props = defineProps({
  menu: Array,
  showCategoriesChildren: Boolean
})

// emit events
const emit = defineEmit(['onCategoriesToggle', 'onMobileToggle', 'onLogout'])
function onCategoriesToggle(value = false) {
  emit('onCategoriesToggle', value)
}
function onMobileToggle(value) {
  emit('onMobileToggle', value)
}

// handle select profile
const showProfileDropdown = ref(false)
function onToggleProfile(value = false) {
  showProfileDropdown.value = value
}

// handle select category
const selectedCatId = ref(0)
function onHoverCategories(catId = 0) {
  selectedCatId.value = catId
}

// handle select admin
const toggleAdmin = ref(0)
function onToggleAdmin(value = false) {
  toggleAdmin.value = value
}

// logout
function onLogout() {
  emit('onLogout')
}

// computed
const selectedCat = computed(() => _.find(props.menu, ['id', selectedCatId.value]))
</script>
