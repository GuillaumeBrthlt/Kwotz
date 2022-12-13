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
import { observer } from "mobx-react-lite";
import { useSupplierStore } from "../../contexts/SupplierContext";

// react-router-dom components
import { Link } from "react-router-dom";

// @mui material components
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import Divider from "@mui/material/Divider";
import { Switch } from "@mui/material";

// Soft UI Dashboard PRO React components
import SoftBox from "@components/SoftBox";
import SoftTypography from "@components/SoftTypography";
import SoftInput from "@components/SoftInput";
import SoftButton from "@components/SoftButton";

// Soft UI Dashboard PRO React example components
import DashboardLayout from "@components/LayoutContainers/DashboardLayout";
import DashboardNavbar from "@components/navbars/DashboardNavbar";
import Footer from "@components/Footer";
import Sidenav from "@components/navbars/Sidenav";

export const NewSupplier = observer(() => {
  const [alias, setAlias] = useState(null)
  const [address, setAddress] = useState(null)
  const [city, setCity] = useState(null)
  const [zipcode, setZipcode] = useState(null)
  const [favorite, setFavorite] = useState(false)

  const supplierStore = useSupplierStore()

    const supplierData = {
      "supplier": {
        "alias": alias,
        "address": address,
        "city": city,
        "zipcode": zipcode,
        "favorite": favorite
      }
    }
    
  function handleKeyDown(e) {
    if (e.key === 'Enter') {
      handleSupplier()
    }
  }

  const handleSubmit = () => {
    supplierStore.createSupplier(supplierData)
  }

  return (
    <>
      <Sidenav />
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
                    <SoftInput 
                      type="text"
                      placeholder="alias fournisseur" 
                      onChange={e => setAlias(e.target.value)}
                      onSubmit={handleKeyDown}
                      />
                    <Divider />
                    <SoftBox mb={1} ml={0.5} lineHeight={0} display="inline-block">
                      <SoftTypography component="label" variant="caption" fontWeight="bold">
                        Adresse
                      </SoftTypography>
                    </SoftBox>
                    <SoftInput 
                      type="text"
                      placeholder="Adresse fournisseur" 
                      onChange={e => setAddress(e.target.value)}
                      onKeyDown={handleKeyDown}
                      />
                    <Divider />
                    <SoftBox mb={1} ml={0.5} lineHeight={0} display="inline-block">
                      <SoftTypography component="label" variant="caption" fontWeight="bold">
                        Ville
                      </SoftTypography>
                    </SoftBox>
                    <SoftInput 
                      type="text"
                      placeholder="ville" 
                      onChange={e => setCity(e.target.value)}
                      onKeyDown={handleKeyDown}
                      />
                    <Divider />
                    <SoftBox mb={1} ml={0.5} lineHeight={0} display="inline-block">
                      <SoftTypography component="label" variant="caption" fontWeight="bold">
                        Code Postal
                      </SoftTypography>
                    </SoftBox>
                    <SoftInput 
                      type="text"
                      placeholder="code postal" 
                      onChange={e => setZipcode(e.target.value)}
                      onKeyDown={handleKeyDown}
                      />
                    <Divider />     
                    <SoftBox mb={1} ml={0.5} lineHeight={0} display="inline-block">
                      <SoftTypography component="label" variant="caption" fontWeight="bold">
                        Ajouter le fournisseur à ma liste de Favoris
                      </SoftTypography>
                      <SoftBox ml={0.5} mb={0.25}>
                        <Switch onChange={() => {setFavorite(true)}} />
                      </SoftBox>
                      <SoftBox display="flex" justifyContent="flex-end" mt={3}>
                        <SoftBox mr={1}>
                          <SoftButton 
                            component={Link}
                            to="/suppliers"
                            color="light"
                          >
                            Annuler / Retour
                          </SoftButton>
                        </SoftBox>
                          <SoftButton
                            component={Link}
                            to="/suppliers"
                            variant="gradient" 
                            color="info"
                            onClick={handleSubmit}
                          >
                            Valider
                          </SoftButton>
                      </SoftBox>
                    </SoftBox>
                  </SoftBox>
                </SoftBox>
              </Card>
            </Grid>
          </Grid>
        </SoftBox>
        <Footer />
      </DashboardLayout>
    </>
  );
})