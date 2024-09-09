// Para tener nuestras acciones que se comunican con una API
import axios from "axios"
import { CategoriesSchema, DetailsRecipeSchema, RecipesSchema } from "../schemas/recipes-schemas"
import { Recipe, SearchRecipes } from "../types"


export async function getCategories () {
    try {
        const url = 'https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list'
        const {data} = await axios(url)
        const result = CategoriesSchema.safeParse(data)
        if (result.success) {
            return result.data
        }        
    } catch (error) {
        console.log(error);
    }
}

export async function getRecipes (filters : SearchRecipes) {
    try {
        const url = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${filters.ingredient}&c=${filters.category}`
        const {data} = await axios(url)
        const result = RecipesSchema.safeParse(data)
        
        if (result.success) {
            return result.data
        }        
    } catch (error) {
        console.log(error);
    }
}

export async function getDetailsRecipe (id: Recipe['idDrink']) {
    try {
        const url = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`
        const {data} = await axios(url)
        const result = DetailsRecipeSchema.safeParse(data.drinks[0])

        if (result.success) {
            return result.data
        }
        
    } catch (error) {
        console.log(error);
        
    }
}