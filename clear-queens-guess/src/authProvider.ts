import type { AuthProvider } from "@refinedev/core";
import axios from "./config/axios";

export const TOKEN_KEY = "access_token";

/** فقط برای تست UI وقتی بک‌اند در دسترس نیست */
const DEMO_USER = "admin";
const DEMO_PASS = "admin";

export const authProvider: AuthProvider = {
  login: async ({ username, password }) => {
    // حالت دمو: ورود بدون بک‌اند برای چک کردن UI
    if (username === DEMO_USER && password === DEMO_PASS) {
      localStorage.setItem(TOKEN_KEY, "demo-token");
      return { success: true, redirectTo: "/" };
    }

    try {
      const { data } = await axios.post("users/login", {
        username,
        password,
      });
      console.log({ data });
      localStorage.setItem(TOKEN_KEY, data.data);
      return { success: true, redirectTo: "/" };
    } catch (e) {
      return { success: false };
    }
  },
  logout: async () => {
    localStorage.removeItem(TOKEN_KEY);
    return {
      success: true,
      redirectTo: "/login",
    };
  },
  check: async () => {
    const token = localStorage.getItem(TOKEN_KEY);
    if (token) {
      return {
        authenticated: true,
      };
    }

    return {
      authenticated: false,
      redirectTo: "/login",
    };
  },
  getPermissions: async () => null,
  getIdentity: async () => {
    const token = localStorage.getItem(TOKEN_KEY);
    if (token) {
      return {
        id: 1,
        name: "John Doe",
        avatar: "https://i.pravatar.cc/300",
      };
    }
    return null;
  },
  onError: async (error) => {
    console.error(error);
    return { error };
  },
};
