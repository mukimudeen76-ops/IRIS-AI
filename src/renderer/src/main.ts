import './assets/main.css'

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import IndexRoot from './IndexRoot'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <IndexRoot />
  </StrictMode>
)