<script setup lang="ts">
import { useFavoritesStore } from "@/stores/favoritesStore";
import type { ListIngredients, MealType } from "../../types/mealTypes";
import { reactive, ref, watch } from "vue";
import { useShoppingListStore } from "@/stores/shoppingListStore";
import { toast } from "vue3-toastify";
import type { ShoppingItem } from "@/types/storeType";
import IconFullHeart from "../atoms/IconFullHeart.vue";
import IconEmptyHeart from "../atoms/IconEmptyHeart.vue";
import IconAddShopping from "../atoms/IconAddShopping.vue";
import IconCheckShopping from "../atoms/IconCheckShopping.vue";
import MealService from "@/services/MealService";

const props = defineProps<{
  meal: MealType;
}>();

let mealDetails = reactive<MealType>({
  idMeal: props.meal.idMeal,
});

const favoritesStore = useFavoritesStore();
let isFav = ref<boolean>(favoritesStore.isFavorite(props.meal.idMeal));

const shoppingListStore = useShoppingListStore();
let isInShopping = ref<boolean>(
  shoppingListStore.isInShoppingList(props.meal.idMeal)
);

let ingredients = reactive<ListIngredients>([]);

const toggleFavorite = async () => {
  await getMealDetails(props.meal.idMeal);

  if (!isFav.value && props.meal.strMeal && props.meal.strMealThumb) {
    favoritesStore.addToFavorites({
      idMeal: props.meal.idMeal,
      mealLink: "/meal/" + props.meal.idMeal,
      strMealThumb: props.meal.strMealThumb,
      strMeal: props.meal.strMeal,
    });
    toast.success("Added to favorites", {
      position: "top-center",
    });
  } else {
    favoritesStore.removeFromFavorites(props.meal.idMeal);
    toast.error("Removed from favorites", {
      position: "top-center",
    });
  }

  isFav.value = !isFav.value;
};

const toggleShoppingList = async () => {
  await getMealDetails(props.meal.idMeal);

  if (!isInShopping.value) {
    let shoppingIngredients: ShoppingItem["ingredients"] = [];

    ingredients.forEach((ingredient, index) => {
      const amount = (props.meal as MealType)[
        ("strMeasure" + (index + 1).toString()) as keyof MealType
      ];
      const name = ingredient.strIngredient;
      if (!amount || !name) return;

      shoppingIngredients?.push({
        name: name,
        amount: amount,
      });
    });

    shoppingListStore.addToShoppingList({
      idMeal: props.meal.idMeal,
      ingredients: shoppingIngredients,
    });
    toast.success("Added to shopping list", {
      position: "top-center",
    });
  } else {
    shoppingListStore.removeFromShoppingList(props.meal.idMeal);
    toast.error("Removed from shopping list", {
      position: "top-center",
    });
  }

  isInShopping.value = !isInShopping.value;
};

const getMealDetails = async (id: string) => {
  try {
    const response = (await MealService.mealDetailsById(id)) as MealType;

    if (!response) return;
    Object.entries(response).forEach(([key, value]) => {
      mealDetails[key as keyof MealType] = value;
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
  } catch (error) {
    console.error(error);
  }
};

if (!props.meal.strMealThumb) {
  getMealDetails(props.meal.idMeal);
}

watch(isFav, () => {
  isFav.value = favoritesStore.isFavorite(props.meal.idMeal);
});

watch(isInShopping, () => {
  isInShopping.value = shoppingListStore.isInShoppingList(props.meal.idMeal);
});
</script>

<template>
  <div
    class="meal-card bg-white shadow-md rounded-lg overflow-hidden flex flex-col gap-4 relative cursor-pointer h-64"
  >
    <img
      :alt="meal.strMeal ?? mealDetails.strMeal"
      :src="meal.strMealThumb ?? mealDetails.strMealThumb"
      class="w-full h-full object-cover rounded-t-lg"
    />
    <RouterLink
      :to="{ name: 'meal', params: { id: meal.idMeal ?? mealDetails.idMeal } }"
      class="w-full h-full absolute top-0 left-0"
    >
      <div
        class="title-container opacity-0 w-full h-full bg-black bg-opacity-50 backdrop-blur-sm rounded-t-lg flex items-center justify-center transition-opacity duration-300"
      >
        <h2 class="text-xl font-bold text-slate-100 text-center px-4">
          {{ meal.strMeal ?? mealDetails.strMeal }}
        </h2>
      </div>
    </RouterLink>
    <button
      class="invert absolute top-4 left-4 z-10 hidden"
      @click="toggleFavorite"
    >
      <IconFullHeart class="w-10 h-auto" v-if="isFav" />
      <IconEmptyHeart class="w-10 h-auto" v-if="!isFav" />
    </button>

    <button
      class="invert absolute top-4 right-4 z-10 hidden"
      @click="toggleShoppingList"
    >
      <IconAddShopping class="w-10 h-auto" v-if="!isInShopping" />
      <IconCheckShopping class="w-10 h-auto" v-if="isInShopping" />
    </button>
  </div>
</template>

<style scoped lang="scss">
.meal-card:hover button,
.meal-card:hover .title-container {
  display: flex;
  opacity: 1;
}
</style>
