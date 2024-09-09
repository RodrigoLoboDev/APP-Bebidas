import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { RecipeSliceType, createRecipeSlice } from "./recipeSlice";
import { FavoriteSliceType, createFavoriteSlice } from "./favoriteSlice";

// Nuestro hook
export const useAppStore = create<RecipeSliceType & FavoriteSliceType>()(devtools((...a) => ({
    ...createRecipeSlice(...a),
    ...createFavoriteSlice(...a)
})
))