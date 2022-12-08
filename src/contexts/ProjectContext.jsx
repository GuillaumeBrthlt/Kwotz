import React from 'react'
import { createProjectStore } from '@stores/projectStore'
import { useLocalObservable } from 'mobx-react'

const ProjectContext = React.createContext(null)

export const ProjectProvider = ({children}) => {
  const projectStore = useLocalObservable(() => new createProjectStore())

  return (   
    <ProjectContext.Provider value={projectStore}>
      {children}
    </ProjectContext.Provider>
  )
}

export const useProjectStore = () => React.useContext(ProjectContext)
