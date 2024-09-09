import { useAppStore } from "../stores/useAppStore"
import { Recipe } from "../types"

type DrinkCardProps = {
    drink: Recipe
}

const DrinkCard = ({drink} : DrinkCardProps) => {

    const fetchDetailsRecipe = useAppStore(state => state.fetchDetailsRecipe)

  return (
    <div className=" bg-white shadow-md rounded-md">
        <div className=" overflow-hidden">
            <img 
                className=" hover:scale-125 transition-all "
                src={drink.strDrinkThumb} 
                alt={`Imagen ${drink.idDrink}`} 
            />
        </div>
        <div className=" p-3 space-y-3">
            <p className=" font-bold text-xl">{drink.strDrink}</p>
            <button
                onClick={() => fetchDetailsRecipe(drink.idDrink)}
                className=" py-2 text-center text-white font-black bg-orange-600 hover:bg-orange-900 transition-all rounded-md w-full"
                type="button"
            >
                Ver Receta
            </button>
        </div>
    </div>
  )
}

export default DrinkCard