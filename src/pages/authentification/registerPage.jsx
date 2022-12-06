import { observer } from 'mobx-react-lite'
import React from 'react'
import { useState } from 'react'
import { useUserStore } from '@contexts/UserContext'
import { Link } from 'react-router-dom'
import { Card } from '@mui/material'

// Soft UI Dashboard PRO React components
import SoftBox from "@components/SoftBox";
import SoftTypography from "@components/SoftTypography";
import SoftInput from "@components/SoftInput";
import SoftButton from "@components/SoftButton";
import SoftAlert from '@components/SoftAlert'

// Authentication layout components
import BasicLayout from "@pages/authentification/components/BasicLayout";
import Separator from "@pages/authentification/components/Separator";

import curved8 from "/assets/images/curved-images/curved8.jpg"

export const RegisterPage = observer(() => {
  const [email, setEmail] = useState(null)
  const [password, setPassword] = useState(null)
  const [passwordConfirmation, setPasswordConfirmation] = useState(null)
  const userStore = useUserStore()
  const [passwordError, setPasswordError] = useState(false)
  
  function handleRegister () {
    if (password === passwordConfirmation) {
      setPasswordError(false)
      const registerData = {
        "user": {
          "email": email,
          "password": password,
          "password_confirmation": passwordConfirmation
        }
      };
      userStore.register(registerData)
    } else {
      setPasswordError(true)
    }
  }

  function handleKeyDown(e) {
    if (e.key === 'Enter') {
      handleRegister()
    }
  }

  return (
    <BasicLayout
      title="Commençons!"
      description="Choisissez vos identifiants de connexion pour créer à votre nouvel espace dédié"
      image={curved8}
    >
      <SoftAlert color='error' style={!userStore.hasErrors ? {display: 'none'} : ''}>Identifiants incorrects</SoftAlert>
      <SoftAlert color='error' style={!passwordError ? {display: 'none'} : ''}>Les mots de passe ne correspondent pas</SoftAlert>
      <Card>
        <SoftBox p={3} mb={1} textAlign="center">
          <SoftTypography variant="h5" fontWeight="medium">
            Se connecter
          </SoftTypography>
        </SoftBox>
        <SoftBox p={3}>
          <SoftBox component="form" role="form">
            <SoftBox mb={2}>
              <SoftInput 
                type="email" 
                placeholder="Email" 
                onChange={e => setEmail(e.target.value)}
                onKeyDown={handleKeyDown}
              />
            </SoftBox>
            <SoftBox mb={2}>
              <SoftInput 
                type="password" 
                placeholder="mot de passe" 
                onChange={e => setPassword(e.target.value)}
                error={passwordError ? true : false}
                onKeyDown={handleKeyDown}
              />
            </SoftBox>
            <SoftBox mb={2}>
              <SoftInput 
                type="password" 
                placeholder="confirmation du mot de passe" 
                onChange={e => setPasswordConfirmation(e.target.value)}
                error={passwordError ? true : false}
                onKeyDown={handleKeyDown}
              />
            </SoftBox>
            <SoftBox mt={4} mb={1}>
              <SoftButton variant="gradient" color="info" fullWidth onClick={handleRegister}>
                S'inscrire
              </SoftButton>
            </SoftBox>
            <Separator />
            <SoftBox mt={1} mb={3}>
              <SoftButton
                component={Link}
                to="/login"
                variant="gradient"
                color="dark"
                fullWidth
              >
                se connecter
              </SoftButton>
            </SoftBox>
          </SoftBox>
        </SoftBox>
      </Card>
    </BasicLayout>
  );
})
