<script setup lang="ts">
import type { MealsType, MealType } from "@/types/mealTypes";
import MealCard from "../molecules/MealCard.vue";

const props = defineProps<{
  meals: MealsType;
}>();

console.log(props.meals);
</script>

<template>
  <div
    class="meals-list w-[-webkit-fill-available] flex flex-wrap justify-center gap-4 p-4 bg-white my-12"
  >
    <MealCard v-for="meal in props.meals" :meal="meal" />
  </div>
</template>
