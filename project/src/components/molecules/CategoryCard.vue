<script setup lang="ts">
import type { CategoryType } from "@/types/mealTypes";

defineProps<{
  category: CategoryType;
}>();
</script>
<template>
  <div class="category-card">
    <RouterLink
      :to="{ path: '/category/' + category.strCategory, force: true }"
      class="w-full h-full"
    >
      <h3 class="text-xl">{{ category.strCategory }}</h3>
      <div
        class="bg-slate-100 border-2 rounded-lg overflow-hidden flex flex-col gap-4 relative cursor-pointer h-64"
      >
        <img
          :src="category.strCategoryThumb"
          :alt="category.strCategory"
          class="w-full h-full object-cover rounded-lg"
        />
        <div
          class="title-container opacity-0 hover:opacity-100 absolute top-0 left-0 w-full h-full bg-black bg-opacity-50 rounded-t-lg inline-flex transition-opacity duration-300 overflow-y-auto p-4 backdrop-blur-sm"
        >
          <h2 class="font-normal text-sm text-slate-100 text-center my-auto">
            {{ category.strCategoryDescription }}
          </h2>
        </div>
      </div>
    </RouterLink>
  </div>
</template>
