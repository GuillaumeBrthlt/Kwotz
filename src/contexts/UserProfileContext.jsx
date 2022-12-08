import React from 'react'
import { createUserProfileStore } from '@stores/userProfileStore'
import { useLocalObservable } from 'mobx-react'

const UserProfileContext = React.createContext(null)

export const UserProfileProvider = ({children}) => {
  const userProfileStore = useLocalObservable(() => new createUserProfileStore())

  return (   
      <UserProfileContext.Provider value={userProfileStore}>
        {children}
      </UserProfileContext.Provider>
  )
}

export const useUserProfileStore = () => React.useContext(UserProfileContext)
