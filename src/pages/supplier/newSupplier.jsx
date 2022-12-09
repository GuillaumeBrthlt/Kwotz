import { useState } from "react";
import { observer } from "mobx-react-lite";
import { useSupplierStore } from "../../contexts/SupplierContext";

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

export const NewSupplier = observer(() => {
  const [alias, setAlias] = useState(null)
  const [address, setAddress] = useState(null)
  const [city, setCity] = useState(null)
  const [zipcode, setZipcode] = useState(null)
  const [favorite, setfavorite] = useState(null)

  const supplierStore = useSupplierStore()

    const supplierData = {
      "supplier": {
        "alias": alias,
        "address": address,
        "city": city,
        "zipcode": zipcode,
        "favorite": true
      }
    }
    
  function handleKeyDown(e) {
    if (e.key === 'Enter') {
      handleSupplier()
    }
  }

  const handleSubmit = () => {
      supplierStore.createSupplier(supplierData)
      console.log(supplierData)
  }

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
                      Ajouter à ma liste de Favoris
                    </SoftTypography>

                    <SoftButton 
                      variant="outlined" 
                      color="dark" 
                      size="small"

                    >
                      Ajouter
                    </SoftButton>

                    <SoftBox display="flex" justifyContent="flex-end" mt={3}>
                      <SoftBox mr={1}>
                        <SoftButton 
                          
                          color="light"

                        >
                          Annuler
                        </SoftButton>
                      </SoftBox>
                      <SoftButton 
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
  );
})