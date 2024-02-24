<script setup lang="ts">
import MealService from "@/services/MealService";
import type { Flags, ListAreas } from "@/types/mealTypes";
import { nextTick, reactive, ref } from "vue";
import { register } from "swiper/element/bundle";
import { RouterLink } from "vue-router";
register();

const flags: Flags = MealService.flags;
const areas = reactive<ListAreas>([]);
const renderComponent = ref(true);

const getAreas = async () => {
  try {
    const getAreas = (await MealService.mealList("a")) as ListAreas;

    if (getAreas) {
      getAreas.forEach((area) => {
        areas.push(area);
      });
    }
  } catch (error) {
    console.error(error);
  }
};

getAreas();

const findFlag = (name: string) => {
  return flags[name as keyof Flags];
};

const forceRerender = async () => {
  // Remove MyComponent from the DOM
  renderComponent.value = false;

  // Wait for the change to get flushed to the DOM
  await nextTick();

  // Add the component back in
  renderComponent.value = true;
};
</script>
<template>
  <section class="areas my-12">
    <h2>Areas</h2>
    <swiper-container
      slides-per-view="auto"
      :space-between="0"
      class="my-4 w-[-webkit-fill-available]"
    >
      <swiper-slide v-if="areas.length > 0" v-for="area in areas" class="w-fit">
        <RouterLink
          v-if="areas.length > 0"
          :to="'/category/' + area.strArea"
          class="text-slate-200"
        >
          <div
            class="area-slide min-h-14 text-center p-0 rounded-full w-fit mr-4"
          >
            <p class="text-base mb-2 text-black">{{ area.strArea }}</p>
            <img
              :src="findFlag(area.strArea)"
              alt=""
              class="w-24 h-full rounded-md border-2 border-slate-200 object-cover"
              style="aspect-ratio: 96/65"
            />
          </div>
        </RouterLink>
      </swiper-slide>
    </swiper-container>
  </section>
</template>

<style lang="scss" scoped></style>
