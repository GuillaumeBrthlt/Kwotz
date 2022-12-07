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

function Products() {

  return (
    <SoftBox>
      <SoftTypography variant="h5">Denrées stockées</SoftTypography>
      <SoftBox mt={3}>
        <Grid container >
          <Grid item xs={12}>
            <FormField type="text" label="type de denrées" placeholder="ex: fruits et légumes" />
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
                  Fréquence d'entrée des denrées (optionnel)
                </SoftTypography>
              </SoftBox>
              <SoftSelect
                defaultValue={{ value: "jour", label: "jour" }}
                options={[
                  { value: "jour", label: "jour" },
                  { value: "semaine", label: "semaine" },
                  { value: "mois", label: "mois" }
                ]}
              />
            </SoftBox>
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormField type="number" label="Quantité par entrée (kg)" placeholder="ex: 1500" />
          </Grid>
        </Grid>
      </SoftBox>
    </SoftBox>
  );
}

export default Products;
