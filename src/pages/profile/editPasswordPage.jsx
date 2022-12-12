import axios from 'axios'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Card } from '@mui/material'
import Grid from "@mui/material/Grid";
import { useUserStore } from '@contexts/UserContext'
import DashboardNavbar from '@components/navbars/DashboardNavbar';
import DashboardLayout from "@components/LayoutContainers/DashboardLayout";
import Footer from "@components/Footer";

// Soft UI Dashboard PRO React components
import SoftBox from "@components/SoftBox";
import SoftTypography from "@components/SoftTypography";
import SoftInput from "@components/SoftInput";
import SoftButton from "@components/SoftButton";
import SoftAlert from '@components/SoftAlert'

// Authentication layout components
import Separator from "@pages/authentification/components/Separator";
import Sidenav from "@components/navbars/Sidenav";


export function EditPasswordPage() {
  const userStore = useUserStore()
  const [currentPassword, setCurrentPassword] = useState(null)
  const [password, setPassword] = useState(null)
  const [passwordConfirmation, setPasswordConfirmation] = useState(null)
  const [passwordError, setPasswordError] = useState(false)
  const navigate = useNavigate()

  const BASE_URL = import.meta.env.VITE_API_URL

  async function editPassword() {
    if (password !== passwordConfirmation) {
      setPasswordError(true)
    } else {
      setPasswordError(false)
      let payload = {
        "user": {
          "current_password": currentPassword,
          "password": password,
          "password_confirmation": passwordConfirmation,
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

  function handleKeyDown(e) {
    if (e.key === 'Enter') {
      editPassword()
    }
  }

  return (
    <>
      <Sidenav />
      <DashboardLayout>
        <DashboardNavbar />
        <SoftAlert color='error' style={!passwordError ? {display: 'none'} : ''}>Les mots de passe ne correspondent pas</SoftAlert>
        <Card>
          <SoftBox mt={5} mb={3}>
            <Grid container spacing={3} justifyContent="center">
            <Grid item xs={12} md={6} xl={4}>
            <SoftBox p={3} mb={1} textAlign="center">
              <SoftTypography variant="h5" fontWeight="medium">
                Votre nouveau mot de passe
              </SoftTypography>
            </SoftBox>
            <SoftBox component="form" role="form">
                <SoftBox mb={2}>
                  <SoftInput 
                    type="password" 
                    placeholder="Mot de passe actuel (obligatoire)" 
                    onChange={e => setCurrentPassword(e.target.value)}
                    error={passwordError ? true : false}
                    onKeyDown={handleKeyDown}
                  />
                </SoftBox>
                <SoftBox mb={2}>
                  <SoftInput 
                    type="password" 
                    placeholder="Nouveau mot de passe" 
                    onChange={e => setPassword(e.target.value)}
                    error={passwordError ? true : false}
                    onKeyDown={handleKeyDown}
                  />
                </SoftBox>
                <SoftBox mb={2}>
                  <SoftInput 
                    type="password" 
                    placeholder="confirmation du nouveau mot de passe" 
                    onChange={e => setPasswordConfirmation(e.target.value)}
                    error={passwordError ? true : false}
                    onKeyDown={handleKeyDown}
                  />
                </SoftBox>
                <SoftBox mt={4} mb={1}>
                  <SoftButton variant="gradient" color="info" fullWidth onClick={() => editPassword()}>
                    Envoyer
                  </SoftButton>
                </SoftBox>
                <Separator />
              </SoftBox>
              </Grid>
            </Grid>
          </SoftBox> 
        </Card>
        <Footer />
      </DashboardLayout>
    </>
  );
}
