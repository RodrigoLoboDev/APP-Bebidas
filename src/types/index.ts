import { z } from 'zod'
import { CategoriesSchema, DetailsRecipeSchema, RecipeSchema, RecipesSchema, SearchRecipesSchema } from '../schemas/recipes-schemas'

export type Categories = z.infer<typeof CategoriesSchema>
export type SearchRecipes = z.infer<typeof SearchRecipesSchema>
export type Recipe = z.infer<typeof RecipeSchema>
export type Recipes = z.infer<typeof RecipesSchema>
export type DetailsRecipe = z.infer<typeof DetailsRecipeSchema>