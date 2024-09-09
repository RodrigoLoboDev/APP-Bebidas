
import { useMemo } from 'react'
import Modal from "../components/Modal"
import DrinkCard from '../components/DrinkCard'
import { useAppStore } from "../stores/useAppStore"

const FavoritesPage = () => {

  const favorites = useAppStore(state => state.favorites)

  const isEmpty = useMemo(() => favorites.length > 0, [favorites])
  // console.log(isEmpty);
  

  return (
    <>
      <h1 className=" mb-10 font-black text-6xl">Favoritos</h1>

      {!isEmpty && <p className=' text-center font-bold text-2xl uppercase'>No Hay favoritos aún</p>}
      <div className=" grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {favorites.map( drink => (
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

export default FavoritesPage