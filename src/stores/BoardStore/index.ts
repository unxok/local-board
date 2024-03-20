import { BOARD, BOARD_AVAILABLE_ID } from "@/consts";
import { create } from "zustand";
import { z } from "zod";
import { toast } from "sonner";

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
    callback: (data: BoardSchema[] | undefined) => BoardSchema[] | undefined,
  ) => void;
  saveBoardsLocally: (data?: BoardSchema[]) => void;
  resetBoards: () => void;
  nextBoardId: number;
  incrementNextAvailableId: (specific?: number) => void;
};

/**
 * Saves the value as a JSON stringified string and defers the setItem to `localStorage` until after the UI repaints
 * @param key The key of the item to update in `localStorage`
 * @param value Can be any type but if `null` or `undefined` the item will be <u>removed</u> form `localStorage` entirely
 * ```ts
 * // example
 * deferredLocalStorage<number>('myKey', 254);
 * ```
 */
export const deferredLocalStorage = <T>(key: string, value: T) => {
  setTimeout(() => {
    if (value == null || value === undefined) {
      localStorage.removeItem(key);
      return;
    }
    const str = JSON.stringify(value);
    localStorage.setItem(key, str);
  }, 0);
};

export const getBoardFromLocal = () => {
  const localData = localStorage.getItem(BOARD);
  if (!localData) return;
  try {
    return JSON.parse(localData) as BoardSchema[];
  } catch (e) {
    console.error(
      "Something went wrong when attempting to parse string to JSON :( --> ",
      e,
    );
  }
};

export const getNextBoardIdFromLocal = () => {
  const localData = localStorage.getItem(BOARD_AVAILABLE_ID);
  if (!localData) return;
  try {
    return JSON.parse(localData) as number;
  } catch (e) {
    console.error(
      "Something went wrong when attempting to parse string to JSON :( --> ",
      e,
    );
  }
};

export const useBoard = create<BoardState>()((set, get) => ({
  boards: undefined,
  addBoards: (obj) =>
    set((state) => {
      const arr = state.boards ? state.boards : [];
      const newState = {
        ...state,
        boards: [...arr, { ...obj, id: state.nextBoardId }],
      };
      state.incrementNextAvailableId();
      // saveBoardLocally(JSON.stringify(newState.boards));
      return newState;
    }),
  setBoards: (callback) => {
    set((state) => {
      const newData = callback(state.boards);
      return {
        state,
        boards: newData,
      };
    });
  },
  /**
   * Defers until main thread is clear
   */
  saveBoardsLocally: (data) => {
    toast.success("Changes saved locally");
    if (data) {
      deferredLocalStorage(BOARD, data);
      deferredLocalStorage(BOARD_AVAILABLE_ID, data.length + 1);
      return;
    }
    const { boards, nextBoardId } = get();
    deferredLocalStorage(BOARD, boards);
    deferredLocalStorage(BOARD_AVAILABLE_ID, nextBoardId + 1);
  },
  resetBoards: () => {},
  nextBoardId: 0,
  incrementNextAvailableId: (specific) =>
    set((state) => ({
      ...state,
      nextBoardId: specific !== undefined ? specific : state.nextBoardId + 1,
    })),
}));
