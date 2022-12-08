import React from 'react'
import { createColdRoomStore } from '@stores/coldRoomStore'
import { useLocalObservable } from 'mobx-react'

const ColdRoomContext = React.createContext(null)

export const ColdRoomProvider = ({children}) => {
  const coldRoomStore = useLocalObservable(() => new createColdRoomStore())

  return (   
    <ColdRoomContext.Provider value={coldRoomStore}>
      {children}
    </ColdRoomContext.Provider>
  )
}

export const useColdRoomStore = () => React.useContext(ColdRoomContext)
