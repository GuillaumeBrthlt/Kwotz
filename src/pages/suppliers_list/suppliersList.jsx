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

// @mui material components
import Grid from "@mui/material/Grid";
import { Card, Avatar } from "@mui/material";
import {Stack} from "@mui/material";
import { Link as ExternalLink } from "@mui/material"

// Soft UI Dashboard PRO React components
import SoftBox from "@components/SoftBox";

// Soft UI Dashboard PRO React example components
import DashboardLayout from "@components/LayoutContainers/DashboardLayout";

import Sidenav from "@components/navbars/Sidenav";
import Header from "@components/Header/index"
import SoftTypography from "@components/SoftTypography";
import SoftButton from "@components/SoftButton";
import DataTable from "@components/Tables/DataTable";

import ComplexSupplierCard from "@pages/suppliers_list/components/complexSupplierCard";
import PlaceholderCard from "@pages/suppliers_list/components/placeholderCard";

export const Suppliers = observer (() => {
  const supplierStore = useSupplierStore()
  const userStore = useUserStore()

  
  useEffect(() => {
    supplierStore.getSuppliers(userStore.user.id)
    supplierStore.getContacts(userStore.user.id)
  }, [])

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

  function companyAvatar(contact) {
    const company = supplierStore.suppliers.find(supplier => supplier.id == contact.supplier_id).alias

    return (
      <>
      <Avatar {...stringAvatar(company)}/>
      </>
    )
  }

  const ContactsTable = {
    columns: [
      { Header: "Entreprise", accessor: "company" },
      { Header: "nom", accessor: "name" },
      { Header: "email", accessor: "email" },
      { Header: "téléphone", accessor: "phone" },
      { Header: "Adresse", accessor: "address" },
      { Header: "Ville", accessor: "city" },
    ],
  
    rows: 
    supplierStore.contacts.map((contact) => 
      ({
      company: companyAvatar(contact),
      name: `${contact.first_name} ${contact.last_name}`,
      email: <ExternalLink href={`mailto:${contact.email}`}><SoftTypography variant="button" color="text">{contact.email}</SoftTypography></ExternalLink>,
      phone: <ExternalLink href={`tel:${contact.phone}`}><SoftTypography variant="button" color="text">{contact.phone}</SoftTypography></ExternalLink>,
      address: contact.adress,
      city: contact.city ? `${contact.city} (${contact.zipcode})` : ''
      })
    ),
  };
    

  return (
    <>
    <Sidenav />
      <DashboardLayout>
        <Header title="MES FOURNISSEURS"/>
        <SoftBox pt={5} pb={2}>
          <SoftBox mt={{ xs: 1, lg: 3 }} mb={1}>
            <Grid container spacing={3}>
              {supplierStore.suppliers.map(supplier => {
                return (
                  <Grid item xs={12} md={6} lg={4} key={supplier.id}>
                    <ComplexSupplierCard
                      supplier={supplier}
                    />
                  </Grid>
                )
              })} 
              <Grid item xs={12} md={6} lg={4}>
                <Link to="./new">
                  <PlaceholderCard 
                    title={{ variant: "h5", text: "Ajouter un fournisseur" }} 
                  />
                </Link>
              </Grid>
            </Grid>
          </SoftBox>
          <SoftBox mt={6}>
              <Card>
                <SoftBox display="flex" justifyContent="space-between" alignItems="flex-start" p={3}>
                  <SoftBox lineHeight={1}>
                    <SoftTypography variant="h5" fontWeight="medium">
                      Mon carnet d'adresses
                    </SoftTypography>
                    <SoftTypography variant="button" fontWeight="regular" color="text">
                      liste de tous mes contacts
                    </SoftTypography>
                  </SoftBox>
                  <Stack spacing={1} direction="row">
                    <Link to="/suppliers">
                      <SoftButton variant="gradient" color="light" size="medium">
                        mes contacts
                      </SoftButton>
                    </Link>
                  </Stack>
                </SoftBox>
                <DataTable
                  table={ContactsTable}
                  entriesPerPage={{
                    defaultValue: 5,
                    entries: [5, 10, 25],
                  }}
                  canSearch
                />
              </Card>
            </SoftBox>
        </SoftBox>
      </DashboardLayout>
    </>
  );
});

