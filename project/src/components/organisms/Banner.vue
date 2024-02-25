<script setup lang="ts">
import { reactive } from "vue";
import MealCard from "../molecules/MealCard.vue";
import type { MealType, MealsType } from "@/types/mealTypes";
import MealService from "@/services/MealService";

const props = defineProps<{
  title?: boolean;
}>();
let meals = reactive<MealsType>([]);

const getMeal = async () => {
  try {
    const getRandomMeal = (await MealService.randomMeal()) as MealType;
    meals.push(getRandomMeal);
  } catch (error) {
    console.error(error);
  }
};

for (let index = 0; index < 4; index++) {
  getMeal();
}
</script>
<template>
  <section class="banner mb-12">
    <h2 v-if="props.title">Meal of the day</h2>

    <div class="container flex flex-row flex-nowrap gap-4 max-h-64 my-4">
      <MealCard v-if="meals[0]" :meal="meals[0]" class="w-full" />
      <MealCard v-if="meals[1]" :meal="meals[1]" class="w-full" />

      <div class="wrapper flex flex-col mobile:hidden w-1/2 gap-4 max-h-64">
        <MealCard v-if="meals[2]" :meal="meals[2]" />
        <MealCard v-if="meals[3]" :meal="meals[3]" />
      </div>
    </div>
  </section>
</template>
