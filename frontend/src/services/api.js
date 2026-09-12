/**
 * Dedicated API Client Layer
 * 
 * IMPORTANT:
 * All HTTP calls to the Spring Boot REST API will route through this client.
 * Base URL is dynamically retrieved from VITE_API_BASE_URL.
 * JWT authentication token from localStorage is automatically injected.
 * 
 * DO NOT hardcode localhost URLs in individual components!
 */

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:8080/api";

class ApiClient {
  constructor(baseUrl) {
    this.baseUrl = baseUrl;
  }

  getAuthToken() {
    return localStorage.getItem("auth_token");
  }

  getHeaders(customHeaders = {}) {
    const headers = {
      "Content-Type": "application/json",
      ...customHeaders
    };

    const token = this.getAuthToken();
    if (token) {
      headers["Authorization"] = `Bearer ${token}`;
    }

    return headers;
  }

  async request(endpoint, options = {}) {
    const url = `${this.baseUrl}${endpoint.startsWith("/") ? endpoint : `/${endpoint}`}`;
    
    const config = {
      ...options,
      headers: this.getHeaders(options.headers)
    };

    try {
      const response = await fetch(url, config);

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        const error = new Error(errorData.message || `HTTP ${response.status}: ${response.statusText}`);
        error.status = response.status;
        error.data = errorData;
        throw error;
      }

      return await response.json();
    } catch (err) {
      // In development / demo mode when Spring Boot is not running,
      // log descriptive message for future backend integration.
      console.warn(`[API Client Notice] Request to ${url} failed or backend is offline. Using mock service fallback.`, err.message);
      throw err;
    }
  }

  get(endpoint, headers = {}) {
    return this.request(endpoint, { method: "GET", headers });
  }

  post(endpoint, body, headers = {}) {
    return this.request(endpoint, {
      method: "POST",
      body: JSON.stringify(body),
      headers
    });
  }

  put(endpoint, body, headers = {}) {
    return this.request(endpoint, {
      method: "PUT",
      body: JSON.stringify(body),
      headers
    });
  }

  delete(endpoint, headers = {}) {
    return this.request(endpoint, { method: "DELETE", headers });
  }
}

export const api = new ApiClient(API_BASE_URL);
export default api;
