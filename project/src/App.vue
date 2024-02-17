<script setup lang="ts">
import { RouterView } from "vue-router";
import Footer from "./components/organisms/Footer.vue";
import Header from "./components/organisms/Header.vue";
</script>

<template>
  <Header />

  <RouterView />

  <Footer />
</template>
