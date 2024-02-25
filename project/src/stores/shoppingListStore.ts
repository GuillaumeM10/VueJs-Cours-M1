import { reactive, watch } from "vue";
import { defineStore } from "pinia";
import type {
  ShoppingItem,
  ShoppingList,
  TotalIngredientItem,
  TotalIngredients,
} from "@/types/storeType";

export const useShoppingListStore = defineStore("Shopping List", () => {
  let shoppingList = reactive<ShoppingList>([]);
  let totalIngredients = reactive<TotalIngredients>([]);

  // sync with local storage
  const localShoppingList = localStorage.getItem("shoppingList");
  if (localShoppingList) {
    const parsedShoppingList = JSON.parse(localShoppingList);
    shoppingList.push(...parsedShoppingList);
  }

  const localTotalIngredients = localStorage.getItem("totalIngredients");
  if (localTotalIngredients) {
    const parsedTotalIngredients = JSON.parse(localTotalIngredients);
    totalIngredients.push(...parsedTotalIngredients);
  }

  watch(
    shoppingList,
    (newVal) => {
      // sync with local storage
      localStorage.setItem("shoppingList", JSON.stringify(newVal));
    },
    { deep: true }
  );

  watch(
    totalIngredients,
    (newVal) => {
      // sync with local storage
      localStorage.setItem("totalIngredients", JSON.stringify(newVal));
    },
    { deep: true }
  );

  const addToShoppingList = (item: ShoppingItem) => {
    const index = shoppingList.findIndex((el) => el.idMeal === item.idMeal);
    if (index !== -1) {
      return;
    }
    shoppingList.push(item);

    const ingredients = item.ingredients;

    ingredients?.forEach((ingredient) => {
      const index = totalIngredients.findIndex(
        (item: TotalIngredientItem) => item.strIngredient === ingredient.name
      );
      if (index !== -1 && totalIngredients[index].quantity) {
        const toIncrement = totalIngredients[index];
        if (toIncrement.quantity !== undefined) {
          toIncrement.quantity += 1;
        }
      } else {
        totalIngredients.push({
          strIngredient: ingredient.name,
          amount: ingredient.amount,
          quantity: 1,
        });
      }
    });
  };

  const removeFromShoppingList = (id: string) => {
    const index = shoppingList.findIndex((item) => item.idMeal === id);
    if (index !== -1) {
      const ingredients = shoppingList[index].ingredients;

      ingredients?.forEach((ingredient) => {
        const indexTotal = totalIngredients.findIndex(
          (item: TotalIngredientItem) => item.strIngredient === ingredient.name
        );

        if (indexTotal !== -1 && totalIngredients[indexTotal].quantity) {
          const toDecrement = totalIngredients[indexTotal];
          if (toDecrement.quantity !== undefined && toDecrement.quantity > 1) {
            toDecrement.quantity -= 1;
          } else {
            totalIngredients.splice(indexTotal, 1);
          }
        }
      });

      shoppingList.splice(index, 1);
    }
  };

  const isInShoppingList = (id: ShoppingItem["idMeal"]) => {
    return shoppingList.some((shoppingItem) => shoppingItem.idMeal === id);
  };

  return {
    shoppingList,
    addToShoppingList,
    removeFromShoppingList,
    totalIngredients,
    isInShoppingList,
  };
});
