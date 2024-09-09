import { useEffect } from 'react'
import { Outlet } from 'react-router-dom'
import Header from '../components/Header'
import { useAppStore } from '../stores/useAppStore'

import { ToastContainer } from 'react-toastify'
// La hoja de stylos css
import "react-toastify/dist/ReactToastify.css"

const LayoutDrink = () => {

  const getLocalStorage = useAppStore(state => state.getLocalStorage)

  useEffect(() => {
    getLocalStorage()
  }, [])
  

  return (
    <>
        <Header />
        
        <main className=' container mx-auto w-[85%] my-10'>
          <Outlet />
        </main>

        <ToastContainer />
    </>
  )
}

export default LayoutDrink