import { create } from "zustand";

export type BricksState = {
  bricks: number;
  inc: () => void;
  dec: () => void;
};

export const useBricksStore = create<BricksState>((set) => ({
  bricks: 1,
  inc: () => set((state) => ({ bricks: Math.min(6, state.bricks + 1) })),
  dec: () => set((state) => ({ bricks: Math.max(1, state.bricks - 1) })),
}));
