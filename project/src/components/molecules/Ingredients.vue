<script setup lang="ts">
import MealService from "@/services/MealService";
import type { ListIngredients } from "@/types/mealTypes";
import { reactive } from "vue";
import { register } from "swiper/element/bundle";
import { RouterLink } from "vue-router";
register();

const props = defineProps<{
  propsIngredients?: ListIngredients;
}>();
const ingredients = reactive<ListIngredients>([]);

const getIngredients = async () => {
  try {
    const response = (await MealService.mealList("i")) as ListIngredients;

    if (response) {
      response.forEach((ingredient) => {
        ingredients.push(ingredient);
      });
    }
  } catch (error) {
    console.error(error);
  }
};

if (!props.propsIngredients) {
  getIngredients();
} else {
  props.propsIngredients.forEach((ingredient) => {
    ingredients.push(ingredient);
  });
}
</script>
<template>
  <section class="areas my-12">
    <h2>Ingredients</h2>
    <swiper-container
      slides-per-view="auto"
      :space-between="0"
      class="my-4 w-[-webkit-fill-available]"
    >
      <swiper-slide
        v-if="ingredients.length > 0"
        v-for="ingredient in ingredients"
        class="w-fit"
      >
        <RouterLink
          v-if="ingredients.length > 0"
          :to="'/category/' + ingredient.strIngredient"
          class="text-slate-200"
        >
          <div
            class="area-slide min-h-14 text-center p-0 rounded-full w-fit mr-4"
          >
            <p class="text-base mb-2 text-black">
              {{ ingredient.strIngredient }}
            </p>
            <img
              :src="`https://www.themealdb.com/images/ingredients/${ingredient.strIngredient}.png`"
              alt=""
              class="w-48 h-full rounded-md border-2 border-slate-200 object-cover"
              style="aspect-ratio: 96/65"
              lazy-load="true"
            />
          </div>
        </RouterLink>
      </swiper-slide>
    </swiper-container>
  </section>
</template>

<style lang="scss" scoped></style>
