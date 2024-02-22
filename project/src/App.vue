<script setup lang="ts">
import { RouterView } from "vue-router";
import TheFooter from "./components/organisms/TheFooter.vue";
import TheHeader from "./components/organisms/TheHeader.vue";
</script>
<template>
  <TheHeader />

  <div class="content px-4 w-[-webkit-fill-available]">
    <RouterView />
  </div>

  <TheFooter />
</template>
