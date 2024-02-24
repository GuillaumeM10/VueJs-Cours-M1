<script setup lang="ts">
import { ref } from "vue";
import IconChevronLeftVue from "../atoms/IconChevronLeft.vue";

const goTop = () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
};

const cantScroll = ref<boolean>(false);

window.addEventListener("scroll", () => {
  if (window.scrollY > 100) {
    cantScroll.value = true;
  } else {
    cantScroll.value = false;
  }
});
</script>
<template>
  <button
    class="fixed bottom-4 right-4 p-2 bg-white rounded-full shadow-md z-40"
    aria-label="Go to top"
    @click="goTop"
    v-if="cantScroll"
  >
    <IconChevronLeftVue class="rotate-90" />
  </button>
</template>
