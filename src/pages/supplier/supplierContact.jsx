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

// Soft UI Dashboard PRO React components
import SoftBox from "@components/SoftBox";
import SoftBadgeDot from "@components/SoftBadgeDot";

import { observer } from "mobx-react-lite";
import DashboardLayout from "@components/LayoutContainers/DashboardLayout";
import Header from "@components/Header";
import DashboardNavbar from "@components/navbars/DashboardNavbar";
import { Grid } from "@mui/material";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useSupplierStore } from "@contexts/SupplierContext";
import { useUserStore } from "@contexts/UserContext";
import Table from "@components/Tables/DataTable/Table";
import Footer from "@components/Footer"
import Sidenav from "@components/navbars/Sidenav";


const SupplierContacts = observer(() => {
  const { id } = useParams()
  const supplierStore = useSupplierStore()
  const userStore = useUserStore()
  const [contacts, setContacts]= useState([])

  useEffect(() => {
    if (supplierStore.suppliers) {
      supplierStore.getDetails(userStore.user.id, id)
    }
  }, [])

  useEffect(() => {
    if(supplierStore.details) {
      setContacts(supplierStore.details.supplier_contacts)
    }
  }, [supplierStore.details])

  const columns = [
    { name: "Prénom", align: "left" },
    { name: "Nom", align: "left" },
    { name: "email", align: "center" },
  ]

  const rows = contacts.length > 0 ? contacts.map(contact => ({
    key: contact.id,
    email: contact.email,
    Prénom: contact.first_name,
    Nom: contact.last_name
  })) : []

  return (
    <>
      <Sidenav />
      <DashboardLayout>
        <Header title={supplierStore.details ? supplierStore.details.alias : ''}/>
        <Grid container my={3}>
          <Table columns={columns} rows={rows} />
        </Grid>
      </DashboardLayout>
    </>
  )
})

export default SupplierContacts;