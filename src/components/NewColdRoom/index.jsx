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

// @mui material components
import Grid from "@mui/material/Grid";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Card from "@mui/material/Card";

// Soft UI Dashboard PRO React components
import SoftBox from "@components/SoftBox";
import SoftButton from "@components/SoftButton";

// NewProduct page components
import ProductInfo from "@components/NewColdRoom/components/ProductInfo";
import Media from "@components/NewColdRoom/components/Media";
import Socials from "@components/NewColdRoom/components/Socials";
import Pricing from "@components/NewColdRoom/components/Pricing";

function getSteps() {
  return ["1. Général", "2. Dimensions", "3. stockage", "4. Autres sources", "5. commentaires"];
}

function getStepContent(stepIndex) {
  switch (stepIndex) {
    case 0:
      return <ProductInfo />;
    case 1:
      return <Media />;
    case 2:
      return <Socials />;
    case 3:
      return <Pricing />;
    default:
      return null;
  }
}

function NewColdRoom() {
  const [activeStep, setActiveStep] = useState(0);
  const steps = getSteps();
  const isLastStep = activeStep === steps.length - 1;

  const handleNext = () => setActiveStep(activeStep + 1);
  const handleBack = () => setActiveStep(activeStep - 1);

  return (
      <SoftBox mt={1} mb={20}>
        <Grid container justifyContent="center">
          <Grid item xs={12} lg={8}>
            <Stepper activeStep={activeStep} alternativeLabel>
              {steps.map((label) => (
                <Step key={label}>
                  <StepLabel>{label}</StepLabel>
                </Step>
              ))}
            </Stepper>
            <Card sx={{ overflow: "visible" }}>
              <SoftBox p={2}>
                <SoftBox>
                  {getStepContent(activeStep)}
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
                      onClick={!isLastStep ? handleNext : undefined}
                    >
                      {isLastStep ? "Ajouter" : "suivant"}
                    </SoftButton>
                  </SoftBox>
                </SoftBox>
              </SoftBox>
            </Card>
          </Grid>
        </Grid>
      </SoftBox>
  );
}

export default NewColdRoom;
