import { BrowserRouter as Router } from 'react-router-dom'
import './App.css'
import { StickyFooter } from './components/dashboard/StickyFooter.js'
import { AppRoutes } from './routes/Routes.js'

function App () {
  return (
    <Router>
      <AppRoutes />
      <StickyFooter />
    </Router>
  )
}

export default App
