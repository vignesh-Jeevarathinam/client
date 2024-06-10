import axios from "axios";
import { geoData } from "../types/dishes";

//here we can call an api's

const API_URL = "http://localhost:5600/api";

export const getAllDishes = () => {
  return axios.get(`${API_URL}/dishes`);
};

export const getDishByName = (name: string, geoData: geoData) => {
  console.log(geoData)
  return axios.post(`${API_URL}/dishes/${name}`,{geoData });
};

export const getDishesByIngredients = (ingredients: string[]) => {
  return axios.get(`${API_URL}/dishByIngredient`, {
    params: { ingredients: ingredients.join(",") },
  });
};
