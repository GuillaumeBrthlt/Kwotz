import React from 'react'
import ReactDOM from 'react-dom/client'
import {App} from './App'
import { UserProvider } from '@contexts/UserContext'
import { SoftUIControllerProvider } from '@contexts/SoftUIContext'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <SoftUIControllerProvider>
      <UserProvider>
        <App />
      </UserProvider>
    </SoftUIControllerProvider>
  </React.StrictMode>
)
