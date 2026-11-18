import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { WorkoutsProvider } from './context/WorkoutsContext.jsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <WorkoutsProvider>
      <App />
    </WorkoutsProvider>
  </React.StrictMode>
)
