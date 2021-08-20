<template>
  <!-- Modal Background -->
  <div
    v-show="showModal"
    class="fixed text-gray-500 flex items-center justify-center overflow-auto z-50 bg-black bg-opacity-40 left-0 right-0 top-0 bottom-0"
  >
    <!-- Modal -->
    <div v-show="showModal" class="bg-white rounded-xl shadow-2xl p-6 sm:w-10/12 mx-10">
      <!-- Title -->
      <span class="relative font-bold block text-2xl mb-3">
        Thông tin người dùng
        <a
          class="absolute top-0 right-0 text-2xl font-bold hover:text-gray-700"
          @click="onToggleModal(false)"
        >&times;</a>
      </span>
      <!-- Form -->
      <div class="px-5 py-7">
        <label
          v-show="formData.id"
          class="font-semibold text-sm text-gray-600 pb-1 block"
        >Mã người dùng</label>
        <input
          v-show="formData.id"
          v-model="formData.id"
          type="text"
          class="border rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full"
          disabled
        />
        <label class="font-semibold text-sm text-gray-600 pb-1 block">Vai trò</label>
        <SelectBox
          class="flex-grow mt-1 mb-5"
          :list="roles"
          :selectedItem="{ id: props.formData.role, name: formData.name_role }"
          defaultTitle="Không"
          disabled
          @onSelect="onSelectRole"
        />
        <!-- disabled -->
        <label class="font-semibold text-sm text-gray-600 pb-1 block">Họ tên</label>
        <input
          v-model="formData.fullname"
          type="text"
          class="border rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full"
          label
          :disabled="!writable"
        />
        <label class="font-semibold text-sm text-gray-600 pb-1 block">Email</label>
        <input
          v-model="formData.email"
          type="email"
          class="border rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full"
          label
          :disabled="!writable"
        />
        <label
          v-show="!formData.id"
          class="font-semibold text-sm text-gray-600 pb-1 block"
        >Mật khẩu mặc định</label>
        <input
          v-show="!formData.id"
          v-model="formData.password"
          type="password"
          class="border rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full"
          label
          :disabled="!writable"
        />
        <label class="font-semibold text-sm text-gray-600 pb-1 block">Khóa tài khoản</label>
        <input
          v-model="formData.lock"
          type="checkbox"
          class="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded"
        />

        <template v-for="item in errState">
          <p v-show="item" class="flex font-medium text-sm text-red-700 pb-2">
            <WarningIcon class="pr-1" />
            {{ item }}
          </p>
        </template>
        <p v-show="messageSuccess" class="flex font-medium text-sm text-green-600 py-4">
          <CheckIcon class="pr-1" />
          {{ messageSuccess }}
        </p>
      </div>
      <!-- Buttons -->
      <div class="text-right space-x-5 mt-5">
        <button
          class="px-4 py-2 text-sm bg-white rounded-xl border transition-colors duration-150 ease-linear border-gray-200 text-gray-500 focus:outline-none focus:ring-0 font-bold hover:bg-gray-100 focus:bg-indigo-50 focus:text-indigo"
          @click="onToggleModal(false)"
        >Đóng</button>
        <a
          target="_blank"
          class="px-4 py-2 text-sm text-white bg-blue-500 border-blue-500 rounded-xl border transition-colors duration-150 ease-linear border-gray-200 focus:outline-none focus:ring-0 font-bold hover:bg-blue-600 focus:text-indigo"
          :disabled="!writable"
          @click="onSubmit"
        >Lưu</a>
      </div>
    </div>
  </div>
</template>

<script setup>
import { defineEmit, defineProps, inject, onMounted, reactive, ref, watch } from "vue"
import WarningIcon from '../../../Icons/WarningIcon.vue'
import CheckIcon from '../../../Icons/CheckIcon.vue';
import SelectBox from '../../../SearchBox/SelectBox.vue'
import { addOrUpdate } from '../../../../services/user.service'
import validator from '../../../../utils/validator'

const store = inject('store')

// constant
const roles = [{
  id: 'administrator',
  name: 'Quản lý'
},
{
  id: 'teacher',
  name: 'Giáo viên'
},
{
  id: 'student',
  name: 'Học viên'
}]

const errorTexts = {
  emptyRole: 'Chưa chọn vai trò',
  emptyFullname: 'Họ tên không được để trống',
  emptyEmail: 'Email không được để trống',
  invalidEmail: 'Email không hợp lệ',
  emptyPassword: 'Chưa điền mật khẩu',
  tooShortPassword: 'Mật khẩu phải ít nhất 8 ký tự',
  tooLongPassword: 'Mật khẩu không vượt quá 100 ký tự'
}

// props
const props = defineProps({
  showModal: Boolean,
  formData: Object,
  writable: Boolean,
  defaultRole: Object
})

// state
const errState = reactive({
  roleErrors: '',
  emailErrors: '',
  fullnameErrors: '',
  passwordErrors: '',
  apiErrors: ''
})

// error messages
const messageSuccess = ref()

// onMounted
onMounted(() => {
  if (!props.formData.role) {
    props.formData.role = props.defaultRole.id
    props.formData.name_role = props.defaultRole.name
  }
})

// Handle select parent
function onSelectRole(payload) {
  props.formData.role = payload?.id
  props.formData.name_role = payload?.name
}

// emit events
const emit = defineEmit(['toggleModal', 'onAdded', 'onUpdated'])
function onToggleModal(value) {
  emit('toggleModal', value)
}

// validate form
function checkRole() {
  if (!props.formData.role) {
    errState.roleErrors = errorTexts.emptyRole
    return false
  }
  errState.roleErrors = ''
  return true
}
function checkFullname() {
  if (!props.formData.fullname) {
    errState.fullnameErrors = errorTexts.emptyFullname
    return false
  }
  errState.fullnameErrors = ''
  return true
}
function checkEmail() {
  if (!props.formData.email) {
    errState.emailErrors = errorTexts.emptyEmail
    return false
  }
  if (!validator.validateEmail(props.formData.email)) {
    errState.emailErrors = errorTexts.invalidEmail
    return false
  }
  errState.emailErrors = ''
  return true
}
function checkPassword() {
  if (!props.formData.id) {
    if (!props.formData.password) {
      errState.passwordErrors = errorTexts.emptyPassword
      return false
    }
    if (props.formData.password.length < 8) {
      errState.passwordErrors = errorTexts.tooShortPassword
      return false
    }
    if (props.formData.password.length > 100) {
      errState.passwordErrors = errorTexts.tooLongPassword
      return false
    }
  }
  errState.passwordErrors = ''
  return true
}

// event submit form
async function onSubmit() {
  if (!checkRole()) return
  if (!checkFullname()) return
  if (!checkEmail()) return
  if (!checkPassword()) return

  const result = await addOrUpdate(props.formData)
  if (result?.message) {
    errState.apiErrors = result.message
  }
  else {
    await emit(props.formData.id ? 'onUpdated' : 'onAdded', result)
    messageSuccess.value = 'Đã lưu'
  }
}

// watch 
watch(props.formData, () => {
  messageSuccess.value = ''
})
watch(() => props.formData.role, checkRole, { deep: true })
watch(() => props.formData.fullname, checkFullname, { deep: true })
watch(() => props.formData.email, checkEmail, { deep: true })
watch(() => props.formData.password, checkPassword, { deep: true })
watch(() => props.formData, () => errState.apiErrors = '', { deep: true })
</script>
