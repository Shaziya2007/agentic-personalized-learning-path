/**
 * Authentication Service
 * Communicates with Spring Boot Spring Security / JWT endpoints.
 * Placeholder endpoints defined according to standard REST practice.
 */
import { INITIAL_LEARNER_PROFILE } from "../data/mockData";

export const authService = {
  /**
   * Log in user with email & password
   * Target endpoint: POST /api/auth/login
   */
  async login(email) {
    // Future Spring Boot endpoint:
    // const response = await api.post("/auth/login", { email, password });
    // localStorage.setItem("auth_token", response.token);
    // return response.user;
    
    // Frontend Demo Fallback:
    await new Promise((r) => setTimeout(r, 400));
    const mockUser = {
      ...INITIAL_LEARNER_PROFILE,
      email: email || INITIAL_LEARNER_PROFILE.email
    };
    localStorage.setItem("auth_token", "mock_jwt_token_header.payload.signature");
    localStorage.setItem("user_profile", JSON.stringify(mockUser));
    return mockUser;
  },

  /**
   * Register a new student account
   * Target endpoint: POST /api/auth/register
   */
  async register(userData) {
    // Future Spring Boot endpoint:
    // return await api.post("/auth/register", userData);

    // Frontend Demo Fallback:
    await new Promise((r) => setTimeout(r, 400));
    const newUser = {
      ...INITIAL_LEARNER_PROFILE,
      name: userData.name,
      email: userData.email
    };
    localStorage.setItem("auth_token", "mock_jwt_token_header.payload.signature");
    localStorage.setItem("user_profile", JSON.stringify(newUser));
    return newUser;
  },

  /**
   * Log out user & purge tokens
   */
  logout() {
    localStorage.removeItem("auth_token");
    localStorage.removeItem("user_profile");
  },

  /**
   * Get current authenticated user profile
   * Target endpoint: GET /api/auth/me or GET /api/users/profile
   */
  getCurrentUser() {
    const saved = localStorage.getItem("user_profile");
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        return INITIAL_LEARNER_PROFILE;
      }
    }
    return INITIAL_LEARNER_PROFILE;
  },

  /**
   * Update student profile preferences
   * Target endpoint: PUT /api/users/profile
   */
  async updateProfile(profileData) {
    // Future Spring Boot endpoint:
    // return await api.put("/users/profile", profileData);

    // Frontend Demo Fallback:
    await new Promise((r) => setTimeout(r, 300));
    const current = this.getCurrentUser();
    const updated = { ...current, ...profileData };
    localStorage.setItem("user_profile", JSON.stringify(updated));
    return updated;
  }
};

export default authService;
