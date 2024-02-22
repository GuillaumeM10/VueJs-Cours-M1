<script setup lang="ts">
import BackButtonVue from "@/components/atoms/BackButton.vue";
import MealsList from "@/components/organisms/MealsList.vue";
import SideBar from "@/components/organisms/SideBar.vue";
import MealService from "@/services/MealService";
import type { MealsType, MealType } from "@/types/mealTypes";
import { reactive, watch } from "vue";

let meals = reactive<MealsType>([]);

const getMeal = async () => {
  try {
    const getRandomMeal = (await MealService.randomMeal()) as MealType;
    meals.push(getRandomMeal);
  } catch (error) {
    console.error(error);
  }
};

getMeal();
getMeal();
getMeal();
getMeal();
getMeal();
getMeal();
</script>

<template>
  <main class="flex flex-row flex-nowrap relative">
    <SideBar />

    <div class="container">
      <h1>Ui Kit</h1>

      <BackButtonVue />
      <MealsList v-if="meals.length > 0" :meals="(meals as MealsType)" />
    </div>
  </main>
</template>
