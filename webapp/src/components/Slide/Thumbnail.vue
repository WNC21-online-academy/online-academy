<template>
  <div class="w-full h-auto relative flex items-center justify-items-center">
    <div>
      <img
        src="https://assets.codepen.io/5286152/stephany-lorena-TZ1A9R_WzGs-unsplash.jpg"
        alt
        class="object-cover w-full h-96 rounded p-0 p-0"
      />
      <div class="absolute flex items-center justify-items-center bottom-0 max-w-full w-48"></div>

      <div
        class="title-box absolute flex text-left max-w-full h-full flex-col flex-nowrap top-0 left-1/3 right-0 bottom-48 justify-center justify-items-center text-white opacity-0 z-10 space-y-4"
      >
        <h1 class="block font-bold text-xl max-w-full">{{ item.name }}</h1>
        <p
          class="text-sm pt-0 m-0 pl-1 max-w-full"
        >{{item.description}}</p>
        <div class="absolute h-px w-4 bg-white -left-1/4 top-1/3"></div>
        <button class="fortnite-btn flex items-center justify-center h-16 w-48">
          <span class="fortnite-btn-inner p-3 w-11/12 text-xl truncate">Tham gia ngay</span>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  item: Object
})

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