<script setup lang="ts">
import MealService from "@/services/MealService";
import type { MealsType } from "@/types/mealTypes";
import { onMounted, reactive, ref } from "vue";
import MealsList from "./MealsList.vue";
import SideBar from "./SideBar.vue";

let meals = reactive<MealsType>([]);
let reactiveLetter = ref("a");
let loading = ref(false);

const getMeal = async (letter: string) => {
  try {
    loading.value = true;
    if (letter === "z") return;
    const getMealByLetter = (await MealService.searchMealByFirstLetter(
      letter
    )) as MealsType;
    if (getMealByLetter) {
      meals = meals.concat(getMealByLetter);
    }
    reactiveLetter.value = String.fromCharCode(letter.charCodeAt(0) + 1);
    loading.value = false;
  } catch (error) {
    console.error(error);
  }
};

onMounted(() => {
  getMeal(reactiveLetter.value);
});
</script>
<template>
  <section class="home-meals flex flex-col flex-nowrap items-center">
    <h2 class="self-start">
      Infinite meals
      <small class="text-xs">({{ meals.length }} results)</small>
    </h2>

    <MealsList v-if="meals.length > 0" :meals="(meals as MealsType)" />

    <button
      @click="getMeal(reactiveLetter)"
      class="btn-primary my-4 mobile:w-full text-lg"
      :disabled="loading"
    >
      {{
        reactiveLetter === "z"
          ? "No more meals"
          : loading
          ? "Loading..."
          : "Load more"
      }}
    </button>
  </section>
</template>
