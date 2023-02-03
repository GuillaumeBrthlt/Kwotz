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

import { useState } from "react";
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

// NewProduct page components
import GeneralInfo from "@components/NewAirConditionning/components/GeneralInfo";
import Characteristics from "@components/NewAirConditionning/components/Characteristics";
import Comments from "@components/NewAirConditionning/components/Comments";


import validations from "@components/NewAirConditionning/schemas/validations";
import initialValues from "@components/NewAirConditionning/schemas/initialValues";
import form from "@components/NewAirConditionning/schemas/form"
import { useColdRoomStore } from "@contexts/ColdRoomContext";

function getSteps() {
  return ["1. Général", "2. Caractéristiques", "3. Commentaires"];
}

function getStepContent(stepIndex, formData) {
  switch (stepIndex) {
    case 0:
      return <GeneralInfo formData={formData} />;
    case 1:
      return <Characteristics formData={formData} />;
    case 2:
      return <Comments formData={formData} />;
    default:
      return null;
  }
}



function NewAirConditionning({project, handleCloseAC}) {
  const [activeStep, setActiveStep] = useState(0);
  const steps = getSteps();
  const { formId, formField } = form;
  const isLastStep = activeStep === steps.length - 1;
  const currentValidation = validations[activeStep];
  const coldRoomStore = useColdRoomStore()


  const handleNext = () => setActiveStep(activeStep + 1);
  const handleBack = () => setActiveStep(activeStep - 1);

  function handleSubmit(values, actions) {
    if (isLastStep) {
      const payload = {
        air_conditionning: {
          name: values.ACname,
          outside_unit_type: values.type,
          current_type: values.current_type,
          surface: values.surface,
          height: values.height,
          volume: values.volume ? values.volume : values.surface * values.height,
          inside_unit_type: values.inside_unit_type,
          accesories: values.accessories,
          comment: values.comment,
          project_id: project
        },
      }
      coldRoomStore.createAC(payload)
      handleCloseAC()
    } else {
      setActiveStep(activeStep + 1);
      actions.setTouched({});
      actions.setSubmitting(false);
    }
  }

  return (
      <SoftBox >
        <Grid container justifyContent="center">
          <Grid item xs={12} lg={12}>
            <Stepper activeStep={activeStep} alternativeLabel sx={{ display: { xs: 'none', sm: 'flex'} }}>
              {steps.map((label) => (
                <Step key={label}>
                  <StepLabel>{label}</StepLabel>
                </Step>
              ))}
            </Stepper>
            <MobileStepper
              variant="dots"
              steps={3}
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
                  <Card sx={{ overflow: "visible" }}>
                    <SoftBox p={2}>
                      <SoftBox>
                        {getStepContent(activeStep, {
                          values,
                          touched,
                          formField,
                          errors,
                        })}
                        <SoftBox mt={3} width="100%" display="flex" justifyContent="space-between">
                          {activeStep === 0 ? (
                            <SoftBox />
                          ) : (
                            <SoftButton variant="gradient" color="secondary" onClick={handleBack}>
                            Retour
                            </SoftButton>
                          )}
                          <SoftButton
                            variant="gradient"
                            color="dark"
                            type='submit'
                          >
                            {isLastStep ? "Ajouter" : "suivant"}
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
  );
}

export default NewAirConditionning;
