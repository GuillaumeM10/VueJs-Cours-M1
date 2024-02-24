<script setup lang="ts">
import { Vue3Lottie } from "vue3-lottie";
import AnimationDataJson from "@/assets/loop-food.json";
import BackButton from "@/components/atoms/BackButton.vue";
</script>

<template>
  <main>
    <BackButton />
    <h1>Not Found</h1>
    <Vue3Lottie :animationData="AnimationDataJson" :height="400" :width="400" />
  </main>
</template>
