import { observer } from 'mobx-react-lite'
import React, { useEffect } from 'react'
import { useUserStore } from '../contexts/UserContext'
import DefaultNavbar from '@components/navbars/defaultNavbar'
import Sidenav from '@components/navbars/Sidenav'

const Nav = observer(() => {
  const userStore = useUserStore()

  if (userStore.loading) {
    return (
      <></>
    )
  }

  if (userStore.authenticated) {
   return (
    <Sidenav />
   )
  } 

  if (!userStore.authenticated) {
    return (
      <DefaultNavbar/>
    )
  }
})

export default Nav