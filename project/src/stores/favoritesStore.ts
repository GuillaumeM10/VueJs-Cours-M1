import { reactive, watch } from "vue";
import { defineStore } from "pinia";
import type { FavoriteItem, Favorites } from "@/types/storeType";

export const useFavoritesStore = defineStore("favorites", () => {
  let favorites = reactive<Favorites>([]);

  // sync with local storage
  const localFavorites = localStorage.getItem("favorites");
  if (localFavorites) {
    const parsedFavorites = JSON.parse(localFavorites);
    favorites.push(...parsedFavorites);
  }

  watch(
    favorites,
    (newVal) => {
      // sync with local storage
      localStorage.setItem("favorites", JSON.stringify(newVal));
    },
    { deep: true }
  );

  const addToFavorites = (item: FavoriteItem) => {
    const index = favorites.findIndex((el) => el.idMeal === item.idMeal);
    if (index !== -1) {
      return;
    }
    favorites.push(item);
  };

  const removeFromFavorites = (id: string) => {
    const index = favorites.findIndex((item) => item.idMeal === id);
    if (index !== -1) {
      favorites.splice(index, 1);
    }
  };

  const isFavorite = (id: FavoriteItem["idMeal"]) => {
    return favorites.some((favorite) => favorite.idMeal === id);
  };

  return {
    favorites,
    addToFavorites,
    removeFromFavorites,
    isFavorite,
  };
});
