<script setup lang="ts">
import type { ListCategories } from "@/types/mealTypes";
import CategoryCard from "../molecules/CategoryCard.vue";

const props = defineProps<{
  categories: ListCategories;
}>();
</script>

<template>
  <section class="categories my-12">
    <div
      class="meals-list w-[-webkit-fill-available] flex flex-wrap justify-center gap-4 bg-white my-12"
    >
      <CategoryCard v-for="category in props.categories" :category="category" />
    </div>
  </section>
</template>

<style lang="scss" scoped>
.category-card {
  width: 100%;

  @media (min-width: 640px) {
    width: calc(50% - 0.5rem);
  }

  @media (min-width: 1024px) {
    width: calc(33.3333% - 0.7em);
  }

  @media (min-width: 1280px) {
    width: calc(25% - 0.8rem);
  }
}
</style>
