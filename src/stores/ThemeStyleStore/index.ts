import { CUSTOM_THEME_STYLE } from "@/consts";
import { create } from "zustand";

type ThemeStyleState = {
  style?: string;
  setStyle: (str: string) => void;
  resetStyle: () => void;
};

/**
 * Saves the theme locally and defers the setItem to LocalStorage until after the UI repaints
 * @param str Ideally a string containing valid CSS. This will not be validated
 */
const saveThemeStyleLocally = (str?: string) => {
  // current way of trying to defer until after ui updates and main thread are clear
  setTimeout(() => {
    if (!str) {
      localStorage.removeItem(CUSTOM_THEME_STYLE);
      return;
    }
    localStorage.setItem(CUSTOM_THEME_STYLE, str);
  }, 0);
};

/**
 * Tries to get the CSS from LocalStorage
 * @returns A CSS string (ideally) or undefined
 */
export const getThemeStyleFromLocal = () => {
  const localData = localStorage.getItem(CUSTOM_THEME_STYLE);
  if (!localData) return;
  return localData;
};

export const useThemeStyle = create<ThemeStyleState>()((set) => ({
  style: "",
  setStyle: (str) => {
    if (!str) return;

    set((state) => ({ ...state, style: str }));
    saveThemeStyleLocally(str);

    const existingTag = document.getElementById(CUSTOM_THEME_STYLE);
    if (existingTag) {
      existingTag.innerText = str;
      console.log("found existing tag");
      return;
    }
    console.log("did not find existing");
    const newStyleTag = document.createElement("style");
    newStyleTag.id = CUSTOM_THEME_STYLE;
    newStyleTag.innerText = str;
    document.getElementsByTagName("head")[0].appendChild(newStyleTag);
    return;
  },
  resetStyle: () => {
    set((state) => ({ ...state, style: undefined }));
    saveThemeStyleLocally();
    const existingTag = document.getElementById(CUSTOM_THEME_STYLE);
    if (!existingTag) return console.error("no custom theme style tag found!");
    existingTag.innerText = "";
  },
}));
