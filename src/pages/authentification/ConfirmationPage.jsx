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
import { Card } from '@mui/material'

// Soft UI Dashboard PRO React components
import SoftBox from "@components/SoftBox";
import SoftTypography from "@components/SoftTypography";

// Authentication layout components
import BasicLayout from "@pages/authentification/components/BasicLayout";
import curved8 from "/assets/images/curved-images/curved8.jpg"
import DefaultNavbar from '@components/navbars/defaultNavbar'

export default function ConfirmationPage() {

  return (
    <>
      <DefaultNavbar />
      <BasicLayout
        title="Merci pour votre inscription!"
        description="un email de confirmation vient de vous être envoyé! veuillez vérifier votre boîte de réception email"
        image={curved8}
      >
        <Card>
          <SoftBox p={3} mb={1} textAlign="center">
            <SoftTypography variant="h4" fontWeight="medium">
              Dernière étape:
            </SoftTypography>
            <SoftTypography variant="h5" fontWeight="light" mt={2}>
              Rendez-vous sur l'email qui vous à été envoyé, vous pourrez vous connecter après avoir cliqué sur le lien qui s'y trouve.
            </SoftTypography>
          </SoftBox>
        </Card>
      </BasicLayout>
    </>
  );
}
