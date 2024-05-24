import axios from "axios";

//here we can call an api's

const API_URL = "http://localhost:5500/api";

export const getAllDishes = () => {
  return axios.get(`${API_URL}/dishes`);
};

export const getDishByName = (name: string) => {
  return axios.get(`${API_URL}/dishes/${name}`);
};

export const getDishesByIngredients = (ingredients: string[]) => {
  return axios.get(`${API_URL}/dishByIngredient`, {
    params: { ingredients: ingredients.join(",") },
  });
};
