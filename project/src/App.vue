<script setup lang="ts">
import { RouterView } from "vue-router";
import TheFooter from "./components/organisms/TheFooter.vue";
import TheHeader from "./components/organisms/TheHeader.vue";
import GoTop from "./components/molecules/GoTop.vue";
</script>
<template>
  <TheHeader />

  <div class="content px-4 w-[-webkit-fill-available]">
    <RouterView :key="$route.fullPath" />
  </div>

  <GoTop />
  <TheFooter />
</template>
