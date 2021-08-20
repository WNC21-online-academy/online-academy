<template>
  <img :src="src || defaultAvatarSrc" alt @error="$event.target.src = defaultAvatarSrc" />
</template>

<script setup>
import { defineProps } from "vue";
import defaultAvatarSrc from '../assets/images/avatar-placeholder.jpg';

defineProps({
  src: String
})
</script>
