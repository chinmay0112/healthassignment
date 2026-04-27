import { create } from "zustand";
import type { User } from "firebase/auth";

interface AuthState {
  user: User | null;
  loading: boolean;
  setUser: (user: User | null) => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  loading: true, // App starts by checking session
  setUser: (user) => set({ user, loading: false }),
}));
