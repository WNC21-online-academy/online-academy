<template>
  <div class="bg-white w-full shadow px-5 py-8 flex flex-col space-y-4">
    <div v-if="list.length" v-for="item in list" class="flex items-center space-x-4">
      <div class="flex flex-shrink-0 self-start cursor-pointer">
        <img
          :src="item.avatar || defaultAvatarSrc"
          :alt="item.avatar || defaultAvatarSrc"
          @error="$event.target.src = defaultAvatarSrc"
          class="h-8 w-8 object-cover rounded-full"
        />
      </div>

      <div class="w-full">
        <div class="bg-gray-100 w-auto rounded-xl px-4 pb-4 pt-2">
          <div class="flex justify-between font-medium">
            <a class="hover:underline text-lg">{{ item.name_student }}</a>
            <div v-show="item.score > 0" class="flex">
              {{ item.score }}
              <StarIcon class="h-4 w-4 text-yellow-500" />
            </div>
          </div>
          <div class="text-sm">{{ item.comment }}</div>
        </div>
        <div class="flex justify-start items-center text-md py-1 w-full">
          <div class="font-semibold text-gray-700 flex items-center justify-center space-x-1">
            <!-- <a href="#" class="hover:underline">
              <small>Like</small>
            </a>
            <small class="self-center">.</small>
            <a href="#" class="hover:underline">
              <small>Reply</small>
            </a>
            <small class="self-center">.</small>-->
            <a class="hover:underline">
              <small>{{ toDatetime(item.updated_at) }}</small>
            </a>
          </div>
        </div>
      </div>

      <div
        class="self-stretch flex justify-center items-center transform transition-opacity duration-200 opacity-0 translate -translate-y-2 hover:opacity-100"
      >
        <a href="#" class>
          <div
            class="text-xs cursor-pointer flex h-6 w-6 transform transition-colors duration-200 hover:bg-gray-100 rounded-full items-center justify-center"
          >
            <svg
              class="w-4 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z"
              />
            </svg>
          </div>
        </a>
      </div>
    </div>

    <div v-if="!list.length">Chưa có bình luận</div>
    <!-- New Comment Paste Here -->
  </div>
</template>

<script setup>
import { defineProps } from "vue"
import StarIcon from '../Icons/StarIcon.vue';
import { toDatetime } from '../../utils/formator'
import defaultAvatarSrc from '../../assets/images/avatar-placeholder.jpg';

defineProps({
  list: Array
})
</script>
