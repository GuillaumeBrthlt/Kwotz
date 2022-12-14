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
// react-router-dom components
import { Link } from "react-router-dom";

// @mui material components
import Card from "@mui/material/Card";
import Stack from "@mui/material/Stack";
import {Avatar} from "@mui/material";

// Soft UI Dashboard PRO React components
import SoftBox from "@components/SoftBox";
import SoftTypography from "@components/SoftTypography";
import SoftButton from "@components/SoftButton";

// Soft UI Dashboard PRO React example components
import DashboardLayout from "@components/LayoutContainers/DashboardLayout";
import DataTable from "@components/Tables/DataTable";

// Data
// import dataTableData from "@pages/dashboard/data/dataTableData";
import { observer } from "mobx-react-lite";
import { useProjectStore } from "../../contexts/ProjectContext";
import { useEffect } from "react";
import Sidenav from "@components/navbars/Sidenav";
import Header from "@components/Header";
import { Grid } from "@mui/material";
import { useUserStore } from "@contexts/UserContext";
import { useSupplierStore } from "@contexts/SupplierContext";

const Dashboard = observer(() => {
  const projectStore = useProjectStore()
  const userStore = useUserStore()
  const supplierStore = useSupplierStore()
  
  useEffect(() => {
    projectStore.getProjects()
    projectStore.getConsultations(userStore.user.id)
    supplierStore.getContacts(userStore.user.id)
  }, [])
 

  function handleStatus(status) {
    switch (status) {
      case "sent":
        return <SoftTypography color='success' fontWeight="medium" variant="body2">Envoyé en consultation</SoftTypography>
      case "pending":
        return <SoftTypography color='error' fontWeight="medium" variant="body2">Sauvegardé</SoftTypography>
    }
  }

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
  
  const ProjectsTable = {
    columns: [
      { Header: "Nom", accessor: "name" },
      { Header: "Date de creation", accessor: "created_at" },
      { Header: "Statut", accessor: "status" },
    ],
  
    rows: 
    projectStore.projects.map((project) => 
      ({
      name: project.name,
      created_at: new Date(project.created_at).toLocaleString('fr-FR', { month: 'long', day: 'numeric', year: 'numeric' }),
      status: handleStatus(project.status)
      })
    ),
  };

  const ConsultationsTable = {
    columns: [
      { Header: "Nom du projet", accessor: "name" },
      { Header: "Date d'envoi", accessor: "created_at" },
      { Header: "envoyé à", accessor: "email" },
    ],
  
    rows: 
    projectStore.consultations.map((consultation) => 
      ({
      name: consultation.project.name,
      created_at: new Date(consultation.created_at).toLocaleString('fr-FR', { month: 'long', day: 'numeric', year: 'numeric' }),
      email: consultation.email
      })
    ),
  };

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
      { Header: "Prénom", accessor: "first_name" },
      { Header: "Nom", accessor: "last_name" },
      { Header: "email", accessor: "email" },
    ],
  
    rows: 
    supplierStore.contacts.map((contact) => 
      ({
      company: companyAvatar(contact),
      first_name: contact.first_name,
      last_name: contact.last_name,
      email: contact.email
      })
    ),
  };

  return (
    <>
      <Sidenav />
      <DashboardLayout>
        <Header title="MON TABLEAU DE BORD"/>
        <Grid container spacing={4}>
          <Grid item xs={12} md={6} mt={3}>
            <SoftBox sx={{height: '100%'}}>
              <Card sx={{height: '100%'}}>
                <SoftBox display="flex" justifyContent="space-between" alignItems="flex-start" p={3}>
                  <SoftBox lineHeight={1}>
                    <SoftTypography variant="h5" fontWeight="medium">
                      Mes Projets
                    </SoftTypography>
                    <SoftTypography variant="button" fontWeight="regular" color="text">
                      liste des derniers projets
                    </SoftTypography>
                  </SoftBox>
                  <Stack spacing={1} direction="row">
                    <Link to="/projects">
                      <SoftButton variant="gradient" color="light" size="medium">
                        Voir mes projets
                      </SoftButton>
                    </Link>
                  </Stack>
                </SoftBox>
                <DataTable
                  table={ProjectsTable}
                  entriesPerPage={{
                    defaultValue: 5,
                    entries: [5, 10, 25],
                  }}
                />
              </Card>
            </SoftBox>
          </Grid>
          <Grid item xs={12} md={6} mt={3}>
            <SoftBox sx={{height: '100%'}}>
              <Card sx={{height: '100%'}}>
                <SoftBox display="flex" justifyContent="space-between" alignItems="flex-start" p={3}>
                  <SoftBox lineHeight={1}>
                    <SoftTypography variant="h5" fontWeight="medium">
                      Mes consultations
                    </SoftTypography>
                    <SoftTypography variant="button" fontWeight="regular" color="text">
                      dernières consultations envoyées
                    </SoftTypography>
                  </SoftBox>
                </SoftBox>
                <DataTable
                  table={ConsultationsTable}
                  entriesPerPage={{
                    defaultValue: 5,
                    entries: [5, 10, 25],
                  }}
                />
              </Card>
            </SoftBox>
          </Grid>
          <Grid item xs={12} md={6} my={3}>
            <SoftBox sx={{height: '100%'}}>
              <Card sx={{height: '100%'}}>
                <SoftBox display="flex" justifyContent="space-between" alignItems="flex-start" p={3}>
                  <SoftBox lineHeight={1}>
                    <SoftTypography variant="h5" fontWeight="medium">
                      Mes Contacts
                    </SoftTypography>
                  </SoftBox>
                </SoftBox>
                <DataTable
                  table={ContactsTable}
                  entriesPerPage={{
                    defaultValue: 5,
                    entries: [5, 10, 25],
                  }}
                />
              </Card>
            </SoftBox>
          </Grid>
        </Grid>
      </DashboardLayout>
    </>
  );
})

export default Dashboard;
