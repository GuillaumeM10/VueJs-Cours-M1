<script setup lang="ts">
import BackButtonVue from "@/components/atoms/BackButton.vue";
import Banner from "@/components/organisms/Banner.vue";
import MealsList from "@/components/organisms/MealsList.vue";
import SideBar from "@/components/organisms/SideBar.vue";
import MealService from "@/services/MealService";
import type { MealsType, MealType } from "@/types/mealTypes";
import { reactive } from "vue";

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
  <main>
    <Banner class="pl-4" />

    <section class="flex flex-row flex-nowrap relative">
      <SideBar :right="false" />
      <div class="container flex flex-col">
        <h1>Ui Kit</h1>

        <BackButtonVue />
        <MealsList
          v-if="meals.length > 0"
          :meals="(meals as MealsType)"
          class="my-auto"
        />
      </div>
      <SideBar :right="true" />
    </section>
  </main>
</template>
