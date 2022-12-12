import React from 'react'
import { useState } from 'react'
import { useUserStore } from '@contexts/UserContext'
import { observer } from 'mobx-react-lite'
import { Link } from 'react-router-dom'
import Card from "@mui/material/Card";

// Soft UI Dashboard PRO React components
import SoftBox from "@components/SoftBox";
import SoftTypography from "@components/SoftTypography";
import SoftInput from "@components/SoftInput";
import SoftButton from "@components/SoftButton";
import SoftAlert from '@components/SoftAlert'

// Authentication layout components
import BasicLayout from "@pages/authentification/components/BasicLayout";
import Separator from "@pages/authentification/components/Separator";

import curved9 from "/assets/images/curved-images/curved9.jpg"
import DefaultNavbar from '@components/navbars/defaultNavbar'
import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'

export const LoginPage = observer(() => {
  const [email, setEmail] = useState(null)
  const [password, setPassword] = useState(null)
  const userStore = useUserStore()
  const navigate = useNavigate()
  
  function handleLogin() {
    const loginData = {
      "user": {
        "email": email,
        "password": password
      }
    };
    userStore.loginUser(loginData)
  }

  function handleKeyDown(e) {
    if (e.key === 'Enter') {
      handleLogin()
    }
  }
  
  return (
    <>
      <DefaultNavbar />
      <BasicLayout
        title="Bienvenue!"
        description="Entrez vos identifiants de connexion ci-dessous pour vous connecter à votre espace"
        image={curved9}
      >
        <SoftAlert color='error' style={!userStore.hasErrors ? {display: 'none'} : {}}>Identifiants de connexion incorrects</SoftAlert>
        <SoftAlert color='warning' style={userStore.tokenOutdated ? {} : {display: 'none'}}>Vous devez vous reconnecter pour continuer</SoftAlert>
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
                  onKeyDown={handleKeyDown}
                />
              </SoftBox>
              <SoftTypography 
                component={Link} 
                to="/resetpassword"
                variant="body2" 
              >
                Mot de passe oublié ?
              </SoftTypography>
              <SoftBox mt={4} mb={1}>
                <SoftButton variant="gradient" color="info" fullWidth onClick={handleLogin}>
                  Se connecter
                </SoftButton>
              </SoftBox>
              <Separator />
              <SoftBox mt={1} mb={3}>
                <SoftButton
                  component={Link}
                  to="/register"
                  variant="gradient"
                  color="dark"
                  fullWidth
                >
                  s'incrire
                </SoftButton>
              </SoftBox>
            </SoftBox>
          </SoftBox>
        </Card>
      </BasicLayout>
    </>
  );
})
