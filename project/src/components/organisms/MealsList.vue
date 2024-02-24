<script setup lang="ts">
import type { MealsType } from "@/types/mealTypes";
import MealCard from "../molecules/MealCard.vue";

const props = defineProps<{
  meals: MealsType;
}>();
</script>

<template>
  <div
    class="meals-list w-[-webkit-fill-available] flex flex-wrap justify-center gap-4 bg-white my-12"
  >
    <MealCard v-for="meal in props.meals" :meal="meal" />
  </div>
</template>

<style lang="scss" scoped>
.meal-card {
  width: 100%;

  @media (min-width: 640px) {
    width: calc(50% - 0.5rem);
  }

  @media (min-width: 1024px) {
    width: calc(33.3333% - 0.7em);
  }

  @media (min-width: 1280px) {
    width: calc(25% - 0.8rem);
  }
}
</style>
