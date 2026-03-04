import axios, { AxiosError } from 'axios';
import { Item } from '../types';

const API_BASE_URL = 'http://localhost:8080';
const REQUEST_TIMEOUT = 10000; // 10 seconds

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: REQUEST_TIMEOUT,
});

/**
 * Normalize API errors into structured Error objects
 * Handles network errors, timeouts, and HTTP errors
 */
const normalizeError = (error: unknown): Error => {
  if (axios.isAxiosError(error)) {
    const axiosError = error as AxiosError;

    // Handle timeout
    if (axiosError.code === 'ECONNABORTED') {
      return new Error(`Request timeout after ${REQUEST_TIMEOUT}ms. Server may be unreachable.`);
    }

    // Handle network errors
    if (axiosError.code === 'ECONNREFUSED' || axiosError.code === 'ENOTFOUND') {
      return new Error(`Failed to connect to API at ${API_BASE_URL}. Please ensure the backend is running.`);
    }

    // Handle HTTP error responses
    if (axiosError.response) {
      const status = axiosError.response.status;
      const message = axiosError.response.data?.message || axiosError.response.statusText || 'Unknown error';
      return new Error(`API Error (${status}): ${message}`);
    }

    // Handle other request errors
    if (axiosError.request && !axiosError.response) {
      return new Error('No response from server. Please check your network connection.');
    }
  }

  // Handle non-Axios errors
  if (error instanceof Error) {
    return error;
  }

  return new Error(`Unknown error: ${String(error)}`);
};

export const itemsAPI = {
  getItems: async (): Promise<Item[]> => {
    try {
      const response = await apiClient.get<Item[]>('/items');
      return response.data;
    } catch (error) {
      const normalizedError = normalizeError(error);
      console.error('Error fetching items:', normalizedError.message);
      throw normalizedError;
    }
  },

  getItemImage: (itemGuid: string): string => {
    return `${API_BASE_URL}/image/${itemGuid}`;
  },
};
