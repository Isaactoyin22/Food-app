import axios from "axios";

const API_KEY = "c337ca8843ac4834bbed58d107cda6f2";
const BASE_URL = "https://api.spoonacular.com/recipes";

export const fetchRecipes = async (query = "", number = 6) => {
  try {
    const response = await axios.get(`${BASE_URL}/complexSearch`, {
      params: {
        apiKey: API_KEY,
        query,
        number,
        addRecipeInformation: true,
      },
    });
    return response.data.results;
  } catch (error) {
    console.error("Error fetching recipes:", error);
    return [];
  }
};

export const fetchRecipeById = async (id) => {
  try {
    const response = await axios.get(`${BASE_URL}/${id}/information`, {
      params: {
        apiKey: API_KEY,
        includeNutrition: false,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching recipe by ID:", error);
    return null;
  }
};
