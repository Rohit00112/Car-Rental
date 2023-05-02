import axios from "axios";

const API_URL = "https://localhost:5001/api";
export const API_URL_Image = "https://localhost:5001";

export const apiInstance = axios.create({
  baseURL: API_URL,
});
