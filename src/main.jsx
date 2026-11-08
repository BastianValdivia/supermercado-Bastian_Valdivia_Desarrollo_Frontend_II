import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import '@fontsource-variable/montserrat'
import './index.css'
import App from './App.jsx'
import { InventarioProvider } from './context/InventarioProvider.jsx'
import { SesionProvider } from './context/SesionProvider.jsx'
import { PersonalizacionProvider } from './context/PersonalizacionProvider.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <PersonalizacionProvider>
        <SesionProvider>
          <InventarioProvider>
            <App />
          </InventarioProvider>
        </SesionProvider>
      </PersonalizacionProvider>
    </BrowserRouter>
  </StrictMode>,
)
