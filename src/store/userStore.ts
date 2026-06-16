import { create } from "zustand";
import { persist } from "zustand/middleware";

type UserStore = {
  username: string;
  setUsername: (username: string) => void;
};

export const useUserStore = create<UserStore>()(
  persist(
    (set) => ({
      username: "",
      setUsername: (username: string) => set({ username: username }),
    }),
    {
      name: "scribble-username",
      partialize: (state) => ({ username: state.username }),
    },
  ),
);
