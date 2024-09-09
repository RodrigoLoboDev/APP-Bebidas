import { useMemo } from 'react'
import { useAppStore } from "../stores/useAppStore"
import { DetailsRecipe } from "../types";

const DetailsRecipes = () => {

    const details = useAppStore(state => state.detailsRecipe)
    const showModal = useAppStore(state => state.showModal)
    const actionItem = useAppStore(state => state.actionItem)
    const favorites = useAppStore(state => state.favorites)
    

    const removeNullValues = (detail : DetailsRecipe) => {
        const filterNotNull = Object.fromEntries(Object.entries(detail).filter(([, value]) => value !== null && value !== ''))

        const ingredients = [];
        const measures = [];

        for (let i = 1; i <= 15; i++) {
            if (filterNotNull[`strIngredient${i}`]) {
              ingredients.push(filterNotNull[`strIngredient${i}`]);
              measures.push(filterNotNull[`strMeasure${i}`]);
            }
        }

        return {
            ingredients,
            measures
        }
    }

    const filterDetail = useMemo(() => removeNullValues(details), [details])   
    const isExist = useMemo(() => favorites.some( stateItem => stateItem.idDrink === details.idDrink), [favorites])
    

  return (
    <div className=" space-y-3">
        <h3 className=" text-center font-bold text-2xl uppercase">
            {details.strDrink}
        </h3>
        <div className=" w-[15rem] mx-auto">
            <img src={details.strDrinkThumb} alt={`imagen ${details.idDrink}`} />
        </div>
        <div className=" space-y-2">
            <h3 className=" uppercase text-gray-700 font-black">Ingredientes:</h3>
            <ol>
                {filterDetail.ingredients.map((ingredient, index) => (
                    <li 
                        key={index}
                        className=' font-bold'
                    >{ingredient} {'-'} <span className=' font-normal'>{filterDetail.measures[index]}</span></li>
                ))}
            </ol>
        </div>
        <div className=" space-y-2">
            <h3 className=" uppercase text-gray-700 font-black">Instrucciones:</h3>
            <p>{details.strInstructions}</p>
        </div>

        <div className=' flex flex-col md:flex-row justify-between items-center gap-4 md:gap-10'>
            <button
                onClick={() => showModal()}
                className=' text-white uppercase font-bold text-center py-2 w-full rounded-md bg-gray-600 hover:bg-gray-800 transition-all'
                type='button'
            >Cerrar
            </button>
            <button
                onClick={() => {
                    actionItem(details)
                    showModal()
                }}
                className=' text-white uppercase font-bold text-center py-2 w-full rounded-md bg-orange-600 hover:bg-orange-800 transition-all'
                type='button'
            >{isExist ? 'Eliminar Favorito' : 'Agregar a Favoritos'}
            </button>
        </div>
    </div>
  )
}

export default DetailsRecipes