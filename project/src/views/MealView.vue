<script setup lang="ts">
import BackButton from "@/components/atoms/BackButton.vue";
import Ingredients from "@/components/molecules/Ingredients.vue";
import Banner from "@/components/organisms/Banner.vue";
import MealService from "@/services/MealService";
import type { Flags, ListIngredients, MealType } from "@/types/mealTypes";
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
let ingredients = reactive<ListIngredients>([]);
const flags: Flags = MealService.flags;
let tags: string[] = [];

const getMealById = async (id: string) => {
  try {
    const response = (await MealService.mealDetailsById(id)) as MealType;

    if (response) {
      Object.entries(response).forEach(([key, value]) => {
        meal[key as keyof MealType] = value;
      });

      const ingredientsList = (await MealService.mealList(
        "i"
      )) as ListIngredients;

      const ingredientKeys = Object.keys(response).filter((key) =>
        key.includes("strIngredient")
      );

      ingredientKeys.forEach((key) => {
        if (response[key as keyof MealType]) {
          const ingredient = ingredientsList.find(
            (ingredient) =>
              ingredient.strIngredient === response[key as keyof MealType]
          );

          if (ingredient) {
            ingredients.push(ingredient);
          }
        }
      });

      if (response.strTags) {
        tags = response.strTags.split(",");
      }
    } else {
      console.log("No meal found");
      toast.error("No meal found");
    }
  } catch (error) {
    console.error(error);
  }
};

getMealById(id as string);

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

        <div class="tags mt-8 flex flex-row gap-2" v-if="tags.length > 0">
          <p
            class="text-base btn-primary hover:cursor-default px-4 py-2 rounded-md"
            v-for="tag in tags"
          >
            {{ tag }}
          </p>
        </div>
      </div>
      <div class="meal-details__info basis-full">
        <div class="flex">
          <div class="container">
            <h3 class="mb-4 text-xl" v-if="meal.strArea">Area</h3>
            <RouterLink
              v-if="meal.strArea"
              :to="/category/ + meal.strArea"
              class="relative w-56 tablet:w-40 block overflow-hidden rounded-md"
              style="aspect-ratio: 16/9"
            >
              <p
                class="text-base absolute top-0 left-0 text-white backdrop-blur bg-black bg-opacity-50 h-full w-full flex items-center justify-center opacity-0 hover:opacity-100 transition-all duration-300 ease-in-out"
              >
                {{ meal.strArea }}
              </p>
              <img
                v-if="flags"
                :src="flags[meal.strArea as keyof Flags]"
                alt=""
                class="w-full h-full rounded-md border-2 border-slate-200 object-cover"
              />
            </RouterLink>
          </div>
          <div class="container">
            <h3 class="mb-4 text-xl" v-if="meal.strCategory">Category</h3>
            <RouterLink
              v-if="meal.strCategory"
              :to="/category/ + meal.strCategory"
              class="relative w-56 tablet:w-40 block overflow-hidden rounded-md"
              style="aspect-ratio: 16/9"
            >
              <p
                class="text-base absolute top-0 left-0 text-white backdrop-blur bg-black bg-opacity-50 h-full w-full flex items-center justify-center opacity-0 hover:opacity-100 transition-all duration-300 ease-in-out"
              >
                {{ meal.strCategory }}
              </p>
              <img
                v-if="flags"
                :src="`https://www.themealdb.com/images/category/${meal.strCategory
                  .toLowerCase()
                  .replace(' ', '_')}.png`"
                alt=""
                class="w-full h-full rounded-md border-2 border-slate-200 object-cover"
              />
            </RouterLink>
          </div>
        </div>

        <h3 class="text-xl mb-4 mt-8">Description</h3>
        <p class="text-base">{{ meal.strInstructions }}</p>

        <h3 class="text-xl mt-8 mb-4">Instructions</h3>

        <p class="text-base">{{ meal.strInstructions }}</p>

        <h3 class="text-xl mt-8 mb-4">Measures</h3>

        <table
          class="w-full border-collapse border-2 border-slate-200 rounded-xl overflow-hidden"
        >
          <tr
            v-for="(ingredient, index) in ingredients"
            :key="ingredient.idIngredient"
            class="border-b-2 border-slate-200"
          >
            <td class="text-base py-4">{{ ingredient.strIngredient }}</td>
            <td class="text-base py-4">
              {{
                (meal as MealType)[
                  ("strMeasure" + (index + 1).toString()) as keyof MealType
                ]
              }}
            </td>
          </tr>
        </table>

        <small class="text-xs italic"
          >source :
          <a
            :href="meal.strSource"
            target="_blank"
            rel="noopener noreferrer"
            class="underline"
            v-if="meal.strSource"
            >{{ meal.strSource }}</a
          >
          {{ !meal.strSource ? "Unknown" : "" }}
        </small>
      </div>
    </div>

    <Ingredients
      v-if="ingredients.length > 0"
      :propsIngredients="ingredients"
    />
  </section>

  <section class="other-food">
    <Banner title="Other food" />
  </section>
</template>
