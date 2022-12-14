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
import { useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { observer } from "mobx-react-lite";

import { useSupplierStore } from "@contexts/SupplierContext";
import { useUserStore } from "@contexts/UserContext";

// @mui material components
import Grid from "@mui/material/Grid";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Icon from '@mui/material/Icon';


// Soft UI Dashboard PRO React components
import SoftBox from "@components/SoftBox";
import SoftTypography from "@components/SoftTypography";

// Soft UI Dashboard PRO React example components
import DashboardLayout from "@components/LayoutContainers/DashboardLayout";
import DashboardNavbar from "@components/navbars/DashboardNavbar";
import Footer from "@components/Footer";
import Sidenav from "@components/navbars/Sidenav";
import Header from "@components/Header/index"

import ComplexProjectCard from "@pages/suppliers_list/components/complexProjectCard";
import PlaceholderCard from "@pages/suppliers_list/components/placeholderCard";

export const Suppliers = observer (() => {
  const supplierStore = useSupplierStore()
  const userStore = useUserStore()


  // ComplexProjectCard dropdown menu state
  const [supplier1, setSupplier1] = useState(null);
  
  useEffect(() => {
    supplierStore.getSuppliers(userStore.user.id)
  }, [])

  // Destroy supplier card
  function commitDestroy() {
    supplierStore.deleteSupplier(id)
  }

  // TeamProfileCard dropdown menu handlers
  const openSupplier1 = (event) => setSupplier1(event.currentTarget);
  const closeSupplier1 = () => setSupplier1(null);

  // Dropdown menu template for the ComplexProjectCard
  const renderMenu = (state, close) => (
    <Menu
      anchorEl={state}
      anchorOrigin={{ vertical: "top", horizontal: "left" }}
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      open={Boolean(state)}
      onClose={close}
      keepMounted
    >
      <MenuItem onClick={close}>
        <Link to="./new">
          Ajouter un contact
        </Link>
      </MenuItem>
      <MenuItem onClick={close}>
        <Link to="./new">
          Voir ce fournisseur
        </Link>
      </MenuItem>
      <MenuItem onClick={() => commitDestroy(id)}>
        Supprimer ce fournisseur 
        <Icon color="error">delete</Icon>
      </MenuItem>
    </Menu>
  );

  return (
    <>
    <Sidenav />
      <DashboardLayout>
        <DashboardNavbar />
        <Header title="MES FOURNISSEURS"/>
          <SoftBox pt={5} pb={2}>
            <SoftBox mt={{ xs: 1, lg: 3 }} mb={1}>
              <Grid container spacing={3}>
                {supplierStore.suppliers.map(supplier => {
                  return (
                    <Grid item xs={12} md={6} lg={4} key={supplier.id}>
                      <ComplexProjectCard
                        supplier={supplier}
                        dropdown={{
                          action: openSupplier1,
                          menu: renderMenu(supplier1, closeSupplier1),
                        }}
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
          </SoftBox>
        <Footer />
      </DashboardLayout>
    </>
  );
});

