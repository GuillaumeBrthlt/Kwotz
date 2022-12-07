
import { useState } from "react";

// @mui material components
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import Divider from "@mui/material/Divider";

// Soft UI Dashboard PRO React components
import SoftBox from "@components/SoftBox";
import SoftTypography from "@components/SoftTypography";
import SoftInput from "@components/SoftInput";
import SoftButton from "@components/SoftButton";

// Soft UI Dashboard PRO React example components
import DashboardLayout from "@components/LayoutContainers/DashboardLayout";
import DashboardNavbar from "@components/navbars/DashboardNavbar";
import Footer from "@components/Footer";

/* // Settings page components
import FormFieldSupplier from "@components/formFieldSupplier"; */
export function NewSupplier() {


  return (
    <DashboardLayout>
      <DashboardNavbar />
      <SoftBox mt={3} mb={4}>
        <Grid container spacing={3} justifyContent="center">
          <Grid item xs={12} lg={9}>
            <Card sx={{ overflow: "visible" }}>
              <SoftBox p={2} lineHeight={1}>
                <SoftTypography variant="h6" fontWeight="medium">
                  Nouveau Fournisseur
                </SoftTypography>
                <SoftTypography variant="button" fontWeight="regular" color="text">
                  Ajouter un nouveau Fournisseur
                </SoftTypography>
                <Divider />
                <SoftBox
                  display="flex"
                  flexDirection="column"
                  justifyContent="flex-end"
                  height="100%"
                >
                  <SoftBox mb={1} ml={0.5} lineHeight={0} display="inline-block">
                    <SoftTypography component="label" variant="caption" fontWeight="bold">
                      Alias
                    </SoftTypography>
                  </SoftBox>
                  <SoftInput placeholder="alias fournisseur" />
                  <Divider />
                  <SoftBox mb={1} ml={0.5} lineHeight={0} display="inline-block">
                    <SoftTypography component="label" variant="caption" fontWeight="bold">
                      Adresse
                    </SoftTypography>
                  </SoftBox>
                  <SoftInput placeholder="Adresse fournisseur" />
                  <Divider />
                  <SoftBox mb={1} ml={0.5} lineHeight={0} display="inline-block">
                    <SoftTypography component="label" variant="caption" fontWeight="bold">
                      Ville
                    </SoftTypography>
                  </SoftBox>
                  <SoftInput placeholder="ville" />
                  <Divider />
                  <SoftBox mb={1} ml={0.5} lineHeight={0} display="inline-block">
                    <SoftTypography component="label" variant="caption" fontWeight="bold">
                      Code Postal
                    </SoftTypography>
                  </SoftBox>
                  <SoftInput placeholder="code postal" />
                  <Divider />                  
                  <SoftBox mb={1} ml={0.5} lineHeight={0} display="inline-block">
                    <SoftTypography component="label" variant="caption" fontWeight="bold">
                      Ajouter à ma liste de Favoris
                    </SoftTypography>
                  </SoftBox>
                  <SoftInput placeholder="Favoris" />
                </SoftBox>
                <SoftBox display="flex" justifyContent="flex-end" mt={3}>
                  <SoftBox mr={1}>
                    <SoftButton color="light">annuler</SoftButton>
                  </SoftBox>
                  <SoftButton variant="gradient" color="info">
                    créer le projet
                  </SoftButton>
                </SoftBox>
              </SoftBox>
              
              {/* <Grid item xs={12} sm={6}>
                    <FormFieldSupplier
                      label="email"
                      placeholder="example@email.com"
                      inputProps={{ type: "email" }}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <FormFieldSupplier
                      label="confirmation email"
                      placeholder="example@email.com"
                      inputProps={{ type: "email" }}
                    />
                  </Grid> */}

            </Card>
          </Grid>
        </Grid>
      </SoftBox>
      <Footer />
    </DashboardLayout>
  );
}

export default NewSupplier;