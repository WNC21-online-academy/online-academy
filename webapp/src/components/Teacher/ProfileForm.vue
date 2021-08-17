<template>
  <div class="mt-1">
    <div class="md:col-span-1">
      <div class="px-4 sm:px-0">
        <h3 class="text-lg font-medium leading-6 text-gray-900">Thông tin cá nhân</h3>
      </div>
    </div>
    <div class="mt-5 shadow overflow-hidden sm:rounded-md">
      <div class="px-4 py-5 bg-white sm:p-6">
        <div class="grid grid-cols-6 gap-6">
          <div class="col-span-6 sm:col-span-3">
            <label for="fullname" class="block text-sm font-medium text-gray-700">Họ tên</label>
            <input
              v-model="state.fullname"
              type="text"
              id="fullname"
              autocomplete="given-name"
              class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
            />
          </div>

          <div class="col-span-6 sm:col-span-3">
            <label for="email" class="block text-sm font-medium text-gray-700">Email</label>
            <input
              v-model="state.email"
              type="email"
              id="email"
              autocomplete="email"
              class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
            />
          </div>

          <div class="col-span-6">
            <label class="block text-sm font-medium text-gray-700">Ảnh đại diện</label>
            <div class="mt-2 flex items-center">
              <span class="inline-block h-12 w-12 rounded-full overflow-hidden bg-gray-100">
                <Avatar :src="avatar" />
              </span>
              <label
                class="w-auto flex items-center ml-8 px-4 bg-white text-gray-900 rounded-sm shadow-sm tracking-wide border border-blue cursor-pointer hover:text-gray-700"
              >
                <svg
                  class="w-8 h-6"
                  fill="currentColor"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                >
                  <path
                    d="M16.88 9.1A4 4 0 0 1 16 17H5a5 5 0 0 1-1-9.9V7a3 3 0 0 1 4.52-2.59A4.98 4.98 0 0 1 17 8c0 .38-.04.74-.12 1.1zM11 11h3l-4-4-4 4h3v3h2v-3z"
                  />
                </svg>
                <span class="pl-2 text-sm">Tải lên</span>
                <input type="file" accept="image/*" class="hidden" @change="onChangeFile" />
              </label>
            </div>
          </div>
        </div>
        <p v-show="state.profileError" class="flex font-medium text-sm text-red-700 pt-4">
          <WarningIcon class="pr-1" />
          {{ state.profileError }}
        </p>
        <p v-show="state.profileSuccess" class="flex font-medium text-sm text-green-600 pt-4">
          <CheckIcon class="pr-1" />
          {{ state.profileSuccess }}
        </p>
      </div>
      <div class="px-4 py-3 bg-gray-50 text-right sm:px-6">
        <button
          type="button"
          class="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          @click="onSubmitUpdateProfile"
        >Lưu</button>
      </div>
    </div>
  </div>

  <div class="mt-10">
    <div class="md:col-span-1">
      <div class="px-4 sm:px-0">
        <h3 class="text-lg font-medium leading-6 text-gray-900">Đổi mật khẩu</h3>
      </div>
    </div>
    <div class="mt-5 md:col-span-2">
      <div class="shadow overflow-hidden sm:rounded-md">
        <div class="px-4 py-5 bg-white sm:p-6">
          <div class="grid grid-cols-6 gap-6">
            <div class="col-span-6 sm:col-span-3">
              <label for="password" class="block text-sm font-medium text-gray-700">Mật khẩu cũ</label>
              <input
                v-model="state.oldPassword"
                type="password"
                id="password"
                autocomplete="given-name"
                class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
              />
            </div>

            <div class="col-span-6 sm:col-span-3">
              <label
                for="confirmPassword"
                class="block text-sm font-medium text-gray-700"
              >Mật khẩu mới</label>
              <input
                v-model="state.newPassword"
                type="password"
                id="confirmPassword"
                autocomplete="email"
                class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
              />
            </div>
          </div>
          <p v-show="state.pwError" class="flex font-medium text-sm text-red-700 pt-4">
            <WarningIcon class="pr-1" />
            {{ state.pwError }}
          </p>
          <p v-show="state.pwSuccess" class="flex font-medium text-sm text-green-600 pt-4">
            <CheckIcon class="pr-1" />
            {{ state.pwSuccess }}
          </p>
        </div>
        <div class="px-4 py-3 bg-gray-50 text-right sm:px-6">
          <button
            type="button"
            class="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            @click="onSubmitUpdatePw"
          >Lưu</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, inject, onMounted, reactive, watch } from "vue";
import { changePassword, fetchById, updateProfile } from '../../services/user.service';
import WarningIcon from '../Icons/WarningIcon.vue';
import CheckIcon from '../Icons/CheckIcon.vue';
import Avatar from '../Avatar.vue';
import { useUploadFile } from '../../composables/useUploadFile';
import { BASE_URL } from '../../utils/contants';

// store
const store = inject('store')

// hook
const { fileData, fileUrl, onChangeFile } = useUploadFile()

// state
const state = reactive({
  fullname: '',
  email: '',
  avatar: '',
  oldPassword: '',
  newPassword: '',
  pwError: '',
  profileError: '',
  pwSuccess: '',
  profileSuccess: ''
})

const avatar = computed(() => fileUrl.value || (state.avatar ? BASE_URL + state.avatar : null))

// mounted
onMounted(async () => {
  const user = await fetchById({ id: store.state.user?.id })
  state.fullname = user.fullname
  state.email = user.email
  state.avatar = user.avatar
})

// events
async function onSubmitUpdateProfile() {
  if (!checkProfile()) return
  const res = await updateProfile({
    fullname: state.fullname,
    email: state.email,
    avatar: fileData.value
  })
  if (res.message) {
    state.profileError = res.message
    return
  }
  state.profileSuccess = 'Đã lưu'
}

async function onSubmitUpdatePw() {
  if (!checkPassword(state.oldPassword)) return
  if (!checkPassword(state.newPassword)) return
  const res = await changePassword({ oldPw: state.oldPassword, newPw: state.newPassword })
  if (res.message) {
    state.pwError = res.message
    return
  }
  state.pwSuccess = 'Đã lưu'
}

function checkPassword(pw) {
  state.pwSuccess = ''
  if (!pw) {
    state.pwError = 'Mật khẩu không hợp lệ'
    return false
  }
  state.pwError = ''
  return true
}
function checkProfile(pw) {
  state.profileSuccess = ''
  if (!state.fullname || !state.email) {
    state.profileError = 'Không được để trống'
    return false
  }
  state.profileError = ''
  return true
}

// watch
watch(() => [state.oldPassword, state.newPassword], checkPassword, { deep: true })
watch(() => [state.fullname, state.email], checkProfile, { deep: true })
</script>
