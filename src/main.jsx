import React from 'react'
import ReactDOM from 'react-dom/client'
import {App} from './App'
import { UserProvider } from '@contexts/UserContext'
import { UserProfileProvider } from '@contexts/UserProfileContext'
import { ProjectProvider } from '@contexts/ProjectContext'
import { SoftUIControllerProvider } from '@contexts/SoftUIContext'
import { ColdRoomProvider } from './contexts/ColdRoomContext'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <SoftUIControllerProvider>
      <UserProvider>
        <UserProfileProvider>
          <ProjectProvider>
            <ColdRoomProvider>
              <App />
            </ColdRoomProvider>
          </ProjectProvider>
        </UserProfileProvider>
      </UserProvider>
    </SoftUIControllerProvider>
  </React.StrictMode>
)
