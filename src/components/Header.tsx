import { useMemo, useEffect, useState } from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import { useAppStore } from '../stores/useAppStore'
import { toast } from 'react-toastify'


const Header = () => {

    const [searchFilter, setSearchFilter] = useState({
      ingredient: '',
      category: ''
    })

    const {pathname} = useLocation()
    // console.log(location.pathname);
    
    const isHome = useMemo(() => pathname == '/', [pathname])

    const fetchCategories = useAppStore(state => state.fetchCategories)
    const categories = useAppStore(state => state.categories)
    const fetchRecipes = useAppStore(state => state.fetchRecipes)
    

    useEffect(() => {
      fetchCategories()
    }, [])

    const handleChange = (e : React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement>) => {

      setSearchFilter({
        ...searchFilter,
        [e.target.name]: e.target.value
      })
    }

    const handleSubmit = (e : React.FormEvent<HTMLFormElement>) => {
      e.preventDefault()

      if (Object.values(searchFilter).includes('')) {
        console.log('Todos los campos son Obligatorios');
        return
      }

      fetchRecipes(searchFilter)

      setSearchFilter({
        ingredient: '',
        category: ''
      })

      toast.success('Buscando')
    }


  return (
    <header className={` ${isHome ? 'bg-header bg-cover bg-center bg-no-repeat h-[35rem] ' : 'bg-slate-800'} `}>
          <div className=' container mx-auto w-[90%] py-10 h-full'>
            <div className=' flex flex-col justify-between h-full'>
              {/* BARRA */}
              <div className=' flex flex-col gap-10 md:flex-row justify-between items-center'>
                <div className=' w-32'>
                  <img src="/logo.svg" alt="imagen logo" />
                </div>
                <nav className=' flex gap-5'>
                  <NavLink 
                    className={({isActive}) => isActive ? 'font-bold text-orange-500 uppercase' : 'font-bold text-white uppercase'} 
                    to={'/'} 
                    >Inicio</NavLink>
                  <NavLink 
                    className={({isActive}) => isActive ? 'font-bold text-orange-500 uppercase' : 'font-bold text-white uppercase'}
                    to={'/favoritos'} 
                  >Favoritos</NavLink>
                </nav>
              </div>

              {/* FORMULARIO */}
              {isHome && (
                <form 
                  onSubmit={handleSubmit}
                  className=' bg-white rounded-md shadow-md py-10 px-5 space-y-3 md:w-1/2 lg:w-1/3'
                >
                    <div className=' space-y-2'>
                    <label
                        className=' uppercase text-gray-600 font-bold'
                        htmlFor="ingredient"
                    >Nombre o Ingredientes:</label>
                    <input
                        className=' py-2 px-3 border block w-full rounded-md'
                        placeholder='Ingresa los ingredienes'
                        id='ingredient' 
                        name='ingredient'
                        type="text" 
                        value={searchFilter.ingredient}
                        onChange={handleChange}
                    />
                    </div>

                    <div className=' space-y-2'>
                    <label
                        className=' uppercase text-gray-600 font-bold'
                        htmlFor="category"
                    >Categoria:</label>
                    <select 
                        className='py-2 px-3 border block w-full rounded-md'
                        id="category"
                        name='category'
                        value={searchFilter.category}
                        onChange={handleChange}
                    >
                        <option value="">--Seleccione una categoria--</option>
                        {categories.drinks.map( category => (
                          <option key={category.strCategory} value={category.strCategory}>{category.strCategory}</option>
                        ))}
                    </select>
                    </div>

                    <input
                    className=' py-2 bg-orange-400 hover:bg-orange-700 cursor-pointer text-center uppercase text-white font-black rounded-md w-full transition-all'
                    value={'Buscar'}
                    type="submit" 
                    />
                </form>
              )}
              
            </div>
            
          </div>
          
        </header>
  )
}

export default Header