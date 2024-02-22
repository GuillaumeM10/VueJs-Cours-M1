<script setup lang="ts">
import router from "@/router";

const goBack = () => {
  router.go(-1);
};
</script>
<template>
  <button
    @click="goBack"
    class="go-back flex flex-row text-center items-center gap-1 text-base my-8"
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      fill="currentColor"
      class="bi bi-chevron-left w-4 h-auto ml-4"
      viewBox="0 0 16 16"
    >
      <path
        fill-rule="evenodd"
        d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0"
      />
    </svg>

    Back
  </button>
</template>
