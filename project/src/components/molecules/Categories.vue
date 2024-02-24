<script setup lang="ts">
import MealService from "@/services/MealService";
import type { ListCategories } from "@/types/mealTypes";
import { nextTick, reactive, ref } from "vue";
import { register } from "swiper/element/bundle";
import { RouterLink } from "vue-router";
register();

const categories = reactive<ListCategories>([]);

const getCategories = async () => {
  try {
    const response = (await MealService.categories()) as ListCategories;

    if (response) {
      response.forEach((category) => {
        categories.push(category);
      });
    }
  } catch (error) {
    console.error(error);
  }
};

getCategories();
</script>
<template>
  <section class="areas my-12">
    <h2>Categories</h2>
    <swiper-container
      slides-per-view="auto"
      :space-between="0"
      class="my-4 w-[-webkit-fill-available]"
    >
      <swiper-slide
        v-if="categories.length > 0"
        v-for="category in categories"
        class="w-fit"
      >
        <RouterLink
          v-if="categories.length > 0"
          :to="'/category/' + category.strCategory"
          class="text-slate-200"
        >
          <div
            class="area-slide min-h-14 text-center p-0 rounded-full w-fit mr-4"
          >
            <p class="text-base mb-2 text-black">{{ category.strCategory }}</p>
            <img
              :src="category.strCategoryThumb"
              alt=""
              class="w-48 h-full rounded-md border-2 border-slate-200 object-cover"
              style="aspect-ratio: 96/65"
            />
          </div>
        </RouterLink>
      </swiper-slide>
    </swiper-container>
  </section>
</template>

<style lang="scss" scoped></style>
