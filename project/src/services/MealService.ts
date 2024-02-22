import type {
  ListAreas,
  ListCategories,
  ListIngredients,
  ByFilter,
  MealType,
  MealsType,
} from "../types/mealTypes";
import api from "./ApiService";

/*
www.themealdb.com/images/ingredients/Lime.png
www.themealdb.com/images/ingredients/Lime-Small.png
*/

// API DOC : https://www.themealdb.com/api.php
const baseUrl = "https://www.themealdb.com/api/json/v1/1";

export type MealServiceType = {
  searchMealByName: (name: string) => Promise<MealsType | unknown>;
  searchMealByFirstLetter: (letter: string) => Promise<MealsType | unknown>;
  mealDetailsById: (id: string) => Promise<MealsType | unknown>;
  randomMeal: () => Promise<MealType | unknown>;
  categories: () => Promise<ListCategories | unknown>;
  mealList: (
    listType: string
  ) => Promise<ListAreas | ListIngredients | ListCategories | unknown>;
  filterByMainIngredient: (ingredient: string) => Promise<ByFilter | unknown>;
  filterByCategory: (category: string) => Promise<ByFilter | unknown>;
  filterByArea: (area: string) => Promise<ByFilter | unknown>;
};

//Search meal by name
const searchMealByName = async (name: string) => {
  try {
    const response = await api.get(`${baseUrl}/search.php?s=${name}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// List all meals by first letter
const searchMealByFirstLetter = async (letter: string) => {
  try {
    const response = await api.get(`${baseUrl}/search.php?f=${letter}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Lookup full meal details by id
const mealDetailsById = async (id: string) => {
  try {
    const response = await api.get(`${baseUrl}/lookup.php?i=${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Lookup a single random meal
const randomMeal = async () => {
  try {
    const response = await api.get(`${baseUrl}/random.php`);

    console.log(response.data.meals[0]);

    return response.data.meals[0];
  } catch (error) {
    throw error;
  }
};

// List all meal categories
const categories = async () => {
  try {
    const response = await api.get(`${baseUrl}/categories.php`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// List all Categories, Area, Ingredients
const mealList = async (listType: string) => {
  try {
    if (listType !== "c" || listType !== "c" || listType !== "c")
      throw { error: "Invalid list type, must be 'c', 'a', or 'i'." };

    const response = await api.get(
      `${baseUrl}/search.php?s=list.php?${listType}=list`
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Filter by main ingredient
const filterByMainIngredient = async (ingredient: string) => {
  try {
    const response = await api.get(`${baseUrl}/filter.php?i=${ingredient}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Filter by Category
const filterByCategory = async (category: string) => {
  try {
    const response = await api.get(`${baseUrl}/filter.php?c=${category}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Filter by Area
const filterByArea = async (area: string) => {
  try {
    const response = await api.get(`${baseUrl}/filter.php?a=${area}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

const MealService: MealServiceType = {
  searchMealByName,
  searchMealByFirstLetter,
  mealDetailsById,
  randomMeal,
  categories,
  mealList,
  filterByMainIngredient,
  filterByCategory,
  filterByArea,
};

export default MealService;
