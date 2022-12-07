import { useState } from "react";
import { useUserProfileStore } from "@contexts/UserProfileContext";
// formik components
import { Formik, Form } from "formik";

// @mui material components
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";

// Soft UI Dashboard PRO React components
import SoftBox from "@components/SoftBox";
import SoftButton from "@components/SoftButton";

// Soft UI Dashboard PRO React example components
import DashboardLayout from "@components/LayoutContainers/DashboardLayout";
import DashboardNavbar from "@components/navbars/DashboardNavbar";
import Footer from "@components/Footer";

// NewUser page components
import CompanyInfos from "./components/CompanyInfos/companyInfos";
import ShippingInfos from "./components/ShippingInfos/shippingInfos";
import ProfileInfos from "./components/ProfileInfos/profileInfos";

// NewUser layout schemas for form and form feilds
import validations from "./schemas/validations";
import form from "./schemas/form";
import initialValues from "./schemas/initialValues";
import { useUserStore } from "@contexts/UserContext";
import { useNavigate } from "react-router-dom";
import { observer } from "mobx-react-lite";


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

  const sleep = (ms) =>
    new Promise((resolve) => {
      setTimeout(resolve, ms);
    });
  const handleBack = () => setActiveStep(activeStep - 1);

  const submitForm = async (values, actions) => {
    await sleep(1000);

    userProfileStore.createProfile(values)
    navigate('/dashboard')
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

  if (!userStore.authenticated) {
    navigate('/login')
  }

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <SoftBox py={3} mb={20}>
        <Grid container justifyContent="center" sx={{ height: "100%" }}>
          <Grid item xs={12} lg={8}>
            <Stepper activeStep={activeStep} alternativeLabel>
              {steps.map((label) => (
                <Step key={label}>
                  <StepLabel>{label}</StepLabel>
                </Step>
              ))}
            </Stepper>
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
                              back
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
    <Footer />
  </DashboardLayout>
  );
})

export default NewUser;