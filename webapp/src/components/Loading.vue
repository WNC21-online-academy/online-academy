<template>
  <div
    wire:loading
    class="fixed top-0 left-0 right-0 bottom-0 w-full h-screen z-50 overflow-hidden bg-gray-700 opacity-75 flex flex-col items-center justify-center"
  >
    <div class="loader bg-white p-4 rounded-full flex space-x-3">
      <div class="w-4 h-4 bg-gray-800 rounded-full animate-bounce"></div>
      <div class="w-4 h-4 bg-gray-800 rounded-full animate-bounce"></div>
      <div class="w-4 h-4 bg-gray-800 rounded-full animate-bounce"></div>
    </div>
    <h3 class="p-4 pl-8 text-center text-white text-xl font-semibold">Loading...</h3>
  </div>
</template>

<script setup>

</script>

<style lang="css" scoped>
.loader div {
  animation-duration: 0.5s;
}

.loader div:first-child {
  animation-delay: 0.1s;
}

.loader div:nth-child(2) {
  animation-delay: 0.3s;
}

.loader div:nth-child(3) {
  animation-delay: 0.6s;
}

</style>