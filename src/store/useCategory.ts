import { create } from "zustand";

export type Category = "Photography" | "Architecture" | "Cyber-Physical";

type State = {
  // category mode
  category: Category;
  list: Category[];
  setCategory: (c: Category) => void;
  next: () => void;
  prev: () => void;

  // home mode
  showHome: boolean;
  setHome: (show: boolean) => void;
};

const order: Category[] = ["Photography", "Architecture", "Cyber-Physical"];

export const useCategory = create<State>((set, get) => ({
  category: "Photography",
  list: order,

  // start on Home intro
  showHome: true,
  setHome: (show) => set({ showHome: show }),

  setCategory: (c) => set({ category: c, showHome: false }),
  next: () => {
    const i = order.indexOf(get().category);
    set({ category: order[(i + 1) % order.length], showHome: false });
  },
  prev: () => {
    const i = order.indexOf(get().category);
    set({ category: order[(i - 1 + order.length) % order.length], showHome: false });
  },
}));
