import axios from 'axios'
import React from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom'
import Card from "@mui/material/Card";

// Soft UI Dashboard PRO React components
import SoftBox from "@components/SoftBox";
import SoftTypography from "@components/SoftTypography";
import SoftInput from "@components/SoftInput";
import SoftButton from "@components/SoftButton";

// Authentication layout components
import BasicLayout from "@pages/authentification/components/BasicLayout";
import Separator from "@pages/authentification/components/Separator";

import curved6 from "/assets/images/curved-images/curved6.jpg"
import DefaultNavbar from '@components/navbars/defaultNavbar'


export default function ResetPasswordPage() {
  const BASE_URL = import.meta.env.VITE_API_URL
  const [email, setEmail] = useState(null)
  const navigate = useNavigate()

  
  async function sendMail(e) {
    e.preventDefault()
    let payload = {
      "user": {
        "email": email
      }
    }
    try {
      axios.post(`${BASE_URL}users/password`, payload)
    } catch (error) {
      console.error(error)
    }
    navigate('/login')
  }

  function handleKeyDown(e) {
    if (e.key === 'Enter') {
      sendMail(e)
    }
  }

  return (
    <>
      <DefaultNavbar />
      <BasicLayout
        title="Mot de passe oublié ?"
        description="Entrez votre addresse email pour recevoir un lien de réinitialisation de mot de passe"
        image={curved6}
      >
        <Card>
          <SoftBox p={3} mb={1} textAlign="center">
            <SoftTypography variant="h5" fontWeight="medium">
              changer le mot de passe
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
              <SoftBox mt={4} mb={1}>
                <SoftButton variant="gradient" color="info" fullWidth onClick={sendMail}>
                  Envoyer le mail
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
    </>
  );
}
