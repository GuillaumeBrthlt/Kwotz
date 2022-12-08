import React from 'react'
import ReactDOM from 'react-dom/client'
import {App} from './App'
import { UserProvider } from '@contexts/UserContext'
import { UserProfileProvider } from '@contexts/UserProfileContext'
import { ProjectProvider } from '@contexts/ProjectContext'
import { SoftUIControllerProvider } from '@contexts/SoftUIContext'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <SoftUIControllerProvider>
      <UserProvider>
        <UserProfileProvider>
          <ProjectProvider>
            <App />
          </ProjectProvider>
        </UserProfileProvider>
      </UserProvider>
    </SoftUIControllerProvider>
  </React.StrictMode>
)
