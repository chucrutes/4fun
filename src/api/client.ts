import { ENVS } from "../constants/env";
import axios, { AxiosError, type AxiosResponse } from "axios";

export type ApiResponse<Payload> =
  | {
      success: true;
      statusCode: number;
      data: Payload;
    }
  | {
      success: false;
      statusCode?: number;
      error: any;
    };

export const apiClient = axios.create({
  baseURL: ENVS.API_BASE_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

export async function handleRequest<T>(
  req: Promise<AxiosResponse<{ [key: string]: any }>>,
): Promise<ApiResponse<T>> {
  try {
    const response = await req;
    return {
      success: true,
      statusCode: response.status,
      data: response.data as T,
    };
  } catch (error) {
    if (error instanceof AxiosError) {
      return {
        success: false,
        error: error,
        statusCode: error.response?.status,
      };
    }
    return {
      success: false,
      error: error,
      statusCode: 500,
    };
  }
}
