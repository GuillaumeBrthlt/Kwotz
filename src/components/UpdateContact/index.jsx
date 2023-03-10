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

// @mui material components
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import Divider from "@mui/material/Divider";

// Soft UI Dashboard PRO React components
import SoftBox from "@components/SoftBox";
import SoftTypography from "@components/SoftTypography";
import SoftInput from "@components/SoftInput";
import SoftButton from "@components/SoftButton";
import CloseIcon from '@mui/icons-material/Close';
import {Button} from "@mui/material";
import { useUserStore } from "@contexts/UserContext";

export const UpdateContact = observer(({contact, handleCloseModal}) => {
  const [first_name, setFirst_name] = useState(contact.first_name)
  const [last_name, setLast_name] = useState(contact.last_name)
  const [email, setEmail] = useState(contact.email)
  const [phone, setPhone] = useState(contact.phone)
  const [adress, setAdress] = useState(contact.adress)
  const [zipcode, setZipcode] = useState(contact.zipcode)
  const [city, setCity] = useState(contact.city)
  
  const supplierStore = useSupplierStore()
  const userStore = useUserStore()

    const contactData = {
      "supplier_contact": {
        "first_name": first_name,
        "last_name": last_name,
        "email": email,
        "phone": phone,
        "adress": adress,
        "zipcode": zipcode,
        "city": city,
        "supplier_id": contact.supplier_id
      }
    }

  const handleSubmit = () => {
    supplierStore.updateContact(contactData, contact.id, userStore.user.id)
    handleCloseModal()
  }

  return (
    <SoftBox p={3}>
      <Card sx={{ overflow: "auto" }}>
        <SoftBox p={3}>
          <Grid container justifyContent='space-between'>
            <Grid item>
              <SoftTypography variant="h6" fontWeight="medium">
                Modifier le contact
              </SoftTypography>
            </Grid>
            <Grid item>
              <Button color="secondary" sx={{marginLeft: 'auto'}} size='large' onClick={() => {handleCloseModal()}}>
                <CloseIcon />
              </Button>
            </Grid>
          </Grid>
          <Divider />
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <SoftTypography component="label" variant="caption" fontWeight="bold">
                Prénom
              </SoftTypography>
              <SoftInput 
              type="text"
              placeholder="Prénom" 
              value={first_name}
              onChange={e => setFirst_name(e.target.value)}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <SoftTypography component="label" variant="caption" fontWeight="bold">
                Nom
              </SoftTypography>
              <SoftInput 
                type="text"
                placeholder="Nom" 
                value={last_name}
                onChange={e => setLast_name(e.target.value)}
              />
            </Grid>
          </Grid>
          <Grid container spacing={2} mt={1}>
            <Grid item xs={12} md={6}>
              <SoftTypography component="label" variant="caption" fontWeight="bold">
                email
              </SoftTypography>
              <SoftInput 
                type="text"
                placeholder="adresse email" 
                value={email}
                onChange={e => setEmail(e.target.value)}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <SoftTypography component="label" variant="caption" fontWeight="bold">
                téléphone
              </SoftTypography>
              <SoftInput 
                type="text"
                placeholder="numéro de téléphone" 
                value={phone}
                onChange={e => setPhone(e.target.value)}
              />
            </Grid>
          </Grid> 
          <Divider />
          <Grid container spacing={2} mt={1}>
            <Grid item xs={12}>
              <SoftTypography component="label" variant="caption" fontWeight="bold">
                Adresse
              </SoftTypography>
              <SoftInput 
                type="text"
                placeholder="adresse" 
                value={adress}
                onChange={e => setAdress(e.target.value)}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <SoftTypography component="label" variant="caption" fontWeight="bold">
                Code postal
              </SoftTypography>
              <SoftInput 
                type="text"
                placeholder="code postal" 
                value={zipcode}
                onChange={e => setZipcode(e.target.value)}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <SoftTypography component="label" variant="caption" fontWeight="bold">
                Ville
              </SoftTypography>
              <SoftInput 
                type="text"
                placeholder="Ville" 
                value={city}
                onChange={e => setCity(e.target.value)}
              />
            </Grid>
          </Grid>
          <Divider />
          <SoftBox display="flex" justifyContent="space-between" mt={3}>
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
                Modifier
              </SoftButton>
          </SoftBox>
        </SoftBox>
      </Card>
    </SoftBox>
  );
})
