<script setup lang="ts">
import BackButton from "@/components/atoms/BackButton.vue";
import Banner from "@/components/organisms/Banner.vue";
import type {
  CategoryType,
  Flags,
  ListCategories,
  ListIngredients,
  MealsType,
} from "@/types/mealTypes";
import { reactive, ref } from "vue";
import { useRoute } from "vue-router";
import MealService from "@/services/MealService";
import MealsList from "@/components/organisms/MealsList.vue";
import Areas from "@/components/molecules/Areas.vue";
import Categories from "@/components/molecules/Categories.vue";
import Ingredients from "@/components/molecules/Ingredients.vue";

// get id from url
const route = useRoute();
const currentCat = route.params.id;
const meals = reactive<MealsType>([]);
const areas: Flags = MealService.flags;
const isArea: boolean = areas[currentCat as keyof Flags] ? true : false;
let isCategory = ref<boolean>(false);
let isIngredient: boolean = !isCategory.value && !isArea;
let ingrediantDesc = ref<string>("");

const isCategoryFunc = async () => {
  try {
    const categories = (await MealService.categories()) as ListCategories;
    if (categories) {
      categories.forEach((category: CategoryType) => {
        if (category.strCategory === currentCat) {
          isCategory.value = true;
        }
      });
    }
  } catch (error) {
    console.error(error);
  }
};

isCategoryFunc();

// get meals
const getMeals = async () => {
  try {
    let getMeals: MealsType = [];
    if (isArea) {
      getMeals = (await MealService.filterByArea(
        currentCat as string
      )) as MealsType;
    } else if (isCategory.value) {
      getMeals = (await MealService.filterByCategory(
        currentCat as string
      )) as MealsType;
    } else {
      const formattedCat = currentCat
        .toString()
        .toLowerCase()
        .replace(" ", "_");
      getMeals = (await MealService.filterByMainIngredient(
        formattedCat as string
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

const getIngrediantDesc = async () => {
  try {
    const response = (await MealService.mealList("i")) as ListIngredients;
    if (response) {
      response.forEach((ingrediant) => {
        if (
          ingrediant.strIngredient === currentCat &&
          ingrediant.strDescription
        ) {
          ingrediantDesc.value = ingrediant.strDescription;
        }
      });
    }
  } catch (error) {
    console.error(error);
  }
};

if (isIngredient) {
  getIngrediantDesc();
}

getMeals();
</script>
<template>
  <BackButton />
  <Banner />
  <h1>
    {{ currentCat }} meals
    <small class="text-xs">({{ meals.length }} results)</small>
  </h1>

  <p v-if="isIngredient" class="text-sm my-4">
    {{ ingrediantDesc }}
  </p>

  <MealsList v-if="meals.length > 0" :meals="(meals as MealsType)" />
  <Areas />
  <Categories />
  <Ingredients />
</template>
