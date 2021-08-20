<template>
  <section class="text-gray-700 body-font overflow-hidden">
    <div class="container px-5 py-20 mx-auto">
      <div class="lg:w-4/5 mx-auto flex flex-wrap">
        <img
          alt="ecommerce"
          class="lg:w-1/2 w-full lg:h-auto h-64 object-cover object-center rounded"
          :src="data.thumbnail"
          @error="$event.target.src = defaultImageSrc"
        />
        <div class="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">
          <h2 class="text-sm text-gray-500 tracking-widest">KHÓA HỌC</h2>
          <h1 class="text-3xl font-medium mb-1 text-green-600">{{ data.name }}</h1>
          <div class="flex mb-4">
            <span class="flex items-center">
              <StarIcon
                v-for="value in RATING_MAX_SCORE"
                class="w-4 h-4 text-yellow-600"
                :fill="value > data.rating ? 'none' : 'currentColor'"
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </span>
            <span class="flex ml-3 pl-3 py-2 border-l-2 border-gray-500 text-gray-500 space-x-2">
              <span class="ml-3">{{ comments.length }} Đánh giá</span>
            </span>
          </div>
          <p class="h-24 line-clamp-3 leading-relaxed bg-light-50">{{ data.description }}</p>
          <div class="flex flex-col sm:flex-row space-y-4 sm:space-y-0">
            <span class="font-medium text-2xl text-gray-700">{{ toCurrency(data.tutition) }}</span>
            <div class="flex space-x-4 mr-auto sm:mr-0 sm:ml-auto">
              <div v-if="data.is_joined" class="m-auto">Đã tham gia</div>
              <button
                v-else
                class="flex text-white bg-green-600 border-0 py-2 px-6 rounded-full focus:outline-none hover:bg-green-500 rounded"
                @click="onToggleModalJoin(true)"
              >Đăng ký</button>
              <button
                class="rounded-full w-10 h-10 bg-gray-300 p-0 border-0 inline-flex items-center justify-center focus:outline-none hover:opacity-80"
                :class="{
                  'bg-indigo-500 text-white': data.in_watchlist,
                  'text-gray-500 hover:text-indigo-600': !data.in_watchlist
                }"
                @click="onClickAddOrRemoveWatchlist"
              >
                <svg
                  fill="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  class="w-5 h-5"
                  viewBox="0 0 24 24"
                >
                  <path
                    d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"
                  />
                </svg>
              </button>

              <p v-show="state.errorMessage" class="flex font-medium text-sm text-red-700 m-auto">
                <WarningIcon class="pr-1" />
                {{ state.errorMessage }}
              </p>
            </div>
          </div>
        </div>
      </div>
      <div class="lg:w-4/5 mx-auto mt-4 sm:mt-12">
        <h6 class="text-xl font-medium">Nội dung khóa học</h6>
        <div class="my-4 text-justify" v-html="data.content"></div>
      </div>
      <div class="lg:w-4/5 mx-auto mt-4 sm:mt-12">
        <h6 class="text-xl font-medium">Danh sách bài giảng</h6>
        <div v-if="data.is_joined">
          <LessonList :list="lessons" />
        </div>
        <div class="p-4">Chưa tham gia khóa học, không thể xem bài giảng</div>
      </div>
      <div class="lg:w-4/5 mx-auto mt-4 sm:mt-8 space-y-4">
        <h6 class="text-xl font-medium">Phản hồi</h6>
        <CommentBox :writable="data.is_joined" @onAddedComment="onAddedComment" class="mt-4 py-1" />
        <CommentList :list="comments" />
      </div>
    </div>
  </section>

  <ConfirmJoinModal
    :showModal="state.showModalJoin"
    :item="data"
    @toggleModal="onToggleModalJoin"
    @onJoined="onJoined"
  />
</template>

<script setup>
import { defineProps, reactive, ref } from "vue"
import defaultImageSrc from '../../assets/images/placeholder.png'
import WarningIcon from '../Icons/WarningIcon.vue'
import StarIcon from '../Icons/StarIcon.vue'
import ConfirmJoinModal from "./ConfirmJoinModal.vue"
import LessonList from "./LessonList.vue"
import CommentBox from "../Comment/CommentBox.vue"
import CommentList from '../Comment/CommentList.vue'
import { toCurrency } from "../../utils/formator"
import { addWatchlist, joinCourse, removeWatchlist } from "../../services/courses.service"
import { RATING_MAX_SCORE } from '../../utils/contants'


// props
const props = defineProps({
  data: Object,
  lessons: Array,
  comments: Array
})

// state
const state = reactive({
  showModalJoin: false,
  errorMessage: ''
})

// emit events
const emit = defineEmit(['loadData', 'onAddedComment'])

// events
function onToggleModalJoin(value = false) {
  state.showModalJoin = value
}

function onJoined(id) {
  if (id > 0) {
    emit('loadData', id)
  }
}

async function onClickAddOrRemoveWatchlist() {
  state.errorMessage = ''
  const { id, in_watchlist } = props.data
  if (id > 0) {
    let res
    if (!in_watchlist) {
      res = await addWatchlist({ id })
    }
    else {
      res = await removeWatchlist({ id })
    }

    if (res.message) {
      state.errorMessage = res.message
      return
    }
    if (res.id_user && res.id_course) {
      props.data.in_watchlist = !in_watchlist
    }
  }
}

function onAddedComment() {
  emit('onAddedComment', ...arguments)
}
</script>
