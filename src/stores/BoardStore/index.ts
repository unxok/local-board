import { BOARD } from "@/consts";
import { create } from "zustand";
import { z } from "zod";

export const boardSchema = z.object({
  id: z.number(),
  title: z.string().optional(),
  description: z.string().optional(),
  notes: z.string().optional(),
});

export type BoardSchema = z.infer<typeof boardSchema>;

export type BoardState = {
  boards?: BoardSchema[];
  addBoards: (obj: Omit<BoardSchema, "id">) => void;
  setBoards: (
    partial:
      | BoardState
      | Partial<BoardState>
      | ((state: BoardState) => BoardState | Partial<BoardState>),
    replace?: boolean | undefined,
  ) => void;
  resetBoards: () => void;
  nextAvailableId: number;
  incrementNextAvailableId: () => void;
};

/**
 * Saves the board locally and defers the setItem to LocalStorage until after the UI repaints
 * @param str Ideally a string containing a BoardScheme array. This is not validated.
 */
const saveBoardLocally = (str?: string) => {
  // current way of trying to defer until after ui updates and main thread are clear
  setTimeout(() => {
    if (!str) {
      localStorage.removeItem(BOARD);
      return;
    }
    localStorage.setItem(BOARD, str);
  }, 0);
};

/**
 * Tries to get the CSS from LocalStorage
 * @returns A CSS string (ideally) or undefined
 */
export const getBoardFromLocal = () => {
  const localData = localStorage.getItem(BOARD);
  if (!localData) return;
  return localData;
};

export const useBoard = create<BoardState>()((set) => ({
  boards: undefined,
  addBoards: (obj) =>
    set((state) => {
      const arr = state.boards ? state.boards : [];
      const newState = {
        ...state,
        boards: [...arr, { ...obj, id: state.nextAvailableId }],
      };
      state.incrementNextAvailableId();
      saveBoardLocally(JSON.stringify(newState.boards));
      return newState;
    }),
  setBoards: set,
  resetBoards: () => {},
  nextAvailableId: 0,
  incrementNextAvailableId: () =>
    set((state) => ({ ...state, nextAvailableId: state.nextAvailableId + 1 })),
}));
