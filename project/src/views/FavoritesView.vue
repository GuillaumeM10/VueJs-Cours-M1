<script setup lang="ts">
import BackButton from "@/components/atoms/BackButton.vue";
import MealsList from "@/components/organisms/MealsList.vue";
import { useFavoritesStore } from "@/stores/favoritesStore";
import type { MealsType } from "@/types/mealTypes";
import type { Favorites } from "@/types/storeType";
import { reactive, watch } from "vue";

const favoritesStore = useFavoritesStore();
let favorites = reactive<Favorites>(favoritesStore.favorites);
</script>

<template>
  <BackButton />
  <h1 class="mb-8">My favorites meals</h1>

  <div v-if="favorites.length === 0">
    <p class="italic text-base">No favorites yet</p>
  </div>

  <MealsList :meals="(favorites as unknown as MealsType)" />
</template>

<style></style>
