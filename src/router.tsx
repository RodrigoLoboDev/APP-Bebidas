import { Suspense, lazy } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import LayoutDrink from './layouts/LayoutDrink'

// import IndexPage from './pages/IndexPage'
// import FavoritesPage from './pages/FavoritesPage'

const IndexPage = lazy(() => import('./pages/IndexPage'))
const FavoritesPage = lazy(() => import('./pages/FavoritesPage'))

const RouterApp = () => {
  return (
    <BrowserRouter>
        <Routes>
            <Route element={<LayoutDrink />}>
                <Route index path='/' element={
                  <Suspense fallback={'cargando...'}>
                    <IndexPage />
                  </Suspense>
                } />
                <Route path='/favoritos' element={
                  <Suspense fallback={'cargando...'}>
                    <FavoritesPage />
                  </Suspense>
                } />
            </Route>
        </Routes>
    </BrowserRouter>
  )
}

export default RouterApp