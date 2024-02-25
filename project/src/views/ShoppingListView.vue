<script setup lang="ts">
import BackButton from "@/components/atoms/BackButton.vue";
import MealsList from "@/components/organisms/MealsList.vue";
import { useShoppingListStore } from "@/stores/shoppingListStore";
import type { MealsType } from "@/types/mealTypes";
import type { ShoppingList, TotalIngredients } from "@/types/storeType";
import { reactive, watch } from "vue";

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
  <BackButton />
  <h1 class="mb-8">My shopping list</h1>

  <div v-if="shopingList.length === 0">
    <p class="italic text-base">Nothing in the list yet</p>
  </div>

  <MealsList :meals="(shopingList as unknown as MealsType)" />

  <div v-if="totalIngredients.length > 0">
    <h2 class="mt-8">Total ingredients</h2>
    <table
      class="mx-auto mb-12 w-full max-w-[30rem] border-separate border-2 border-slate-200 rounded-xl overflow-hidden"
    >
      <tr
        v-for="(ingredient, index) in totalIngredients"
        :key="ingredient.strIngredient"
      >
        <td class="text-base p-4">{{ ingredient.strIngredient }}</td>
        <td class="text-base p-4">
          {{ ingredient.amount }}
        </td>
        <td class="text-base p-4">
          {{ ingredient.quantity }}
        </td>
      </tr>
    </table>
  </div>
</template>

<style></style>
