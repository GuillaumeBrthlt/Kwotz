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
import { useEffect, useState } from "react";
import { useUserProfileStore } from "@contexts/UserProfileContext";
import { useUserStore } from "@contexts/UserContext";
import { useNavigate } from "react-router-dom";
import { observer } from "mobx-react-lite";

// formik components
import { Formik, Form } from "formik";

// @mui material components
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import { MobileStepper } from "@mui/material";

// Soft UI Dashboard PRO React components
import SoftBox from "@components/SoftBox";
import SoftButton from "@components/SoftButton";

// Soft UI Dashboard PRO React example components
import DashboardLayout from "@components/LayoutContainers/DashboardLayout";

// NewUser page components
import CompanyInfos from "./components/CompanyInfos/companyInfos";
import ShippingInfos from "./components/ShippingInfos/shippingInfos";
import ProfileInfos from "./components/ProfileInfos/profileInfos";

// NewUser layout schemas for form and form feilds
import validations from "./schemas/validations";
import form from "./schemas/form";
import initialValues from "./schemas/initialValues";
import SoftTypography from "@components/SoftTypography";

function getSteps() {
  return ["Ma société", "Adresse Livraison", "Mes infos"];
}

function getStepContent(stepIndex, formData) {
  switch (stepIndex) {
    case 0:
      return <CompanyInfos formData={formData} />;
    case 1:
      return <ShippingInfos formData={formData} />;
    case 2:
      return <ProfileInfos formData={formData} />;
    default:
      return null;
  }
}

const NewUser = observer(() => {
  const [activeStep, setActiveStep] = useState(0);
  const steps = getSteps();
  const { formId, formField } = form;
  const currentValidation = validations[activeStep];
  const isLastStep = activeStep === steps.length - 1;
  const userStore = useUserStore()
  const userProfileStore = useUserProfileStore()
  const navigate = useNavigate()
  const handleBack = () => setActiveStep(activeStep - 1);
  const submitForm = async (values, actions) => {
    userProfileStore.createProfile(values)
  };

  const handleSubmit = (values, actions) => {
    if (isLastStep) {
      submitForm(values);
    } else {
      setActiveStep(activeStep + 1);
      actions.setTouched({});
      actions.setSubmitting(false);
    }
  };

  useEffect(() => {
    if (userProfileStore.created) {
      userStore.has_profile()
      navigate('/dashboard')
    }
  }, [userProfileStore.created])


  return (
    <>
      <DashboardLayout>
        <SoftBox py={3} mb={20}>
          <SoftTypography textAlign="center" variant="h4">
            Avant de commencer à utiliser l'application, nous avons besoin de quelques informations vous concernant.
          </SoftTypography>
          <SoftTypography textAlign="center" variant="body2" mt={1}>
            Ces informations seront transmises à vos fournisseur avec vos demandes de prix.
          </SoftTypography>
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
                                Retour
                              </SoftButton>
                            )}
                            <SoftButton
                              disabled={isSubmitting}
                              type="submit"
                              variant="gradient"
                              color="dark"
                            >
                              {isLastStep ? "send" : "next"}
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
      </DashboardLayout>
    </>
  );
})

export default NewUser;