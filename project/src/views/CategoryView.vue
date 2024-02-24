<script setup lang="ts">
import BackButton from "@/components/atoms/BackButton.vue";
import Banner from "@/components/organisms/Banner.vue";
import type { Flags, MealsType } from "@/types/mealTypes";
import { reactive } from "vue";
import { useRoute } from "vue-router";
import MealService from "@/services/MealService";
import MealsList from "@/components/organisms/MealsList.vue";
import Areas from "@/components/molecules/Areas.vue";

// get id from url
const route = useRoute();
const currentCat = route.params.id;
const meals = reactive<MealsType>([]);
const areas: Flags = MealService.flags;
const isArea: boolean = areas[currentCat as keyof Flags] ? true : false;
console.log(isArea);

// get meals
const getMeals = async () => {
  try {
    let getMeals: MealsType = [];
    if (!isArea) {
      getMeals = (await MealService.filterByCategory(
        currentCat as string
      )) as MealsType;
    } else {
      getMeals = (await MealService.filterByArea(
        currentCat as string
      )) as MealsType;
    }

    if (getMeals) {
      getMeals.forEach((meal) => {
        meals.push(meal);
      });
    }
  } catch (error) {
    console.error(error);
  }
};

getMeals();
</script>
<template>
  <BackButton />
  <Banner />
  <h1>
    {{ currentCat }} meals
    <small class="text-xs">({{ meals.length }} results)</small>
  </h1>

  <MealsList v-if="meals.length > 0" :meals="(meals as MealsType)" />
  <Areas />
</template>
