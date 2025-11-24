import { create } from "zustand";

export const useUserStore = create((set) => ({
  user: {},
  addUser: (data) => set(() => ({ user: data })),
  deleteUser: () => set(() => ({ user: {} })),
}));
