<script setup lang="ts">
import MealCard from "@/components/molecules/MealCard.vue";
import MealService from "@/services/MealService";
import type { MealType } from "@/types/mealTypes";
import { ref, type Ref } from "vue";

let meal = ref({});
let meal2 = ref({});
let meal3 = ref({});

const getMeal = async (meal: Ref<{}>) => {
  try {
    meal.value = (await MealService.randomMeal()) as MealType;
  } catch (error) {
    console.error(error);
  }
};

getMeal(meal);
getMeal(meal2);
getMeal(meal3);
</script>

<template>
  <main>
    <h1>Ui Kit</h1>

    <MealCard :meal="(meal as MealType)" />
    <MealCard :meal="(meal2 as MealType)" />
    <MealCard :meal="(meal3 as MealType)" />
  </main>
</template>
