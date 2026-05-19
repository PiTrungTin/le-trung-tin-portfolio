import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { ErrorBoundary } from './components/ErrorBoundary'
import { LoadingScreen } from './components/ui/LoadingScreen'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ErrorBoundary>
      <LoadingScreen />
      <App />
    </ErrorBoundary>
  </StrictMode>,
)
