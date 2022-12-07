import React from 'react'
import { createSupplierStore } from '../stores/supplierStore'
import { useLocalObservable } from 'mobx-react'

const SupplierContext = React.createContext(null)

export const SupplierProvider = ({children}) => {
  const SupplierStore = useLocalObservable(() => new createUserStore())

  return (   
      <SupplierContext.Provider value={SupplierStore}>
        {children}
      </SupplierContext.Provider>

  )
}

export const useSupplierStore = () => React.useContext(SupplierContext)
