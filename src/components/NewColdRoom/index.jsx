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
import GeneralInfo from "@components/NewColdRoom/components/GeneralInfo";
import Dimensions from "@components/NewColdRoom/components/Dimensions";
import Products from "@components/NewColdRoom/components/Products";
import HeatSources from "@components/NewColdRoom/components/HeatSources";
import Comments from "@components/NewColdRoom/components/Comments";


import validations from "@components/NewColdRoom/schemas/validations";
import initialValues from "@components/NewColdRoom/schemas/initialValues";
import form from "@components/NewColdRoom/schemas/form"

function getSteps() {
  return ["1. Général", "2. Dimensions", "3. Stockage", "4. Autres sources", "5. Commentaires"];
}

function getStepContent(stepIndex, formData) {
  switch (stepIndex) {
    case 0:
      return <GeneralInfo formData={formData} />;
    case 1:
      return <Dimensions formData={formData} />;
    case 2:
      return <Products formData={formData} />;
    case 3:
      return <HeatSources formData={formData} />;
    case 4:
      return <Comments formData={formData} />;
    default:
      return null;
  }
}



function NewColdRoom() {
  const [activeStep, setActiveStep] = useState(0);
  const steps = getSteps();
  const { formId, formField } = form;
  const isLastStep = activeStep === steps.length - 1;
  const currentValidation = validations[activeStep];


  const handleNext = () => setActiveStep(activeStep + 1);
  const handleBack = () => setActiveStep(activeStep - 1);

  function handleSubmit(values, actions) {
    if (isLastStep) {
      payload = {
        coldRoom: {
          name: values.CFname,
          temperature: values.temperature,
          condensing_unit: values.condensing_unit,
          prod_outside: values.prod_outside,
          refrigerant_type: values.refrigerant_type,
          length: values.CFlength,
          width: values.width,
          height: values.height,
          volume: values.volume,
          product_types: values.product_types,
          entries_frequency: values.entries_frequency,
          entries_quantity: values.entries_quantity,
          heat_sources_power: values.heat_sources_power,
          heat_sources: values.heat_sources,
          comment: values.comment,
        },
      }
      console.log(payload)
    } else {
      setActiveStep(activeStep + 1);
      actions.setTouched({});
      actions.setSubmitting(false);
    }
  }

  return (
      <SoftBox mt={1} mb={20}>
        <Grid container justifyContent="center">
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
                            disable={isSubmitting}
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

export default NewColdRoom;
