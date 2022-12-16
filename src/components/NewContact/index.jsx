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
import { useUserStore } from "@contexts/UserContext";

// @mui material components
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import Divider from "@mui/material/Divider";

// Soft UI Dashboard PRO React components
import SoftBox from "@components/SoftBox";
import SoftTypography from "@components/SoftTypography";
import SoftInput from "@components/SoftInput";
import SoftButton from "@components/SoftButton";

export const NewContact = observer(({supplier, handleCloseModal}) => {
  const [first_name, setFirst_name] = useState(null)
  const [last_name, setLast_name] = useState(null)
  const [email, setEmail] = useState(null)
  
  const supplierStore = useSupplierStore()
  const userStore = useUserStore()

    const newContactData = {
      "supplier_contact": {
        "first_name": first_name,
        "last_name": last_name,
        "email": email,
        "supplier_id": supplier.id
      }
    }
  

  const handleSubmit = () => {
    supplierStore.createNewContact(newContactData, userStore.user.id, supplier.id)
    handleCloseModal()
  }

  return (
    <>
      <SoftBox p={3}>
        <Grid container spacing={3} justifyContent="center">
          <Grid item xs={12} lg={6}>
            <Card sx={{ overflow: "visible" }}>
              <SoftBox p={2} lineHeight={1}>
                <SoftTypography variant="h6" fontWeight="medium">
                  Nouveau contact fournisseur
                </SoftTypography>
                <SoftTypography variant="button" fontWeight="regular" color="text">
                  Ajouter un nouveau contact
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
                      Prénom
                    </SoftTypography>
                  </SoftBox>
                  <SoftInput 
                    type="text"
                    placeholder="Prénom" 
                    onChange={e => setFirst_name(e.target.value)}
                    />
                  <Divider />
                  <SoftBox mb={1} ml={0.5} lineHeight={0} display="inline-block">
                    <SoftTypography component="label" variant="caption" fontWeight="bold">
                      Nom
                    </SoftTypography>
                  </SoftBox>
                  <SoftInput 
                    type="text"
                    placeholder="Nom" 
                    onChange={e => setLast_name(e.target.value)}
                    />
                  <Divider />
                  <SoftBox mb={1} ml={0.5} lineHeight={0} display="inline-block">
                    <SoftTypography component="label" variant="caption" fontWeight="bold">
                      email
                    </SoftTypography>
                  </SoftBox>
                  <SoftInput 
                    type="text"
                    placeholder="email" 
                    onChange={e => setEmail(e.target.value)}
                    />
                  <Divider />
                  
                  <SoftBox mb={1} ml={0.5} lineHeight={0} display="inline-block">
                    <SoftBox display="flex" justifyContent="flex-end" mt={3}>
                      <SoftBox mr={1}>
                        <SoftButton 
                          color="light"
                          onClick={handleCloseModal}
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
    </>
  );
})
