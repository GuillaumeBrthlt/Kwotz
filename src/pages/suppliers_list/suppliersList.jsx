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
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { observer } from "mobx-react-lite";
import { useSupplierStore } from "@contexts/SupplierContext";
import { useUserStore } from "@contexts/UserContext";
import ContactCard from "@components/ContactCard";

// @mui material components
import Grid from "@mui/material/Grid";

// Soft UI Dashboard PRO React components
import SoftBox from "@components/SoftBox";

// Soft UI Dashboard PRO React example components
import DashboardLayout from "@components/LayoutContainers/DashboardLayout";

import Sidenav from "@components/navbars/Sidenav";
import Header from "@components/Header/index"

import ComplexProjectCard from "@pages/suppliers_list/components/complexProjectCard";
import PlaceholderCard from "@pages/suppliers_list/components/placeholderCard";
import SoftTypography from "@components/SoftTypography";
import { Card, Divider } from "@mui/material";
import { useState } from "react";
import SoftInput from "@components/SoftInput";

export const Suppliers = observer (() => {
  const supplierStore = useSupplierStore()
  const userStore = useUserStore()
  const [contacts, setContacts] = useState([])

  
  useEffect(() => {
    supplierStore.getSuppliers(userStore.user.id)
    supplierStore.getContacts(userStore.user.id)
  }, [])
    
  useEffect(() => {
    setContacts(supplierStore.contacts)
  },[supplierStore.contacts])

  function FilterContacts(value) {
    let filteredContacts = supplierStore.contacts.filter(contact => contact.first_name.toLowerCase().includes(value.toLowerCase()) || contact.last_name.toLowerCase().includes(value.toLowerCase()))
    setContacts(filteredContacts)
  }

  return (
    <>
    <Sidenav />
      <DashboardLayout>
        <Header title="MES FOURNISSEURS"/>
        <SoftBox pt={5} pb={2}>
          <Card>
            <SoftTypography mx={4} mt={2} variant="h3" color='text'>
              FOURNISSEURS
            </SoftTypography>
            <Divider />
            <SoftBox mt={{ xs: 1, lg: 3 }} mb={1}>
              <Grid container spacing={3} mb={4} px={2}>
                <Grid item xs={12} md={6} lg={4}>
                  <Link to="./new">
                    <PlaceholderCard 
                      title={{ variant: "h5", text: "Ajouter un fournisseur" }} 
                    />
                  </Link>
                </Grid>
                {supplierStore.suppliers.map(supplier => {
                  return (
                    <Grid item xs={12} md={6} lg={4} key={supplier.id}>
                      <ComplexProjectCard
                        supplier={supplier}
                      />
                    </Grid>
                  )
                })} 
              </Grid>
            </SoftBox>
          </Card>
          <Card sx={{marginTop: 4}}>
            <SoftTypography mx={4} mt={2} variant="h3" color='text'>
              CONTACTS
            </SoftTypography>
            <Grid item my={2} mx={2} xs={10} md={4}>
              <SoftInput
                placeholder="Rechercher..."
                onChange={(e) => FilterContacts(e.target.value)}
              />
            </Grid>
            <Divider />
            <SoftBox mt={{ xs: 1, lg: 3 }} mb={1}>
              <Grid item container spacing={2} mb={4} px={2}>
                {contacts.map(contact => {
                  return (
                    <Grid item xs={12} md={4} key={contact.id}>
                      <ContactCard contact={contact} />
                    </Grid>
                  )
                })}
              </Grid>
            </SoftBox>
          </Card>
        </SoftBox>
      </DashboardLayout>
    </>
  );
});

