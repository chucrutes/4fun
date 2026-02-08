import type { Result } from "@/auth/auth.types";
import { ENVS } from "../constants/env";
import axios, { AxiosError, type AxiosResponse } from "axios";

export const apiClient = axios.create({
  baseURL: `${ENVS.API_BASE_URL}/api/v1`,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

export async function handleRequest<T>(
  req: Promise<AxiosResponse<{ [key: string]: any }>>,
): Promise<Result<T>> {
  try {
    const response = await req;
    return {
      success: true,

      data: response.data as T,
    };
  } catch (error) {
    if (error instanceof AxiosError) {
      return {
        success: false,
        error: error,
      };
    }
    return {
      success: false,
      error: error,
    };
  }
}
