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
import { Link } from 'react-router-dom'
import { Card } from '@mui/material'

// Soft UI Dashboard PRO React components
import SoftBox from "@components/SoftBox";
import SoftTypography from "@components/SoftTypography";
import SoftButton from "@components/SoftButton";

// Authentication layout components
import BasicLayout from "@pages/authentification/components/BasicLayout";

import curved8 from "/assets/images/curved-images/curved8.jpg"
import DefaultNavbar from '@components/navbars/defaultNavbar'

export default function ConfirmationPage() {

  return (
    <>
      <DefaultNavbar />
      <BasicLayout
        title="Dernière étape !"
        description="un email de confirmation vient de vous être envoyé: veuillez vérifier votre boîte de réception email"
        image={curved8}
      >
        <Card>
          <SoftBox p={3} mb={1} textAlign="center">
            <SoftTypography variant="h5" fontWeight="medium">
              Veuillez vous connecter
            </SoftTypography>
            <SoftTypography variant="h5" fontWeight="medium">
              Après avoir confirmé votre inscription
            </SoftTypography>
          </SoftBox>
          <SoftBox mt={4} p={3}>
              <SoftBox>
                <SoftButton
                  component={Link}
                  to="/login"
                  variant="gradient"
                  color="info"
                  fullWidth
                >
                  se connecter
                </SoftButton>
              </SoftBox>
            </SoftBox>
        </Card>
      </BasicLayout>
    </>
  );
}
