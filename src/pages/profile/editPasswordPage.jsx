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
import { Card } from '@mui/material'
import { Grid, Modal, Button } from "@mui/material"
import CloseIcon from '@mui/icons-material/Close';
import { useUserStore } from '@contexts/UserContext'
import DashboardNavbar from '@components/navbars/DashboardNavbar';
import DashboardLayout from "@components/LayoutContainers/DashboardLayout";
import Footer from "@components/Footer";
import Switch from "@mui/material/Switch";
// Soft UI Dashboard PRO React components
import SoftBox from "@components/SoftBox";
import SoftTypography from "@components/SoftTypography";
import SoftInput from "@components/SoftInput";
import SoftButton from "@components/SoftButton";
import SoftAlert from '@components/SoftAlert'
import Header from "@components/Header";

// Authentication layout components
import Separator from "@pages/authentification/components/Separator";
import Sidenav from "@components/navbars/Sidenav";


export function EditPasswordPage() {
  const userStore = useUserStore()
  const [email, setEmail] = useState(null)
  const [validEmail, setValidEmail] = useState(true)
  const [sentMail, setSentMail] = useState(false)
  const [confirmDelete, setConfirmDelete] = useState(false)
  const [open, setOpen] = useState(false)

  const sleep = (ms) =>
    new Promise((resolve) => {
      setTimeout(resolve, ms);
    });

  const BASE_URL = import.meta.env.VITE_API_URL
  
  const modalStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width:{xs: 350, md:600}
  };

  function handleOpen() {
    setOpen(true)
  }

  function handleClose() {
    setOpen(false)
  }

  function commitDestroy() {
    userStore.destroyUser()
  }

  async function sendMail() {
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
  }

  const mailVerification = async () => {
    await sleep(50)
    if (email == userStore.user.email) {
      setValidEmail(true)
      handleClose()
      sendMail()
      setSentMail(true)
      await sleep(3000)
      userStore.logoutUser()
    } else {
      handleClose()
      setValidEmail(false)
    }
  }

  return (
    <>
      <Sidenav />
      <DashboardLayout>
        <DashboardNavbar />
        <Header title="MON COMPTE"/>
        <SoftBox mt={2}>
          <SoftAlert color='error' style={validEmail ? {display: 'none'} : {}}>Cet email n'est pas valide</SoftAlert>
          <SoftAlert color='info' style={sentMail ? {} : {display: 'none'}}>Email envoyé, vous allez être déconnecté.</SoftAlert>
        </SoftBox>
        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="sending-form"
            aria-describedby="sending-project-form"
            >
            <Card sx={modalStyle}>
              <Button color="secondary" sx={{marginLeft: 'auto'}} size='large' onClick={() => {handleClose()}}>
                <CloseIcon />
              </Button>
              <SoftTypography  variant='h4' textAlign='center'>
                  Envoyer email de modification de mot de passe
              </SoftTypography>
              <Grid container spacing={2} justifyContent='center' mb={2} mt={1}>
                <Grid item xs={11} md={8}>
                  <SoftInput 
                    placeholder="Vôtre email de connection"
                    onChange={e=> setEmail(e.target.value)}
                  />
                </Grid>
                <Grid item>
                  <SoftButton 
                    variant="gradient" 
                    color="success" 
                    size="medium"
                    onClick={() => {mailVerification()}}
                  >
                    Envoyer
                  </SoftButton>
                </Grid>
              </Grid>
            </Card>
          </Modal>
          <SoftBox mt={5} mb={3}>
            <Card id="delete-account">
            <SoftBox p={3} lineHeight={1}>
              <SoftBox mb={1}>
                <SoftTypography variant="h5">Changer de mot de passe</SoftTypography>
              </SoftBox>
              <SoftTypography variant="button" color="text" fontWeight="regular">
                Vous receverez un mail pour modifier vôtre mot de passe.
              </SoftTypography>
            </SoftBox>
            <SoftBox
              pb={3}
              px={3}
              display="flex"
              justifyContent="space-between"
              alignItems={{ xs: "flex-start", sm: "center" }}
              flexDirection={{ xs: "column", sm: "row" }}
            >
              <SoftBox display="flex" alignItems="center" mb={{ xs: 3, sm: 0 }}>
                <SoftTypography variant="caption" color="text">
                  Ne communiquez jamais vôtre mot de passe, on ne vous le demandera jamais.
                </SoftTypography>
              </SoftBox>
              <SoftBox display="flex" flexDirection={{ xs: "column", sm: "row" }}>
                <SoftBox ml={{ xs: 0, sm: 1 }} mt={{ xs: 1, sm: 0 }}>
                  <SoftButton variant="gradient" color="info" sx={{ height: "100%" }} onClick={() => {handleOpen()}}>
                    nouveau mot de passe
                  </SoftButton>
                </SoftBox>
              </SoftBox>
            </SoftBox>
          </Card>
        </SoftBox>
        <Separator />
        <SoftBox mt={3} mb={3}>
          <Card id="delete-account">
            <SoftBox p={3} lineHeight={1}>
              <SoftBox mb={1}>
                <SoftTypography variant="h5">Supprimer mon compte</SoftTypography>
              </SoftBox>
              <SoftTypography variant="button" color="text" fontWeight="regular">
                Une fois le compte supprimé, vous ne pouvez pas revenir en arrière !
              </SoftTypography>
            </SoftBox>
            <SoftBox
              pb={3}
              px={3}
              display="flex"
              justifyContent="space-between"
              alignItems={{ xs: "flex-start", sm: "center" }}
              flexDirection={{ xs: "column", sm: "row" }}
            >
              <SoftBox display="flex" alignItems="center" mb={{ xs: 3, sm: 0 }}>
                <Switch checked={confirmDelete} onChange={(() => setConfirmDelete(!confirmDelete))} />
                <SoftBox ml={2} lineHeight={0}>
                  <SoftTypography display="block" variant="button" fontWeight="medium">
                    Confirmer
                  </SoftTypography>
                  <SoftTypography variant="caption" color="text">
                    Je veux supprimer mon compte.
                  </SoftTypography>
                </SoftBox>
              </SoftBox>
              <SoftBox display="flex" flexDirection={{ xs: "column", sm: "row" }}>
                <SoftBox ml={{ xs: 0, sm: 1 }} mt={{ xs: 1, sm: 0 }}>
                  <SoftButton variant="gradient" color="error" sx={{ height: "100%" }} onClick={() => commitDestroy()} disabled={!confirmDelete}>
                    Supprimer
                  </SoftButton>
                </SoftBox>
              </SoftBox>
            </SoftBox>
          </Card>
        </SoftBox>
        <Footer />
      </DashboardLayout>
    </>
  );
}
