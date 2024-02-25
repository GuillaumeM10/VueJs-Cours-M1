import type {
  ListAreas,
  ListCategories,
  ListIngredients,
  ByFilter,
  MealType,
  MealsType,
  Flags,
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
  flags: Flags;
};

//Search meal by name
const searchMealByName = async (name: string) => {
  try {
    const response = await api.get(`${baseUrl}/search.php?s=${name}`);
    return response.data.meals;
  } catch (error) {
    throw error;
  }
};

// List all meals by first letter
const searchMealByFirstLetter = async (letter: string) => {
  try {
    const response = await api.get(`${baseUrl}/search.php?f=${letter}`);
    return response.data.meals;
  } catch (error) {
    throw error;
  }
};

// Lookup full meal details by id
const mealDetailsById = async (id: string) => {
  try {
    const response = await api.get(`${baseUrl}/lookup.php?i=${id}`);
    return response.data.meals[0];
  } catch (error) {
    throw error;
  }
};

// Lookup a single random meal
const randomMeal = async () => {
  try {
    const response = await api.get(`${baseUrl}/random.php`);
    return response.data.meals[0];
  } catch (error) {
    throw error;
  }
};

// List all meal categories
const categories = async () => {
  try {
    const response = await api.get(`${baseUrl}/categories.php`);
    return response.data.categories;
  } catch (error) {
    throw error;
  }
};

// List all Categories, Area, Ingredients
const mealList = async (listType: string) => {
  try {
    if (listType !== "c" && listType !== "a" && listType !== "i")
      throw { error: "Invalid list type, must be 'c', 'a', or 'i'." };

    const response = await api.get(`${baseUrl}/list.php?${listType}=list`);
    return response.data.meals;
  } catch (error) {
    throw error;
  }
};

// Filter by main ingredient
const filterByMainIngredient = async (ingredient: string) => {
  try {
    const response = await api.get(`${baseUrl}/filter.php?i=${ingredient}`);
    return response.data.meals;
  } catch (error) {
    throw error;
  }
};

// Filter by Category
const filterByCategory = async (category: string) => {
  try {
    const response = await api.get(`${baseUrl}/filter.php?c=${category}`);
    return response.data.meals;
  } catch (error) {
    throw error;
  }
};

// Filter by Area
const filterByArea = async (area: string) => {
  try {
    const response = await api.get(`${baseUrl}/filter.php?a=${area}`);
    return response.data.meals;
  } catch (error) {
    throw error;
  }
};

const flags: Flags = {
  us: "https://flagcdn.com/us.svg",
  American: "https://flagcdn.com/us.svg",
  gb: "https://flagcdn.com/gb.svg",
  British: "https://flagcdn.com/gb.svg",
  ca: "https://flagcdn.com/ca.svg",
  Canadian: "https://flagcdn.com/ca.svg",
  cn: "https://flagcdn.com/cn.svg",
  Chinese: "https://flagcdn.com/cn.svg",
  hr: "https://flagcdn.com/hr.svg",
  Croatian: "https://flagcdn.com/hr.svg",
  nl: "https://flagcdn.com/nl.svg",
  Dutch: "https://flagcdn.com/nl.svg",
  eg: "https://flagcdn.com/eg.svg",
  Egyptian: "https://flagcdn.com/eg.svg",
  ph: "https://flagcdn.com/ph.svg",
  Filipino: "https://flagcdn.com/ph.svg",
  fr: "https://flagcdn.com/fr.svg",
  French: "https://flagcdn.com/fr.svg",
  gr: "https://flagcdn.com/gr.svg",
  Greek: "https://flagcdn.com/gr.svg",
  in: "https://flagcdn.com/in.svg",
  Indian: "https://flagcdn.com/in.svg",
  ie: "https://flagcdn.com/ie.svg",
  Irish: "https://flagcdn.com/ie.svg",
  it: "https://flagcdn.com/it.svg",
  Italian: "https://flagcdn.com/it.svg",
  jm: "https://flagcdn.com/jm.svg",
  Jamaican: "https://flagcdn.com/jm.svg",
  jp: "https://flagcdn.com/jp.svg",
  Japanese: "https://flagcdn.com/jp.svg",
  kn: "https://flagcdn.com/kn.svg",
  Kenyan: "https://flagcdn.com/kn.svg",
  my: "https://flagcdn.com/my.svg",
  Malaysian: "https://flagcdn.com/my.svg",
  mx: "https://flagcdn.com/mx.svg",
  Mexican: "https://flagcdn.com/mx.svg",
  ma: "https://flagcdn.com/ma.svg",
  Moroccan: "https://flagcdn.com/ma.svg",
  pl: "https://flagcdn.com/pl.svg",
  Polish: "https://flagcdn.com/pl.svg",
  pt: "https://flagcdn.com/pt.svg",
  Portuguese: "https://flagcdn.com/pt.svg",
  ru: "https://flagcdn.com/ru.svg",
  Russian: "https://flagcdn.com/ru.svg",
  es: "https://flagcdn.com/es.svg",
  Spanish: "https://flagcdn.com/es.svg",
  th: "https://flagcdn.com/th.svg",
  Thai: "https://flagcdn.com/th.svg",
  tn: "https://flagcdn.com/tn.svg",
  Tunisian: "https://flagcdn.com/tn.svg",
  tr: "https://flagcdn.com/tr.svg",
  Turkish: "https://flagcdn.com/tr.svg",
  un: "https://flagcdn.com/un.svg",
  Unknown: "https://flagcdn.com/un.svg",
  vn: "https://flagcdn.com/vn.svg",
  Vietnamese: "https://flagcdn.com/vn.svg",
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
  flags,
};

export default MealService;
