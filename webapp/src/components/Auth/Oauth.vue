<template>
  <!-- Social oauth -->
  <div>
    <div class="grid grid-cols-3 gap-1">
      <button
        type="button"
        class="transition duration-200 border border-gray-200 text-gray-500 w-full py-2.5 rounded-lg text-sm shadow-sm hover:shadow-md font-normal text-center inline-block"
      >
        <FacebookIcon class="inline mr-2" />
        <span>Facebook</span>
      </button>
      <button
        type="button"
        class="transition duration-200 border border-gray-200 text-gray-500 w-full py-2.5 rounded-lg text-sm shadow-sm hover:shadow-md font-normal text-center inline-block"
      >
        <GoogleIcon class="inline mr-2" />
        <span>Google</span>
      </button>
      <button
        type="button"
        class="transition duration-200 border border-gray-200 text-gray-500 w-full py-2.5 rounded-lg text-sm shadow-sm hover:shadow-md font-normal text-center inline-block"
      >
        <GithubIcon class="inline mr-2" />
        <span>Github</span>
      </button>
    </div>
  </div>
</template>

<script setup>
import FacebookIcon from '../Icons/FacebookIcon.vue';
import GoogleIcon from '../Icons/GoogleIcon.vue';
import GithubIcon from '../Icons/GithubIcon.vue';

</script>
