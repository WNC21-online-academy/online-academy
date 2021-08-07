<template>
  <div class="min-h-screen bg-gray-100 flex flex-col justify-center">
    <div class="p-10 xs:p-0 mx-auto md:w-full md:max-w-md">
      <h1
        v-show="!state.signUpSuccess"
        class="font-bold text-center text-2xl mb-5"
      >Đăng ký tài khoản</h1>
      <h1
        v-show="state.signUpSuccess"
        class="font-bold text-center text-2xl mb-5"
      >Đăng ký thành công</h1>
      <!-- Form -->
      <div class="bg-white shadow w-full rounded-lg divide-y divide-gray-200">
        <div class="px-5 py-7">
          <div v-show="!state.signUpSuccess">
            <label class="font-semibold text-sm text-gray-600 pb-1 block">Họ tên</label>
            <input
              v-model="state.fullname"
              type="text"
              class="border rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full"
            />
            <label class="font-semibold text-sm text-gray-600 pb-1 block">E-mail</label>
            <input
              v-model="state.email"
              type="email"
              class="border rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full"
            />
            <label class="font-semibold text-sm text-gray-600 pb-1 block">Mật khẩu</label>
            <input
              v-model="state.password"
              type="password"
              class="border rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full"
            />
            <label class="font-semibold text-sm text-gray-600 pb-1 block">Nhập lại mật khẩu</label>
            <input
              v-model="state.confirmPassword"
              type="password"
              class="border rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full"
              @keyup.enter="onSubmitSignUp"
            />

            <!-- Error message -->
            <template v-for="item in errState">
              <p v-show="item" class="flex font-medium text-sm text-red-700 pb-2">
                <WarningIcon class="pr-1" />
                {{ item }}
              </p>
            </template>

            <!-- Button submit -->
            <button
              type="button"
              class="transition duration-200 bg-blue-500 hover:bg-blue-600 focus:bg-blue-700 focus:shadow-sm focus:ring-4 focus:ring-blue-500 focus:ring-opacity-50 text-white w-full py-2.5 rounded-lg text-sm shadow-sm hover:shadow-md font-semibold text-center inline-block"
              @click="onSubmitSignUp"
            >
              <span class="inline-block mr-2">Tạo tài khoản</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                class="w-4 h-4 inline-block"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M17 8l4 4m0 0l-4 4m4-4H3"
                />
              </svg>
            </button>
          </div>

          <!-- Button sign in on sign up success -->
          <div v-show="state.signUpSuccess">
            <router-link
              to="/sign-in"
              class="transition duration-200 bg-blue-500 hover:bg-blue-600 focus:bg-blue-700 focus:shadow-sm focus:ring-4 focus:ring-blue-500 focus:ring-opacity-50 text-white w-full py-2.5 rounded-lg text-sm shadow-sm hover:shadow-md font-semibold text-center inline-block"
            >
              <span class="inline-block mr-2">Đăng nhập ngay</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                class="w-4 h-4 inline-block"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M17 8l4 4m0 0l-4 4m4-4H3"
                />
              </svg>
            </router-link>
          </div>
        </div>

        <Oauth class="p-5" />
        <Helper class="py-5" />
      </div>

      <BackToHome class="py-5" />
    </div>
  </div>
</template>

<script setup>
import { reactive, watch } from 'vue';
import Oauth from '../components/Auth/Oauth.vue';
import Helper from '../components/Auth/Helper.vue';
import BackToHome from '../components/BackToHome.vue';
import WarningIcon from '../components/Icons/WarningIcon.vue';
import { signUp } from '../services/auth.service';
import validator from '../utils/validator';

const errorTexts = {
  emptyFullname: 'Họ tên không được để trống',
  emptyEmail: 'Email không được để trống',
  invalidEmail: 'Email không hợp lệ',
  emptyPassword: 'Chưa điền mật khẩu',
  tooShortPassword: 'Mật khẩu phải ít nhất 8 ký tự',
  tooLongPassword: 'Mật khẩu không được vượt quá 8 ký tự',
  emptyConfirmPassword: 'Chưa xác nhận mật khẩu',
  invalidConfirmPassword: 'Mật khẩu không khớp'
}

const state = reactive({
  signUpSuccess: false,
  email: '',
  fullname: '',
  password: '',
  confirmPassword: ''
})
const errState = reactive({
  emailErrors: '',
  fullnameErrors: '',
  passwordErrors: '',
  confirmPasswordErrors: '',
  apiErrors: ''
})

function checkFullname() {
  if (!state.fullname) {
    errState.fullnameErrors = errorTexts.emptyFullname
    return false
  }
  errState.fullnameErrors = ''
  return true
}
function checkEmail() {
  if (!state.email) {
    errState.emailErrors = errorTexts.emptyEmail
    return false
  }
  if (!validator.validateEmail(state.email)) {
    errState.emailErrors = errorTexts.invalidEmail
    return false
  }
  errState.emailErrors = ''
  return true
}
function checkPassword() {
  if (!state.password) {
    errState.passwordErrors = errorTexts.emptyPassword
    return false
  }
  if (state.password.length < 8) {
    errState.passwordErrors = errorTexts.tooShortPassword
    return false
  }
  if (state.password.length > 100) {
    errState.passwordErrors = errorTexts.tooLongPassword
    return false
  }
  errState.passwordErrors = ''
  return true
}
function checkConfirmPassword() {
  if (state.password !== state.confirmPassword) {
    errState.confirmPasswordErrors = errorTexts.invalidConfirmPassword
    return false
  }
  errState.confirmPasswordErrors = ''
  return true
}

function onSubmitSignUp() {
  if (!checkFullname()) return
  if (!checkEmail()) return
  if (!checkPassword()) return
  if (!checkConfirmPassword()) return

  const {
    email,
    fullname,
    password
  } = state

  const result = signUp({
    email,
    fullname,
    password
  })

  if (result?.message) {
    errState.apiErrors = result.message
  }
  else {
    errState.apiErrors = ''
    state.signUpSuccess = true
  }
}


watch(() => state.fullname, checkFullname, { deep: true })
watch(() => state.email, checkEmail, { deep: true })
watch(() => state.password, checkPassword, { deep: true })
watch(() => state.confirmPassword, checkConfirmPassword, { deep: true })
</script>
