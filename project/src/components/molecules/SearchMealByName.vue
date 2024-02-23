<script setup lang="ts">
import MealService from "@/services/MealService";
import type { MealsType } from "@/types/mealTypes";
import { reactive, ref, watch } from "vue";
import MealCard from "./MealCard.vue";

const search = ref("");
let meals = reactive<MealsType>([]);

const getMealByName = async (name: string) => {
  try {
    const response = (await MealService.searchMealByName(name)) as MealsType;
    if (response) meals = response;
  } catch (error) {
    console.error(error);
  }
};

const inputChange = (e: Event) => {
  const input = e.target as HTMLInputElement;

  e.preventDefault();
  if (input.value.length > 0) input.parentElement?.classList.add("cross");
  else {
    meals = [];
    input.parentElement?.classList.remove("cross");
  }
};

watch(search, (newVal) => {
  if (newVal.length <= 2) meals = [];
  else getMealByName(newVal);
});
</script>
<template>
  <div class="search-container">
    <div class="search-bar">
      <input
        type="search"
        v-model="search"
        placeholder="Search meal by name"
        class="search-input"
        @input="(e) => inputChange(e)"
      />
      <img src="/search.svg" alt="" />
    </div>
    <div class="results p-4" v-if="meals.length > 0 || search.length > 2">
      <div class="container">
        <MealCard
          v-for="meal in meals"
          :meal="meal"
          @click="
            meals = [];
            search = '';
          "
        />
        <p
          v-if="meals.length === 0 && search.length > 2"
          class="text-base text-center"
        >
          No meals found
        </p>
      </div>
    </div>
  </div>
</template>
