import { StateCreator } from 'zustand'
import type { DetailsRecipe } from '../types'

import { toast } from 'react-toastify'


export type FavoriteSliceType = {
    favorites: DetailsRecipe[]
    actionItem: (item : DetailsRecipe) => void
    getLocalStorage: () => void
}

export const createFavoriteSlice : StateCreator<FavoriteSliceType> = (set, get) => ({
    favorites: [],
    actionItem: (item) => {

        const existItem = get().favorites.find( stateItem => stateItem.idDrink === item.idDrink)
        
        if (!existItem) { // si no existe
            // agregar a favoritos
            set((state) => ({
                favorites: [...state.favorites, item]
            }))
            toast.success('Agregado a Favortitos Correctamente')
        } else { // si existe
            // eliminar de los favoritos
            set((state) => ({
                favorites: state.favorites.filter( stateItem => stateItem.idDrink !== item.idDrink)
            }))
            toast.error('Eliminado de Favortitos Correctamente')
        }
        localStorage.setItem('favorites-storage', JSON.stringify(get().favorites))
    },
    getLocalStorage: () => {
        const favoritesStorage = localStorage.getItem('favorites-storage')

        if (favoritesStorage) {
            set({
                favorites: JSON.parse( favoritesStorage )
            })
        }
    }
})