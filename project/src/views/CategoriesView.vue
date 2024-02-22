<script setup lang="ts">
import { useRoute } from "vue-router";

// get id from url
const route = useRoute();
const id = route.params.id;

console.log(id);
</script>
<template>
  <h1>meal categories</h1>
</template>
