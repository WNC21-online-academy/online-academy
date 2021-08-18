<template>
  <div class="w-full bg-white rounded-lg px-4 pt-2">
    <div class="flex flex-wrap -mx-3 mb-6">
      <h2 class="px-4 pt-3 pb-2 text-gray-800 text-lg">Thêm nhận xét</h2>
      <Rating :score="state.score" @changeScore="onChangeScore" />
      <div class="w-full md:w-full px-3 mb-2 mt-2">
        <textarea
          v-model="state.comment"
          class="bg-gray-100 rounded border border-gray-400 leading-normal resize-none w-full h-20 py-2 px-3 font-medium placeholder-gray-700 focus:outline-none focus:bg-white"
          name="body"
          placeholder="Nhận xét..."
          required
        ></textarea>
      </div>
      <div class="w-full md:w-full flex items-start md:w-full px-3">
        <div class="flex items-start w-1/2 text-gray-700 px-2 mr-auto">
          <p v-show="message.formSuccess" class="flex text-xs md:text-sm text-green-700">
            <CheckIcon class="pr-1" />
            {{ message.formSuccess }}
          </p>
          <p v-show="message.formError" class="flex text-xs md:text-sm text-red-700">
            <WarningIcon class="pr-1" />
            {{ message.formError }}
          </p>
        </div>
        <div class="-mr-1">
          <input
            type="submit"
            class="bg-white text-gray-700 font-medium py-1 px-4 border border-gray-400 rounded-lg tracking-wide mr-1 hover:bg-gray-100 cursor-pointer"
            value="Gửi"
            @click="onSubmit"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { defineEmit, defineProps, inject, reactive, watch } from 'vue'
import WarningIcon from '../Icons/WarningIcon.vue'
import CheckIcon from '../Icons/CheckIcon.vue'
import Rating from './Rating.vue';
import { add as addRating } from '../../services/rating.service';
import { useRoute } from 'vue-router';

const route = useRoute()

// store
const store = inject('store')

// props
defineProps({
  list: Array,
  writable: Boolean
})

// state
const state = reactive({
  comment: '',
  score: 0
})

const message = reactive({
  formError: '',
  formSuccess: ''
})

// emit
const emit = defineEmit(['onAddedComment'])

// events
function onChangeScore(value) {
  state.score = value
}

async function onSubmit() {
  if (!checkForm()) return
  const id_course = route.params.id
  if (!(id_course > 0)) return
  const { comment, score } = state
  const res = await addRating({
    id_course,
    comment,
    score
  })
  if (res.message) {
    message.formError = res.message
    return
  }
  await resetState()
  message.formError = ''
  message.formSuccess = 'Đã lưu'
  await emit('onAddedComment', { ...res, name_student: store.state.user?.fullname })
}

function checkForm() {
  message.formSuccess = ''
  if (!state.comment) {
    message.formError = 'Chưa nhập nhận xét'
    return false
  }
  message.formSuccess = ''
  if (state.comment.length > 1000) {
    message.formError = 'Không được quá 1000 ký tự'
    return false
  }
  if (!state.score) {
    message.formError = 'Chưa đánh giá'
    return false
  }
  message.formError = ''
  return true
}

function resetState() {
  state.comment = ''
  state.score = 0
}

// watch
watch(() => [state.comment, state.score], checkForm, { deep: true })
</script>
