<script setup lang="ts">
import BackButton from "@/components/atoms/BackButton.vue";
import MealService from "@/services/MealService";
// import YoutubeService from "@/services/YoutubeService";
import type { MealType } from "@/types/mealTypes";
import { reactive, ref, watch } from "vue";
import { useRoute } from "vue-router";
import { toast } from "vue3-toastify";
import { YoutubeVue3 } from "youtube-vue3";
// get id from url
const route = useRoute();
const id = route.params.id;
let meal = reactive<MealType>({
  idMeal: id as string,
});
let ytId = ref<string>("");

const getMealById = async (id: string) => {
  try {
    const response = (await MealService.mealDetailsById(id)) as MealType;

    if (response) {
      console.log(response);

      Object.entries(response).forEach(([key, value]) => {
        meal[key as keyof MealType] = value;
      });
    } else {
      console.log("No meal found");
      toast.error("No meal found");
    }

    // const yt = await YoutubeService.searchVideos("vue js");
    // console.log("yt", yt);
  } catch (error) {
    console.error(error);
  }
};

getMealById(id as string);

console.log(meal);

watch(meal, () => {
  if (meal.strYoutube) ytId.value = meal.strYoutube.split("v=")[1];
});
</script>
<template>
  <BackButton />

  <section class="meal-details mb-12">
    <h1>{{ meal.strMeal }}</h1>

    <div class="wrapper flex flex-row mobile:flex-col gap-8 mt-8">
      <div
        class="meal-details__image basis-full h-fit sticky mobile:static top-24"
      >
        <div class="thumbnail overflow-hidden rounded-xl flex h-fit mb-8">
          <img
            :src="meal.strMealThumb"
            :alt="meal.strMeal"
            class="rounded-xl hover:scale-110 transition-all duration-300 ease-in-out cursor-pointer w-full h-auto"
          />
        </div>
        <div class="youtube" v-if="ytId">
          <YoutubeVue3
            ref="youtube"
            :videoid="ytId"
            :controls="1"
            :width="1920"
            :height="1080"
            :autoplay="0"
            class="w-full h-auto rounded-xl"
            style="aspect-ratio: 16/9"
          />
        </div>
      </div>
      <div class="meal-details__info basis-full">
        <p class="text-base">{{ meal.strInstructions }}</p>
        <p class="text-base">{{ meal.strInstructions }}</p>
      </div>
    </div>
  </section>
</template>
