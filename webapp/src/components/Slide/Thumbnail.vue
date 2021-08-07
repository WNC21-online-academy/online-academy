<template>
  <div class="w-full h-auto relative flex items-center justify-items-center bg-gray-500">
    <div>
      <img :src="item.thumbnail" class="object-cover w-full h-96 rounded p-0 p-0 mix-blend-overlay" />
      <div class="absolute flex items-center justify-items-center bottom-0 max-w-full w-48"></div>

      <div
        class="title-box absolute flex text-left max-w-full h-full flex-col flex-nowrap top-0 left-1/3 right-0 bottom-48 justify-center justify-items-center text-white opacity-0 z-10 space-y-4"
      >
        <h1 class="block font-bold text-xl max-w-full">{{ item.name }}</h1>
        <p class="text-sm pt-0 m-0 pl-1 max-w-full">{{ item.description }}</p>
        <div class="absolute h-px w-4 bg-white -left-8 top-1/3"></div>
        <div>
          <button
            type="button"
            class="flex-none text-white px-6 py-2 rounded font-medium mx-3 bg-blue-800 hover:bg-blue-600 transition duration-200 each-in-out focus:outline-none"
            @click="onClickJoin(item.id)"
          >Tham gia ngay</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from "vue-router"

const router = useRouter()
// props
defineProps({
  item: Object
})
// events
function onClickJoin(id) {
  router.push(`/courses/${id}`)
}
</script>

<style lang="css">
.title-box h1 {
  font-family: "Futura";
}
.title-box p {
  font-family: "HelveticaNow";
}

.swiper-slide .title-box {
  transform: translateX(-50%);
  transition: all 0.7s ease 0.3s;
}
.swiper-slide-active .title-box {
  transform: translateX(0%);
  opacity: 1;
  transition: all 0.7s ease;
}

.swiper-slide img {
  transition: filter 0.7s ease;
  filter: grayscale(100%);
}
.swiper-slide-active img {
  filter: grayscale(0%) brightness(60%);
}

.fortnite-btn {
  background: linear-gradient(#fefb72, #fefca3);
  font-family: "Luckiest Guy";
  transform: skew(-5deg);
}

.fortnite-btn:hover {
  opacity: 0.8;
}

.fortnite-btn-inner {
  background: linear-gradient(#ede801, #fefb72);
  transform: skew(-10deg);
  color: #343f65;
}
</style>