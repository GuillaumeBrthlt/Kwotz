import React from 'react'
import { createSupplierStore } from '../stores/supplierStore'
import { useLocalObservable } from 'mobx-react'

const SupplierContext = React.createContext(null)

export const SupplierProvider = ({children}) => {
  const supplierStore = useLocalObservable(() => new createSupplierStore())

  return (   
    <SupplierContext.Provider value={supplierStore}>
      {children}
    </SupplierContext.Provider>
  )
}

export const useSupplierStore = () => React.useContext(SupplierContext)
