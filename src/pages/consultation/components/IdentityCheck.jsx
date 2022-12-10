import React from 'react'
import { useState } from 'react'
import Card from "@mui/material/Card";

// Soft UI Dashboard PRO React components
import SoftBox from "@components/SoftBox";
import SoftTypography from "@components/SoftTypography";
import SoftInput from "@components/SoftInput";
import SoftButton from "@components/SoftButton";

// Authentication layout components
import Layout from '@pages/consultation/components/Layout';

import curved14 from "/assets/images/curved-images/curved14.jpg"
import SoftAlert from '@components/SoftAlert';



export default function IdentityCheck({ verifemail, setVerified }) {
  const [email, setEmail] = useState(null)
  const [error, setError] = useState(false)

  
  async function mailCheck(e) {
   if (email === verifemail) {
    setVerified(true)
   } else {
    setError(true)
   }
  }

  function handleKeyDown(e) {
    
  }

  return (
    <>
      <Layout
        title="Vérification de votre identité"
        description="Pour assurer la protection des données de nos utilisateurs, nous vérifions votre identité avec l'adresse email sur laquelle
        vous avez reçu la demande de prix."
        image={curved14}
      >
        <Card>
          <SoftAlert color='error' sx={error ? {}: {display: 'none'}}>Nous n'avons pas pu vous identifier</SoftAlert>
          <SoftBox p={3} mb={1} textAlign="center">
            <SoftTypography variant="h5" fontWeight="medium">
              Votre adresse mail
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
                <SoftButton variant="gradient" color="info" fullWidth onClick={mailCheck}>
                  Accéder à la demande de prix
                </SoftButton>
              </SoftBox>
            </SoftBox>
          </SoftBox>
        </Card>
      </Layout>
    </>
  );
}
