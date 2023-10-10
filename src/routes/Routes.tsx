import { Route, Routes } from 'react-router-dom'

import HomePage from '../pages/HomePage'
import KataAddPage from '../pages/KataAddPage.js'
import KatasDetailPage from '../pages/KatasDetailPage.js'
import KatasPage from '../pages/KatasPage'
import LoginPage from '../pages/LoginPage'
import Page404 from '../pages/Page404.js'
import RegisterPage from '../pages/RegisterPage'

export function AppRoutes () {
  return (
    <Routes>
      <Route path='/' Component={HomePage} />
      <Route path='/login' Component={LoginPage} />
      <Route path='/register' Component={RegisterPage} />
      <Route path='/katas' Component={KatasPage} />
      <Route path='/katas/:id' Component={KatasDetailPage} />
      <Route path='/katas/add' Component={KataAddPage} />
      <Route path='*' Component={Page404} />
    </Routes>
  )
}
