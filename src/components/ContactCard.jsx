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

// prop-types is library for typechecking of props

// @mui material components
import Card from "@mui/material/Card";
import Divider from "@mui/material/Divider";
import {Avatar, Grid, Modal} from "@mui/material";
import { Link as ExternalLink } from "@mui/material"

// Soft UI Dashboard PRO React components
import SoftBox from "@components/SoftBox";
import SoftTypography from "@components/SoftTypography";
import { useSupplierStore } from "@contexts/SupplierContext";
import { Phone } from "@mui/icons-material";
import { Mail } from "@mui/icons-material";
import SoftButton from "@components/SoftButton";
import { Delete } from "@mui/icons-material";
import { Edit } from "@mui/icons-material";
import { useUserStore } from "@contexts/UserContext";
import { UpdateContact } from "@components/UpdateContact";
import { useState } from "react";

function ContactCard({ contact }) {
  const supplierStore = useSupplierStore()
  const userStore = useUserStore()
  const [openModal, setOpenModal] = useState(false)

  function stringToColor(string) {
    let hash = 0;
    let i;
  
    /* eslint-disable no-bitwise */
    for (i = 0; i < string.length; i += 1) {
      hash = string.charCodeAt(i) + ((hash << 5) - hash);
    }
  
    let color = '#';
  
    for (i = 0; i < 3; i += 1) {
      const value = (hash >> (i * 8)) & 0xff;
      color += `00${value.toString(16)}`.slice(-2);
    }
    /* eslint-enable no-bitwise */
  
    return color;
  }

  
  function stringAvatar(alias) {
    const aliasArray = alias.split(' ')
    return {
      sx: {
        bgcolor: stringToColor(alias),
      },
      children: `${aliasArray.map(string => string[0]).join('')}`,
    };
  }

  function companyAvatar() {
    const company = supplierStore.suppliers.find(supplier => supplier.id == contact.supplier_id).alias

    return (
      <>
      <Avatar {...stringAvatar(company)}/>
      </>
    )
  }

 function DisplayCompany() {
  const company = supplierStore.suppliers.find(supplier => supplier.id == contact.supplier_id).alias
  return company
 }

 function DeleteContact() {
  supplierStore.deleteContact(contact.id, userStore.user.id)
 }

 function handleOpenModal() {
  setOpenModal(true)
}

function handleCloseModal() {
  setOpenModal(false)
}

const modalStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '70%', // A good starting point
  height:'95vh',
  overflowY: 'scroll',
  '@media (max-width: 600px)': {
    width: '95%', 
  }
};

  return (
    <Card sx={{height: '100%'}}>
      <Modal
          open={openModal}
          onClose={handleCloseModal}
          aria-labelledby="sending-form"
          aria-describedby="sending-project-form"
        >
          <Grid sx={modalStyle}>
            <UpdateContact contact={contact} handleCloseModal={handleCloseModal} />
          </Grid>
      </Modal>
      <SoftBox 
        p={3}
        borderRadius="xl"
        shadow="xxl"
        bgColor='light'
        sx={{height: '100%'}}
      >
        <SoftBox display="flex" justifyContent="space-between" alignItems="center" mb={1}>
          <Grid container alignItems='center'>
            <Grid item xs={3}>
              {companyAvatar()}
            </Grid>
            <Grid item xs={9}>
              <SoftTypography
                variant="h5"
                fontWeight="medium"
                color="info"
                textTransform="capitalize"
                textGradient
                sx={{marginX: 'auto'}}
              >
                {contact.first_name + ' ' + contact.last_name}
              </SoftTypography>
            </Grid>
          </Grid>
        </SoftBox>
        <Divider />
        <SoftBox mb={1}>
          <SoftTypography variant="body1" color="text" fontWeight="bold">
            {DisplayCompany()}
          </SoftTypography>
          <SoftTypography variant="body2" color="text">
            {contact.adress}
          </SoftTypography>
          <SoftTypography variant="body2" color="text" sx={contact.adress || contact.city ? {} : {display: 'none'}}>
            {contact.zipcode + ', ' + contact.city}
          </SoftTypography>
          <Divider />
        </SoftBox>
        <SoftBox mb={1} sx={contact.phone ? {} : {display: 'none'}}>
          <ExternalLink href={`tel:${contact.phone}`}>
            <SoftButton sx={{width: '100%'}} color='success'>
              <Grid container alignItems='center'>
                <Grid item xs={1}>
                  <Phone />
                </Grid>
                <Grid item xs={11}>
                    <SoftTypography variant="body2" color='white' fontWeight="bold">
                      {contact.phone}
                    </SoftTypography>
                </Grid>
              </Grid>
            </SoftButton>
          </ExternalLink>
        </SoftBox>
        <SoftBox mb={1}>
          <ExternalLink href={`mailto:${contact.email}`}>
            <SoftButton sx={{width: '100%'}} color='info'>
              <Grid container alignItems='center'>
                <Grid item xs={1} justifySelf='flex-end'>
                  <Mail />
                </Grid>
                <Grid item xs={11}>
                    <SoftTypography variant="body2" color="white" fontWeight="bold">
                      {contact.email}
                    </SoftTypography>
                </Grid>
              </Grid>
            </SoftButton>
          </ExternalLink>
        </SoftBox>
        <Divider />
        <Grid container spacing={2} justifyContent="space-around">
          <Grid item xs={6} md={2}>
            <SoftBox mb={1}>
              <SoftButton sx={{width: '100%'}} color='dark' onClick={() => {handleOpenModal()}}>
                <Edit />
              </SoftButton>
            </SoftBox>
          </Grid>
          <Grid item xs={6} md={2}>
            <SoftBox mb={1}>
              <SoftButton 
                sx={{width: '100%'}} 
                color='error'
                onClick={() => {if(window.confirm("Etes-vous sûr de supprimer ce contact ?")){DeleteContact()}}}
              >
                <Delete />
              </SoftButton>
            </SoftBox>
          </Grid>
        </Grid>
      </SoftBox>
    </Card>
  );
}


export default ContactCard;