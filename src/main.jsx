import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import {initBugTrace} from './bugtrace.js'
import './index.css'
import App from './App.jsx'

initBugTrace()

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
