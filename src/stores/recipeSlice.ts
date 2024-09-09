import { StateCreator } from 'zustand'
import { getCategories, getDetailsRecipe, getRecipes } from '../services/RecipeService'
import { Categories, DetailsRecipe, Recipe, Recipes, SearchRecipes } from '../types'

// Type State y Action
export type RecipeSliceType = {
    categories: Categories,
    recipes: Recipes,
    detailsRecipe: DetailsRecipe,
    modal: boolean,
    fetchCategories: () => Promise<void>
    fetchRecipes: (filters : SearchRecipes) => Promise<void>
    fetchDetailsRecipe: (id: Recipe['idDrink']) => Promise<void>
    showModal: () => void
}

export const createRecipeSlice : StateCreator<RecipeSliceType> = (set) => ({
    categories: {
        drinks: []
    },
    recipes: {
        drinks: []
    },
    detailsRecipe: {} as DetailsRecipe,
    modal: false,
    fetchCategories: async () => {
        const categories = await getCategories()
        set({
            categories
        })
    },
    fetchRecipes:async (filters) => {
        const recipes = await getRecipes(filters)
        // console.log(recipes);
        set({
            recipes
        })
    },
    fetchDetailsRecipe:async (id) => {
        const detailsRecipe = await getDetailsRecipe(id)

        set(state => ({
            detailsRecipe,
            modal: !state.modal
        }))
    },
    showModal: () => {
        set(state => ({
            modal: !state.modal,
            detailsRecipe: {} as DetailsRecipe
        }))
    }
})