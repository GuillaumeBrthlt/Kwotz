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

// Soft UI Dashboard PRO React components
import SoftBox from "@components/SoftBox";
import SoftTypography from "@components/SoftTypography";
import SoftButton from "@components/SoftButton";

// Soft UI Dashboard PRO React example components
import DashboardLayout from "@components/LayoutContainers/DashboardLayout";
import DashboardNavbar from "@components/navbars/DashboardNavbar";
import DataTable from "@components/Tables/DataTable";

// Data
// import dataTableData from "@pages/dashboard/data/dataTableData";
import { observer } from "mobx-react-lite";
import Footer from "@components/Footer";
import { useProjectStore } from "../../contexts/ProjectContext";
import { useEffect } from "react";
import Sidenav from "@components/navbars/Sidenav";
import Header from "@components/Header";
import { Grid } from "@mui/material";
import { useUserStore } from "@contexts/UserContext";

const Dashboard = observer(() => {
  const projectStore = useProjectStore()
  const userStore = useUserStore()
  
  useEffect(() => {
    projectStore.getProjects()
    projectStore.getConsultations(userStore.user.id)
  }, [])
 

  function Button({ id }) {
    const link = `/projects/edit/${id}`
    return (
      <Link to={link}>
        <SoftButton variant="gradient" color="dark" size="small">
          Voir details
        </SoftButton>
      </Link>
    )
  } 

  function handleStatus(status) {
    switch (status) {
      case "sent":
        return <SoftTypography color='success' fontWeight="medium" variant="body2">Envoyé en consultation</SoftTypography>
      case "pending":
        return <SoftTypography color='error' fontWeight="medium" variant="body2">Sauvegardé</SoftTypography>
    }
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

  return (
    <>
      <Sidenav />
      <DashboardLayout>
        <DashboardNavbar />
        <Header title="MON TABLEAU DE BORD"/>
        <Grid container spacing={4}>
          <Grid item xs={12} md={6}>
            <SoftBox my={3}>
              <Card>
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
                    <Link to="/new_project">
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
          <Grid item xs={12} md={6}>
          <SoftBox my={3}>
              <Card>
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
        </Grid>
        
        <Footer />
      </DashboardLayout>
    </>
  );
})

export default Dashboard;
