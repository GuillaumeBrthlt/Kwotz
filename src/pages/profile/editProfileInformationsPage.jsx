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
import { useState, useEffect} from "react";
import { useUserProfileStore } from "@contexts/UserProfileContext";
// formik components
import { Formik, Form } from "formik";

//import react-spinner animation loading
import {PropagateLoader} from 'react-spinners'

// @mui material components
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import { MobileStepper } from "@mui/material";

// Soft UI Dashboard PRO React components
import SoftAlert from '@components/SoftAlert'
import SoftBox from "@components/SoftBox";
import SoftButton from "@components/SoftButton";

// Soft UI Dashboard PRO React example components
import DashboardLayout from "@components/LayoutContainers/DashboardLayout";
import DashboardNavbar from "@components/navbars/DashboardNavbar";
import Footer from "@components/Footer";

// NewUser page components
import CompanyInfos from "./components/CompanyInfos/companyInfos";
import ProfileInfos from "./components/ProfileInfos/profileInfos";

// NewUser layout schemas for form and form feilds
import validations from "./schemas/validations";
import checkout from "./editschemas/form";
import form from "./editschemas/form";
import { useUserStore } from "@contexts/UserContext";
import { useNavigate } from "react-router-dom";
import { observer } from "mobx-react-lite";
import Sidenav from "@components/navbars/Sidenav";


function getSteps() {
  return ["Ma société", "Mes infos"];
}

function getStepContent(stepIndex, formData) {
  switch (stepIndex) {
    case 0:
      return <CompanyInfos formData={formData} />;
    case 1:
      return <ProfileInfos formData={formData} />;
    default:
      return null;
  }
}

const EditInformations = observer(() => {
  const [activeStep, setActiveStep] = useState(0);
  const [update, setUpdate] = useState(false)
  const [loading, setLoading] = useState(false)
  const steps = getSteps();
  const { formId, formField } = form;
  const currentValidation = validations[activeStep];
  const isLastStep = activeStep === steps.length - 1;
  const userStore = useUserStore()
  const userProfileStore = useUserProfileStore()
  const navigate = useNavigate()
  const userID = userStore.user.id

useEffect(() => {
  userProfileStore.getProfileDetails(userID)
}, [])


const {
  formField: {
    company,
    address,
    zipcode,
    city,
    role,
    first_name,
    last_name,
    shipping_alias,
    shipping_address,
    shipping_zipcode,
    shipping_city,
    phone_number,
  },
} = checkout;
const details = userProfileStore.profileDetails

const initialValues = {
  [company.name]: details.company,
  [address.name]: details.address,
  [zipcode.name]: details.zipcode,
  [city.name]: details.city,
  [role.name]: details.role,
  [first_name.name]: details.first_name,
  [last_name.name]: details.last_name,
  [shipping_alias.name]: details.shipping_alias,
  [shipping_address.name]: details.shipping_address,
  [shipping_zipcode.name]: details.shipping_zipcode,
  [shipping_city.name]: details.shipping_city,
  [phone_number.name]: details.phone_number,
};

const sleep = (ms) =>
new Promise((resolve) => {
  setTimeout(resolve, ms);
});
const handleBack = () => setActiveStep(activeStep - 1);


  const submitForm = async (values) => {
    await sleep(1000);

    userProfileStore.editProfile(values, details.id)
    setUpdate(true)
    await sleep(1000)
    setLoading(true)
  };


  const handleSubmit = (values, actions) => {
    if (isLastStep) {
      submitForm(values, actions);
    } else {
      setActiveStep(activeStep + 1);
      actions.setTouched({});
      actions.setSubmitting(false);
    }
  };

  if (loading == true) {
    navigate('/dashboard')
    setLoading(false)
  }
  
  return (
  <div>
    {!userProfileStore.profileDetails.id ? (
      <Grid display='flex' height='100vh' justifyContent='center' alignItems='center'>
        <PropagateLoader color="#36d7b7"/>
      </Grid>) : (
      <>
        <Sidenav />
        <DashboardLayout>
          <DashboardNavbar />
          <SoftAlert color='success' style={ update == true ? '' : {display: 'none'}}>Votre profil a bien été mis à jour </SoftAlert>
          <SoftBox py={3} mb={20}>
            <Grid container justifyContent="center" sx={{ height: "100%" }}>
              <Grid item xs={12} lg={8}>
                <Stepper activeStep={activeStep} alternativeLabel sx={{ display: { xs: 'none', sm: 'flex'} }}>
                  {steps.map((label) => (
                    <Step key={label}>
                      <StepLabel>{label}</StepLabel>
                    </Step>
                  ))}
                </Stepper>
                <MobileStepper
                  variant="dots"
                  steps={5}
                  position="static"
                  activeStep={activeStep}
                  sx={{ 
                    display: { xs: 'flex', sm: 'none'}, 
                    justifyContent: 'center', 
                    paddingY: 5 
                  }}
                />
                <Formik
                  initialValues={initialValues}
                  validationSchema={currentValidation}
                  onSubmit={handleSubmit}
                >
                  {({ values, errors, touched, isSubmitting }) => (
                    <Form id={formId} autoComplete="off">
                      <Card sx={{ height: "100%" }}>
                        <SoftBox p={2}>
                          <SoftBox>
                            {getStepContent(activeStep, {
                              values,
                              touched,
                              formField,
                              errors,
                            })}
                            <SoftBox mt={2} width="100%" display="flex" justifyContent="space-between">
                              {activeStep === 0 ? (
                                <SoftBox />
                              ) : (
                                <SoftButton variant="gradient" color="light" onClick={handleBack}>
                                  retour
                                </SoftButton>
                              )}
                              <SoftButton
                                disabled={isSubmitting}
                                type="submit"
                                variant="gradient"
                                color="dark"
                              >
                                {isLastStep ? "envoyer" : "suivant"}
                              </SoftButton>
                            </SoftBox>
                          </SoftBox>
                        </SoftBox>
                      </Card>
                    </Form>
                  )}
                </Formik>
              </Grid>
            </Grid>
          </SoftBox>
          <Footer />
        </DashboardLayout>  
      </>
    )}
  </div>
  )
});

export default EditInformations;