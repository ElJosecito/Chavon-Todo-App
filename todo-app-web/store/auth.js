import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useAuthStore = create(persist(
    (set) => ({
        token: null,
        user: null,
        userId: null,
        isAuth: false,
        setToken: (token) => set({ token, isAuth: true }),
        setUser: (user) => set({ user }),
        setUserId: (userId) => set({ userId }),
        logout: () => set({ token: null, userId: null, isAuth: false }),
    }), {
    name: "auth-storage",
}
));

