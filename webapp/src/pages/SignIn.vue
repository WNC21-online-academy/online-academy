<template>
  <div class="min-h-screen bg-gray-100 flex flex-col justify-center">
    <div class="p-10 xs:p-0 mx-auto md:w-full md:max-w-md">
      <h1 class="font-bold text-center text-2xl mb-5">Đăng nhập</h1>
      <!-- Form -->
      <div class="bg-white shadow w-full rounded-lg divide-y divide-gray-200">
        <div class="px-5 py-7">
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
            @keyup.enter="onSubmitSignIn"
          />

          <!-- Error message -->
          <template v-for="item in errState">
            <p v-show="item" class="flex font-medium text-sm text-red-700 pb-2">
              <WarningIcon class="pr-1" />
              {{ item }}
            </p>
          </template>

          <button
            type="button"
            class="transition duration-200 bg-blue-500 hover:bg-blue-600 focus:bg-blue-700 focus:shadow-sm focus:ring-4 focus:ring-blue-500 focus:ring-opacity-50 text-white w-full py-2.5 rounded-lg text-sm shadow-sm hover:shadow-md font-semibold text-center inline-block"
            @click="onSubmitSignIn"
          >
            <span class="inline-block mr-2">Đăng nhập</span>
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

        <Oauth class="p-5" />
        <Helper class="py-5" />
      </div>

      <BackToHome class="py-5" />
    </div>
  </div>
</template>

<script setup>
import { inject, reactive, watch } from 'vue';
import { useRouter } from 'vue-router'
import Oauth from '../components/Auth/Oauth.vue';
import Helper from '../components/Auth/Helper.vue';
import BackToHome from '../components/BackTo.vue';
import WarningIcon from '../components/Icons/WarningIcon.vue';
import validator from '../utils/validator';
import { getUserAuth, signIn } from '../services/auth.service';

const errorTexts = {
  emptyEmail: 'Chưa điền email',
  emptyPassword: 'Chưa điền mật khẩu',
  invalidEmail: 'Email không hợp lệ'
}

const store = inject('store')
const router = useRouter()

const state = reactive({
  email: '',
  password: '',
})
const errState = reactive({
  emailErrors: '',
  passwordErrors: '',
  apiErrors: ''
})

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
  errState.passwordErrors = ''
  return true
}

async function onSubmitSignIn() {
  if (!checkEmail()) return
  if (!checkPassword()) return

  const result = await signIn({
    email: state.email,
    password: state.password
  })

  if (result?.message) {
    errState.apiErrors = result.message
  }
  else {
    errState.apiErrors = ''
  }

  if (result.authenticated) {
    store.methods.setAuthenticated(true)
    store.methods.setUser(getUserAuth())
    router.push('/')
  }
}

watch(() => state.email, checkEmail, { deep: true })
watch(() => state.password, checkPassword, { deep: true })
watch(() => state, () => errState.apiErrors = '', { deep: true })
</script>
