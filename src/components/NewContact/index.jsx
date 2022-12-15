/* import { useState } from "react";


import { Formik, Form } from "formik";

// @mui material components
import Grid from "@mui/material/Grid";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Card from "@mui/material/Card";
import { MobileStepper } from "@mui/material";

// Soft UI Dashboard PRO React components
import SoftBox from "@components/SoftBox";
import SoftButton from "@components/SoftButton";


function NewContact({supplier, setNewContact}) {

}


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
    <SoftTypography  variant='h4' textAlign='center' mb={2}>
        {sent ? "Votre demande de prix à bien été envoyée!" : "Envoyer la demande prix"}
    </SoftTypography>
    <Grid container spacing={2} justifyContent='center' mb={2} mt={1} sx={sent ? {display: 'none'}: {}}>
      <Grid item xs={11} md={8}>
        <SoftInput 
          placeholder="email du contact"
          onChange={e=> setEmail(e.target.value)}
        />
      </Grid>
      <Grid item>
        <SoftButton 
          variant="gradient" 
          color="success" 
          size="medium"
          onClick={() => {sendMail()}}
        >
          Envoyer
        </SoftButton>
      </Grid>
    </Grid>
  </Card>
</Modal> */