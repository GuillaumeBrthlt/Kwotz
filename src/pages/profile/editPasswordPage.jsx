/**
=========================================================
* Soft UI Dashboard PRO React - v4.0.0
=========================================================

* Product Page: https://www.creative-tim.com/product/soft-ui-dashboard-pro-react
* Copyright 2022 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/
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

  function commitDestroy() {
    userStore.destroyUser()
    navigate('/register')
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
                    placeholder="Ca ne marche pas" 
                    onChange={e => setCurrentPassword(e.target.value)}
                    error={passwordError ? true : false}
                    onKeyDown={handleKeyDown}
                  />
                </SoftBox>
                <SoftBox mb={2}>
                  <SoftInput 
                    type="password" 
                    placeholder="Il faut envoyer un mail" 
                    onChange={e => setPassword(e.target.value)}
                    error={passwordError ? true : false}
                    onKeyDown={handleKeyDown}
                  />
                </SoftBox>
                <SoftBox mb={2}>
                  <SoftInput 
                    type="password" 
                    placeholder="de reset de password comme pour l'oubli" 
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
                <SoftBox mt={1} mb={1}>
                  <SoftButton variant="gradient" color="error" fullWidth onClick={() => commitDestroy()}>
                    Supprimer mon compte
                  </SoftButton>
                </SoftBox>
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
