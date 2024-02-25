import type { MealType } from "./mealTypes";

export type Favorites = MealType[];

export type ShoppingItem = {
  mealId: string;
  ingredients: {
    name: string;
    amount: string;
  };
};
export type ShoppingList = ShoppingItem[];

export type TotalIngredients = {
  name: string;
  amount: string;
  quantity: number;
};
