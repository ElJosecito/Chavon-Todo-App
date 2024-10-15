import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import Router from './Router/Router'
import './index.css'

// router setup
import { BrowserRouter } from 'react-router-dom'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Router />
    </BrowserRouter>
  </StrictMode>,
)
