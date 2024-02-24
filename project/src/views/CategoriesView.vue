<script setup lang="ts">
import BackButton from "@/components/atoms/BackButton.vue";
import Areas from "@/components/molecules/Areas.vue";
import Banner from "@/components/organisms/Banner.vue";
import CategoriesList from "@/components/organisms/CategoriesList.vue";
import MealService from "@/services/MealService";
import type { ListCategories } from "@/types/mealTypes";
import { reactive } from "vue";

let categories = reactive<ListCategories>([]);

// get categories
const getcategories = async () => {
  try {
    const getCategories = (await MealService.categories()) as ListCategories;

    if (getCategories) {
      getCategories.forEach((category) => {
        categories.push(category);
      });
    }
  } catch (error) {
    console.error(error);
  }
};
getcategories();
</script>
<template>
  <BackButton />
  <Banner />
  <h1>Categories of meals</h1>
  <CategoriesList
    v-if="categories.length > 0"
    :categories="(categories as ListCategories)"
  />

  <Areas />
</template>
