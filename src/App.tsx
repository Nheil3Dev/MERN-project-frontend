import { BrowserRouter, Link, Route, Routes } from 'react-router-dom'
import './App.css'
import { ROUTES } from './constants/routes.js'
import HomePage from './pages/HomePage'
import KatasDetailPage from './pages/KatasDetailPage.js'
import KatasPage from './pages/KatasPage'
import LoginPage from './pages/LoginPage'
import Page404 from './pages/Page404.js'
import RegisterPage from './pages/RegisterPage'

function App () {
  return (
    <BrowserRouter>
      <nav>
        <ul style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', gap: '10px', padding: 0 }}>
          {
            ROUTES.map(route => (
              <li
                style={{ listStyle: 'none' }}
                key={route.path}>
                <Link to={route.path}>{route.name}</Link>
              </li>
            ))
          }
        </ul>
      </nav>
      <Routes>
        <Route path='/' Component={HomePage} />
        <Route path='/login' Component={LoginPage} />
        <Route path='/register' Component={RegisterPage} />
        <Route path='/katas' Component={KatasPage} />
        <Route path='/katas/:id' Component={KatasDetailPage} />
        <Route path='*' Component={Page404} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
