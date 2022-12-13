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
import React from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { Card } from '@mui/material'
import { observer } from 'mobx-react-lite';
import { useUserStore } from "@contexts/UserContext";
import DefaultNavbar from '@components/navbars/defaultNavbar'

// Soft UI Dashboard PRO React components
import SoftBox from "@components/SoftBox";
import SoftTypography from "@components/SoftTypography";
import SoftButton from "@components/SoftButton";

// Authentication layout components
import BasicLayout from "@pages/authentification/components/BasicLayout";

import curved1 from "/assets/images/curved-images/curved1.jpg"


const EmailValidation = observer(() => {
  const userStore = useUserStore();
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  const token = searchParams.get('confirmation_token')


  function handleValidation() {
    userStore.validateEmail(token)
    navigate('/login')
  }

  if (!token) {
    navigate('/404')
  }

  return (
    <>
      <DefaultNavbar />
      <BasicLayout
        title="Validez votre email"
        description="Cliquez sur le bouton de validation pour vous connecter à votre espace"
        image={curved1}
      >
        <Card>
          <SoftBox p={3} mb={1} textAlign="center">
            <SoftTypography variant="h5" fontWeight="medium">
              Validation du mail
            </SoftTypography>
          </SoftBox>
          <SoftBox p={3}>
            <SoftBox component="form" role="form">
              <SoftBox mt={4} mb={1}>
                <SoftButton variant="gradient" color="info" fullWidth onClick={handleValidation}>
                  Valider mon email
                </SoftButton>
              </SoftBox>
            </SoftBox>
          </SoftBox>
        </Card>
      </BasicLayout>
    </>
  );
})

export default EmailValidation