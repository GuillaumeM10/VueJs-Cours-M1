<script setup lang="ts">
import router from "@/router";
import IconChevronLeftVue from "./IconChevronLeft.vue";

const goBack = () => {
  router.go(-1);
};
</script>
<template>
  <button
    @click="goBack"
    class="go-back flex flex-row text-center items-center gap-1 text-base my-8 w-fit"
  >
    <IconChevronLeftVue />

    Back
  </button>
</template>
