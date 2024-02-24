<script setup lang="ts">
import type { MealType } from "../../types/mealTypes";

defineProps<{
  meal: MealType;
}>();
</script>

<template>
  <div
    class="meal-card bg-white shadow-md rounded-lg overflow-hidden flex flex-col gap-4 relative cursor-pointer h-64"
  >
    <RouterLink
      :to="{ name: 'meal', params: { id: meal.idMeal } }"
      class="w-full h-full"
    >
      <img
        :alt="meal.strMeal"
        :src="meal.strMealThumb"
        class="w-full h-full object-cover rounded-t-lg"
      />

      <div
        class="title-container opacity-0 absolute top-0 left-0 w-full h-full bg-black bg-opacity-50 backdrop-blur-sm rounded-t-lg flex items-center justify-center transition-opacity duration-300 hover:opacity-100"
      >
        <h2 class="text-xl font-bold text-slate-100 text-center px-4">
          {{ meal.strMeal }}
        </h2>
      </div>
    </RouterLink>
  </div>
</template>
