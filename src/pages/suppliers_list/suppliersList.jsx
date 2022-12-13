import { useState } from "react";

// @mui material components
import Grid from "@mui/material/Grid";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";

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
import { observer } from "mobx-react-lite";
import { useSupplierStore } from "@contexts/SupplierContext";
import { useEffect } from "react";


export const Suppliers = observer(() => {
  const supplierStore = useSupplierStore()



  const Suppliers = () => {
    const [suppliers, setSuppliers] = useState([]);

    useEffect(() => {
      supplierStore.getSupplierDetails(supplierID)
    }, [])

  // ComplexProjectCard dropdown menu state
  const [supplier1, setSupplier1] = useState(null);
  const [supplier2, setSupplier2] = useState(null);
  

  // TeamProfileCard dropdown menu handlers
  const openSupplier1 = (event) => setSupplier1(event.currentTarget);
  const closeSupplier1 = () => setSupplier1(null);
  const openSupplier2 = (event) => setSupplier2(event.currentTarget);
  const closeSupplier2 = () => setSupplier2(null);

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
      <MenuItem onClick={close}>Action</MenuItem>
      <MenuItem onClick={close}>Another action</MenuItem>
      <MenuItem onClick={close}>Something else here</MenuItem>
    </Menu>
  );

  return (
    <>
    <Sidenav />
      <DashboardLayout>
      <Header />
        <DashboardNavbar />
          <SoftBox pt={5} pb={2}>
            <Grid container>
              <Grid item xs={12} md={8}>
                <SoftBox mb={1}>
                  <SoftTypography variant="h5">Liste de tous les fournisseurs :</SoftTypography>
                </SoftBox>
                <SoftBox mb={2}>
                  <SoftTypography variant="body2" color="text">
                    Voici la liste de tous les fournisseurs que vous pouvez contacter ou ajouter à vos favoris.
                  </SoftTypography>
                </SoftBox>
              </Grid>
            </Grid>
            <SoftBox mt={{ xs: 1, lg: 3 }} mb={1}>
              <Grid container spacing={3}>
                <Grid item xs={12} md={6} lg={4}>
                  <ComplexProjectCard
                    title="Supplier Un"
                    description="description du premier fournisseur"
                    dropdown={{
                      action: openSupplier1,
                      menu: renderMenu(supplier1, closeSupplier1),
                    }}
                  />
                </Grid>
                <Grid item xs={12} md={6} lg={4}>
                  <ComplexProjectCard
                    title="Supplier Deux"
                    description="description du second fournisseur"
                    dropdown={{
                      action: openSupplier2,
                      menu: renderMenu(supplier2, closeSupplier2),
                    }}
                  />
                </Grid>
                
                <Grid item xs={12} md={6} lg={4}>
                  <PlaceholderCard title={{ variant: "h5", text: "Ajouter un fournisseur" }} />
                </Grid>
              </Grid>
            </SoftBox>
          </SoftBox>
        <Footer />
      </DashboardLayout>
    </>
  );
})

