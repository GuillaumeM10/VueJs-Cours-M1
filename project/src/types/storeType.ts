export type FavoriteItem = {
  idMeal: string;
  mealLink: string;
  strMealThumb: string;
  strMeal: string;
};

export type Favorites = FavoriteItem[];

export type ShoppingItem = {
  idMeal: string;
  ingredients?: {
    name: string;
    amount: string;
  }[];
};
export type ShoppingList = ShoppingItem[];

export type TotalIngredientItem = {
  strIngredient?: string;
  amount?: string;
  quantity?: number;
};

export type TotalIngredients = TotalIngredientItem[];
