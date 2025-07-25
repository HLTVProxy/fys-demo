import axios from "axios";
import type { AxiosRequestConfig } from "axios";
import { toast } from "sonner";

// Create axios instance with default configuration
const axiosInstance = axios.create({
  timeout: 10000, // 10 seconds timeout
  headers: {
    "Content-Type": "application/json",
  },
});

// Cache for request promises to prevent duplicate requests
const requestCache = new Map<string, Promise<unknown>>();
const debounceTimers = new Map<string, NodeJS.Timeout>();

// Helper function to create cache key
function createCacheKey(url: string, config?: AxiosRequestConfig): string {
  return `${url}:${JSON.stringify(config || {})}`;
}

// Helper function to create localStorage throttle key
function getThrottleKey(cacheKey: string): string {
  return `fys_throttle_${btoa(cacheKey).replace(/[^a-zA-Z0-9]/g, "")}`;
}

// Helper function to create localStorage cache key
function getCacheDataKey(cacheKey: string): string {
  return `fys_cache_${btoa(cacheKey).replace(/[^a-zA-Z0-9]/g, "")}`;
}

// Helper function to get throttle timestamp from localStorage
function getThrottleTimestamp(cacheKey: string): number | null {
  try {
    const stored = localStorage.getItem(getThrottleKey(cacheKey));
    return stored ? parseInt(stored, 10) : null;
  } catch {
    // Handle localStorage access errors (e.g., private browsing)
    return null;
  }
}

// Helper function to set throttle timestamp in localStorage
function setThrottleTimestamp(cacheKey: string, timestamp: number): void {
  try {
    localStorage.setItem(getThrottleKey(cacheKey), timestamp.toString());
  } catch {
    // Handle localStorage access errors (e.g., private browsing)
    // Silently fail - throttling will be disabled but app will still work
  }
}

// Helper function to get cached data from localStorage
function getCachedData(cacheKey: string): unknown | null {
  try {
    const stored = localStorage.getItem(getCacheDataKey(cacheKey));
    return stored ? JSON.parse(stored) : null;
  } catch {
    // Handle localStorage access errors or JSON parse errors
    return null;
  }
}

// Helper function to set cached data in localStorage
function setCachedData(cacheKey: string, data: unknown): void {
  try {
    localStorage.setItem(getCacheDataKey(cacheKey), JSON.stringify(data));
  } catch {
    // Handle localStorage access errors or JSON stringify errors
    // Silently fail - caching will be disabled but app will still work
  }
}

/**
 * Enhanced fetcher with debounce, throttle, and request deduplication
 * @param url - The URL to fetch data from
 * @param config - Optional axios request configuration
 * @returns Promise<any> - The response data
 */
const fetcher = async (url: string, config?: AxiosRequestConfig) => {
  const cacheKey = createCacheKey(url, config);
  const now = Date.now();

  // Throttle: Check if we should throttle this request (60 second limit)
  const lastTimestamp = getThrottleTimestamp(cacheKey);
  if (lastTimestamp && now - lastTimestamp < 60000) {
    // Return cached data from localStorage if exists
    const cachedData = getCachedData(cacheKey);
    if (cachedData !== null) {
      return cachedData;
    }

    // Return cached promise if exists
    if (requestCache.has(cacheKey)) {
      return requestCache.get(cacheKey);
    }

    // If no cache available, return null
    return null;
  }

  // Check if there's already a pending request for this URL+config
  if (requestCache.has(cacheKey)) {
    return requestCache.get(cacheKey);
  }

  // Debounce: Clear existing timer and set new one
  const existingTimer = debounceTimers.get(cacheKey);
  if (existingTimer) {
    clearTimeout(existingTimer);
  }

  return new Promise((resolve, reject) => {
    const timer = setTimeout(async () => {
      try {
        // Update throttle timestamp in localStorage
        setThrottleTimestamp(cacheKey, Date.now());

        // Create and cache the request promise
        const requestPromise = (async () => {
          try {
            const response = await axiosInstance.get(url, config);
            return response.data;
          } catch (error) {
            if (axios.isAxiosError(error)) {
              const status = error.response?.status;
              const message = error.response?.data?.message || error.message;
              toast.error(`HTTP error! status: ${status}, message: ${message}`);
              throw new Error(
                `HTTP error! status: ${status}, message: ${message}`,
              );
            }
            toast.error(
              `Network error: ${error instanceof Error ? error.message : "Unknown error"}`,
            );
            throw error;
          }
        })();

        requestCache.set(cacheKey, requestPromise);

        // Execute request
        const result = await requestPromise;

        // Cache the result in localStorage
        setCachedData(cacheKey, result);

        // Clean up
        requestCache.delete(cacheKey);
        debounceTimers.delete(cacheKey);

        resolve(result);
      } catch (error) {
        // Clean up on error
        requestCache.delete(cacheKey);
        debounceTimers.delete(cacheKey);
        reject(error);
      }
    }, 300); // 300ms debounce delay

    debounceTimers.set(cacheKey, timer);
  });
};

export default fetcher;
