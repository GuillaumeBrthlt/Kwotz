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

// Soft UI Dashboard PRO React components
import SoftBox from "@components/SoftBox";
import SoftTypography from "@components/SoftTypography";
import SoftSelect from "@components/SoftSelect";

// NewProduct page components
import FormField from "@components/NewColdRoom/components/FormField";

function GeneralInfo() {

  return (
    <SoftBox>
      <SoftTypography variant="h5">Informations générales</SoftTypography>
      <SoftBox mt={3}>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <FormField type="text" label="Nom de la chambre froide" placeholder="ex: CF fruits et légumes" />
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormField type="number" label="Température (°C)" placeholder="ex: 6" />
          </Grid>
        </Grid>
      </SoftBox>
      <SoftBox mt={2}>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <SoftBox mb={3}>
              <SoftBox mb={1} ml={0.5} lineHeight={0} display="inline-block">
                <SoftTypography
                  component="label"
                  variant="caption"
                  fontWeight="bold"
                >
                  Production
                </SoftTypography>
              </SoftBox>
              <SoftSelect
                defaultValue={{ value: "sur groupe indépendant", label: "sur groupe indépendant" }}
                options={[
                  { value: "sur groupe indépendant", label: "sur groupe indépendant" },
                  { value: "sur centrale", label: "sur centrale" },
                ]}
              />
            </SoftBox>
            <SoftBox mb={3}>
              <SoftBox mb={1} ml={0.5} lineHeight={0} display="inline-block">
                <SoftTypography
                  component="label"
                  variant="caption"
                  fontWeight="bold"
                >
                  Emplacement de la production
                </SoftTypography>
              </SoftBox>
              <SoftSelect
                defaultValue={{ value: "à l'extérieur", label: "à l'extérieur" }}
                options={[
                  { value: "à l'extérieur", label: "à l'extérieur" },
                  { value: "en salle des machines", label: "en salle des machines" },
                ]}
              />
            </SoftBox>
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormField type="text" label="Fluide réfrigérant" placeholder="ex: R134a" />
          </Grid>
        </Grid>
      </SoftBox>
    </SoftBox>
  );
}

export default GeneralInfo;
