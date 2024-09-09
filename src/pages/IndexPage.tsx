import { useMemo } from 'react'
import DrinkCard from "../components/DrinkCard";
import { useAppStore } from "../stores/useAppStore"
import Modal from '../components/Modal';

const IndexPage = () => {

  const recipes = useAppStore(state => state.recipes)
  const isRecipes = useMemo(() => recipes.drinks.length == 0, [recipes]) 
  

  return (
    <>
      <h1 className=" mb-10 font-black text-6xl">Recetas</h1>

      {isRecipes && <p className=' text-center font-bold text-2xl uppercase'>No Hay recetas aún <span className=' block text-orange-700'>comienza llenando el formulario</span></p>}
      <div className=" grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {recipes.drinks.map( drink => (
          <DrinkCard 
            key={drink.idDrink} 
            drink={drink} 
          />
        ))}
      </div>
      <Modal />
    </>
  )
}

export default IndexPage