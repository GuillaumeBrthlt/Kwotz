import { observer } from 'mobx-react-lite'
import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useUserStore } from '../contexts/UserContext'
import DefaultNavbar from '@components/navbars/defaultNavbar'

const Nav = observer(() => {
  const userStore = useUserStore()

  const Logout = () => {
    userStore.logoutUser()
  }

  if (userStore.authenticated) {
    return (
      <DefaultNavbar />
    )
  } 

  if (!userStore.authenticated) {
    return (
      <DefaultNavbar/>
    )
  }
})

export default Nav