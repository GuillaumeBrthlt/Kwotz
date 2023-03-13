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
import { useState, useEffect } from "react";
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
import { Switch } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import {Button} from "@mui/material";

export const NewContact = observer(({supplier, handleCloseModal}) => {
  const [first_name, setFirst_name] = useState("")
  const [last_name, setLast_name] = useState("")
  const [email, setEmail] = useState("")
  const [phone, setPhone] = useState("")
  const [supplierAdress, setSupplierAdress] = useState(true)
  const [adress, setAdress] = useState("")
  const [zipcode, setZipcode] = useState("")
  const [city, setCity] = useState("")
  
  const supplierStore = useSupplierStore()
  const userStore = useUserStore()

    const newContactData = {
      "supplier_contact": {
        "first_name": first_name,
        "last_name": last_name,
        "email": email,
        "phone": phone,
        "adress": adress,
        "zipcode": zipcode,
        "city": city,
        "supplier_id": supplier.id
      }
    }
  
  useEffect(() => {
    if (supplierAdress) {
      setAdress(supplier.address)
      setZipcode(supplier.zipcode)
      setCity(supplier.city)
    } else {
      setAdress("")
      setZipcode("")
      setCity("")
    }
  }, [supplierAdress])
  

  const handleSubmit = () => {
    supplierStore.createNewContact(newContactData, userStore.user.id, supplier.id)
    handleCloseModal()
  }

  return (
    <SoftBox p={3}>
      <Card sx={{ overflow: "auto" }}>
        <SoftBox p={3}>
          <Grid container justifyContent='space-between'>
            <Grid item>
              <SoftTypography variant="h6" fontWeight="medium">
                Nouveau contact fournisseur
              </SoftTypography>
              <SoftTypography variant="button" fontWeight="regular" color="text">
                Ajouter un nouveau contact
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
                onChange={e => setPhone(e.target.value)}
              />
            </Grid>
          </Grid> 
          <Divider />
          <Grid container spacing={2} mt={1}>
            <Switch checked={supplierAdress} onClick={() => {setSupplierAdress(!supplierAdress)}}/>
            <SoftTypography
                variant="button"
                fontWeight="regular"
                onClick={() => {setSupplierAdress(!supplierAdress)}}
                sx={{ cursor: "pointer", userSelect: "none" }}
              >
                &nbsp;&nbsp;Reprendre l'adresse du fournisseur
              </SoftTypography>
              <Grid item xs={12}>
              <SoftTypography component="label" variant="caption" fontWeight="bold">
                Adresse
              </SoftTypography>
              <SoftInput 
                type="text"
                placeholder="adresse" 
                value={adress}
                disabled={supplierAdress}
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
                disabled={supplierAdress}
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
                disabled={supplierAdress}
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
                Valider
              </SoftButton>
          </SoftBox>
        </SoftBox>
      </Card>
    </SoftBox>
  );
})
