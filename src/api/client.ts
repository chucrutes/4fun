import axios from "axios";
import { ENVS } from "../constants/env";

export const apiClient = axios.create({
  baseURL: ENVS.API_BASE_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});
