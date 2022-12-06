import axios from 'axios'
import React, { useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
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

import curved7 from "/assets/images/curved-images/curved7.jpg"

export default function NewPasswordPage() {
  const [password, setPassword] = useState(null)
  const [passwordConfirmation, setPasswordConfirmation] = useState(null)
  const [searchParams, setSearchParams] = useSearchParams()
  const [passwordError, setPasswordError] = useState(false)
  const navigate = useNavigate()

  const BASE_URL = import.meta.env.VITE_API_URL
  const token = searchParams.get('reset_token')


  async function newPassword() {
    if (password !== passwordConfirmation) {
      setPasswordError(true)
    } else {
      setPasswordError(false)
      let payload = {
        "user": {
          "password": password,
          "password_confirmation": passwordConfirmation,
          "reset_password_token": token
        }
      }
      try {
        axios.put(`${BASE_URL}users/password`, payload)
      } catch(error) {
        console.error(error)
      }
      navigate('/login')
    }
  }

  if (!token) {
    navigate('/404')
  }

  function handleKeyDown(e) {
    if (e.key === 'Enter') {
      newPassword()
    }
  }

  return (
    <BasicLayout
      title="Changement de mot de passe?"
      description="Choisissez votre nouveau mot de passe pour accéder à votre espace"
      image={curved7}
    >
      <SoftAlert color='error' style={!passwordError ? {display: 'none'} : ''}>Les mots de passe ne correspondent pas</SoftAlert>
      <Card>
        <SoftBox p={3} mb={1} textAlign="center">
          <SoftTypography variant="h5" fontWeight="medium">
            Votre nouveau mot de passe
          </SoftTypography>
        </SoftBox>
        <SoftBox p={3}>
          <SoftBox component="form" role="form">
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
              <SoftButton variant="gradient" color="info" fullWidth onClick={newPassword}>
                Envoyer
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
}
