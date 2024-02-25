<script setup lang="ts">
import BackButton from "@/components/atoms/BackButton.vue";
import Banner from "@/components/organisms/Banner.vue";
import HomeMeals from "@/components/organisms/HomeMeals.vue";
import SideBar from "@/components/organisms/SideBar.vue";
import { useShoppingListStore } from "@/stores/shoppingListStore";
import type { ShoppingList, TotalIngredients } from "@/types/storeType";
import { reactive } from "vue";

import { register } from "swiper/element/bundle";
import MealCard from "@/components/molecules/MealCard.vue";
register();

const shopingListStore = useShoppingListStore();
let shopingList = reactive<ShoppingList>(shopingListStore.shoppingList);
let totalIngredients = reactive<TotalIngredients>(
  shopingListStore.totalIngredients
);
totalIngredients.sort((a, b) => {
  if ((a.strIngredient ?? "") < (b.strIngredient ?? "")) {
    return -1;
  }
  if ((a.strIngredient ?? "") > (b.strIngredient ?? "")) {
    return 1;
  }
  return 0;
});
</script>

<template>
  <main class="flex flex-raw flex-nowrap relative">
    <div class="container flex flex-col">
      <BackButton />

      <Banner />

      <HomeMeals class="mt-12" />
    </div>
    <SideBar :right="true">
      <h3 class="text-lg text-center mb-8 text-black">List Swiper</h3>

      <swiper-container
        :slides-per-view="1.3"
        :space-between="10"
        class="my-4 w-[-webkit-fill-available]"
      >
        <swiper-slide v-for="(meal, index) in shopingList" :key="meal.idMeal">
          <MealCard
            :meal="{
              idMeal: meal.idMeal,
            }"
          />
        </swiper-slide>
      </swiper-container>

      <h3 class="text-lg text-center mb-8 mt-12 text-black">
        My Shopping list
      </h3>
      <div v-if="totalIngredients.length === 0">
        <p class="italic text-base text-center">Nothing in the list yet</p>
      </div>
      <table
        class="mx-auto mb-12 w-full max-w-[30rem] border-separate border-2 border-slate-500 rounded-xl overflow-hidden"
        v-if="totalIngredients.length > 0"
      >
        <tr
          v-for="(ingredient, index) in totalIngredients"
          :key="ingredient.strIngredient"
        >
          <td class="text-xs p-2 text-black">{{ ingredient.strIngredient }}</td>
          <td class="text-xs p-2 text-black">
            {{ ingredient.amount }}
          </td>
          <td class="text-xs p-2 text-black">x{{ ingredient.quantity }}</td>
        </tr>
      </table>
    </SideBar>
  </main>
</template>
