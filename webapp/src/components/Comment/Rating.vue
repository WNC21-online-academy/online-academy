<template>
  <div class="flex space-x-3 my-auto ml-auto mr-2">
    <template v-for="value in max">
      <StarIcon
        :class="{
          'text-gray-500': score < value,
          'text-yellow-500': score >= value
        }"
        class="w-8 h-8 cursor-pointer"
        @click="onClickStar(value)"
      />
    </template>
  </div>
</template>

<script setup>
import { defineEmit, defineProps, ref, toRefs } from "vue"
import StarIcon from '../Icons/StarIcon.vue'
import { RATING_MAX_SCORE } from '../../utils/contants'

// max score
const max = RATING_MAX_SCORE

// props
defineProps({
  score: Number
})

// emit 
const emit = defineEmit(['changeScore'])

// events
function onClickStar(value) {
  emit('changeScore', value)
}
</script>
