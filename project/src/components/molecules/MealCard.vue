<script setup lang="ts">
import { defineProps } from "vue";
import type { MealType } from "../../types/mealTypes";

const props = defineProps<{
  meal: MealType;
}>();

console.log(props.meal);
</script>

<template>
  <div class="meal-card">
    <img
      :alt="props.meal.name"
      :src="props.meal.strMealThumb"
      class="w-full h-40 object-cover rounded-t-lg"
    />

    <div class="pt-4">
      <h2 class="text-xl font-bold">{{ props.meal.strMeal }}</h2>
      <p class="text-gray-500 text-base">{{ props.meal.strInstructions }}</p>
    </div>
  </div>
</template>
