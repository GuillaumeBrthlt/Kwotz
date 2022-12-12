import React from 'react'
import ReactDOM from 'react-dom/client'
import {App} from './App'
import { UserProvider } from '@contexts/UserContext'
import { UserProfileProvider } from '@contexts/UserProfileContext'
import { ProjectProvider } from '@contexts/ProjectContext'
import { SoftUIControllerProvider } from '@contexts/SoftUIContext'
import { ColdRoomProvider } from '@contexts/ColdRoomContext'
import { SupplierProvider } from '@contexts/SupplierContext'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <UserProvider>
      <UserProfileProvider>
        <ProjectProvider>
          <ColdRoomProvider>
            <SupplierProvider>
              <SoftUIControllerProvider>
                <App />
              </SoftUIControllerProvider>
            </SupplierProvider>
          </ColdRoomProvider>
        </ProjectProvider>
      </UserProfileProvider>
    </UserProvider>
  </React.StrictMode>
)
