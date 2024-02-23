<script setup lang="ts">
import type { MealType } from "../../types/mealTypes";

const props = defineProps<{
  meal: MealType;
}>();
</script>

<template>
  <div
    class="meal-card mobile:w-full tablet:w-1/2 desktop:w-1/3 w-1/4 bg-white shadow-md rounded-lg overflow-hidden flex flex-col gap-4 relative cursor-pointer"
  >
    <RouterLink
      :to="{ name: 'meal', params: { id: props.meal.idMeal } }"
      class="w-full h-full"
    >
      <img
        :alt="props.meal.strMeal"
        :src="props.meal.strMealThumb"
        class="w-full h-60 object-cover rounded-t-lg"
      />

      <div
        class="title-container opacity-0 absolute top-0 left-0 w-full h-full bg-black bg-opacity-50 rounded-t-lg flex items-center justify-center transition-opacity duration-300 hover:opacity-100"
      >
        <h2 class="text-xl font-bold text-slate-100 text-center px-4">
          {{ props.meal.strMeal }}
        </h2>
      </div>
    </RouterLink>
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
