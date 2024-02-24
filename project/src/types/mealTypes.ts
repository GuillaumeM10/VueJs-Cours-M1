export type MealType = {
  idMeal: string;
  strMeal?: string;
  strCategory?: string;
  strArea?: string;
  strInstructions?: string;
  strMealThumb?: string;
  strTags?: string;
  strYoutube?: string;
  strIngredient1?: string;
  strIngredient2?: string;
  strIngredient3?: string;
  strIngredient4?: string;
  strIngredient5?: string;
  strIngredient6?: string;
  strIngredient7?: string;
  strIngredient8?: string;
  strIngredient9?: string;
  strIngredient10?: string;
  strIngredient11?: string;
  strIngredient12?: string;
  strIngredient13?: string;
  strIngredient14?: string;
  strIngredient15?: string;
  strIngredient16?: string;
  strIngredient17?: string;
  strIngredient18?: string;
  strIngredient19?: string;
  strIngredient20?: string;
  strMeasure1?: string;
  strMeasure2?: string;
  strMeasure3?: string;
  strMeasure4?: string;
  strMeasure5?: string;
  strMeasure6?: string;
  strMeasure7?: string;
  strMeasure8?: string;
  strMeasure9?: string;
  strMeasure10?: string;
  strMeasure11?: string;
  strMeasure12?: string;
  strMeasure13?: string;
  strMeasure14?: string;
  strMeasure15?: string;
  strMeasure16?: string;
  strMeasure17?: string;
  strMeasure18?: string;
  strMeasure19?: string;
  strMeasure20?: string;
  strSource?: string;
  dateModified?: string;
};

export type MealsType = MealType[];

export type CategoryType = {
  idCategory?: string;
  strCategory: string;
  strCategoryThumb?: string;
  strCategoryDescription?: string;
};

export type ListCategories = CategoryType[];

export type AreaType = { strArea: string };

export type ListAreas = AreaType[];

export type IngredientType = {
  idIngredient: string;
  strIngredient?: string;
  strDescription?: string;
  strType?: string;
};

export type ListIngredients = IngredientType[];

export type ByFilter = {
  strMeal?: string;
  strMealThumb?: string;
  idMeal?: string;
};

export type Flags = {
  us: string;
  American: string;
  gb: string;
  British: string;
  ca: string;
  Canadian: string;
  cn: string;
  Chinese: string;
  hr: string;
  Croatian: string;
  nl: string;
  Dutch: string;
  eg: string;
  Egyptian: string;
  ph: string;
  Filipino: string;
  fr: string;
  French: string;
  gr: string;
  Greek: string;
  in: string;
  Indian: string;
  ie: string;
  Irish: string;
  it: string;
  Italian: string;
  jm: string;
  Jamaican: string;
  jp: string;
  Japanese: string;
  kn: string;
  Kenyan: string;
  my: string;
  Malaysian: string;
  mx: string;
  Mexican: string;
  ma: string;
  Moroccan: string;
  pl: string;
  Polish: string;
  pt: string;
  Portuguese: string;
  ru: string;
  Russian: string;
  es: string;
  Spanish: string;
  th: string;
  Thai: string;
  tn: string;
  Tunisian: string;
  tr: string;
  Turkish: string;
  un: string;
  Unknown: string;
  vn: string;
  Vietnamese: string;
};
