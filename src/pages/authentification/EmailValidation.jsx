import React from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { Card } from '@mui/material'
import { observer } from 'mobx-react-lite';
import { useUserStore } from "@contexts/UserContext";

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
  );
})

export default EmailValidation