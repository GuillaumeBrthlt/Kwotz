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
import { useProjectStore } from "@contexts/ProjectContext";
import { useEffect } from "react";
import Sidenav from "@components/navbars/Sidenav";
import Header from "@pages/projectpage/components/Header";

const ProjectOverview = observer(() => {
  const projectStore = useProjectStore()
  
  useEffect(() => {
    projectStore.getProjects()
  }, [])
 

  function Button(id) {
    const link = `/projects/edit/${id}`
    return (
      <Link to={link}>
        <SoftButton variant="gradient" color="dark" size="small">
          Modifier
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
  
  const dataTableData = {
    columns: [
      { Header: "name", accessor: "name" },
      { Header: "nombre de Chambres froides", accessor: "coldRooms" },
      { Header: "Date de creation", accessor: "created_at" },
      { Header: "Statut", accessor: "status" },
      { Header: "Actions", accessor: "action" },
    ],
  
    rows: 
    projectStore.projects.map((project) => 
      ({
      name: project.name,
      coldRooms: project.cold_rooms.length,
      created_at: new Date(project.created_at).toLocaleString('fr-FR', { month: 'long', day: 'numeric', year: 'numeric' }),
      status: handleStatus(project.status),
      action: Button(project.id)
      })
    ),
  };

  return (
    <>
      <Sidenav />
      <DashboardLayout>
        <DashboardNavbar />
        <Header title="MES PROJETS"/>
        <SoftBox my={3}>
          <Card>
            <SoftBox display="flex" justifyContent="space-between" alignItems="flex-start" p={3}>
              <SoftBox lineHeight={1}>
                <SoftTypography variant="h5" fontWeight="medium">
                  Mes Projets
                </SoftTypography>
                <SoftTypography variant="button" fontWeight="regular" color="text">
                  Retrouvez sur cette page l'ensemble de vos projets
                </SoftTypography>
              </SoftBox>
            </SoftBox>
            <DataTable
              table={dataTableData}
              entriesPerPage={{
                defaultValue: 5,
                entries: [5, 10, 25],
              }}
            />
          </Card>
        </SoftBox>
        <Footer />
      </DashboardLayout>
    </>
  );
})

export default ProjectOverview;