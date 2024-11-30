import axios from "axios";

import { API_URL, API_PREFIX, MODE } from "../constants";

export const axiosInstance = axios.create({
  baseURL: MODE === "development" ? API_URL : API_PREFIX,
  withCredentials: true,
});
