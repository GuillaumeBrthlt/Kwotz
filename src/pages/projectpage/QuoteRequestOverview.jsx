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

// @mui material components
import Card from "@mui/material/Card";

// Soft UI Dashboard PRO React components
import SoftBox from "@components/SoftBox";
import SoftTypography from "@components/SoftTypography";
import SoftButton from "@components/SoftButton";

// Soft UI Dashboard PRO React example components
import DashboardLayout from "@components/LayoutContainers/DashboardLayout";
import DataTable from "@components/Tables/DataTable";

import VisibilityIcon from '@mui/icons-material/Visibility';

// import dataTableData from "@pages/dashboard/data/dataTableData";
import { observer } from "mobx-react-lite";
import { useProjectStore } from "@contexts/ProjectContext";
import { useEffect } from "react";
import Sidenav from "@components/navbars/Sidenav";
import QuoteRequestsHeader from "@pages/projectpage/components/Header/QuoteRequestsHeader";
import { useState } from "react";
import { useUserStore } from "@contexts/UserContext";

const QuoteRequestOverview = observer(() => {
  const projectStore = useProjectStore()
  const [unarchivedConsultations, setUnarchivedConsultations] = useState([])
  const [archivedConsultations, setArchivedConsultations] = useState([])
  const userStore = useUserStore()
  const userID = userStore.user.id

  
  useEffect(() => {
    projectStore.getProjects()
    projectStore.getConsultations(userID)
  }, [])

  useEffect(() => {
    if (projectStore.projects) {
      const archived = projectStore.consultations.filter((consultation) => consultation.project.status === "archived")
      const unarchived = projectStore.consultations.filter((consultation) => consultation.project.status !== "archived")
      setUnarchivedConsultations(unarchived)
      setArchivedConsultations(archived)
    }
  }, [projectStore.projects])


  function Buttons(id, response_status) {
    return (
      <>
        <SoftButton variant="gradient" color="info" size="small">
          <VisibilityIcon sx={{marginRight: 1}}/>
          Voir le projet
        </SoftButton>
      </>  
    )
  } 

  function handleProjectStatus(status) {
    switch (status) {
      case true:
        return <SoftTypography color='success' fontWeight="medium" variant="body2">devis reçu</SoftTypography>
      case false:
        return <SoftTypography color='error' fontWeight="medium" variant="body2">En attente de réception</SoftTypography>
    }
  }

  const unarchivedConsultationsTable = {
    columns: [
      { Header: "Date d'envoi", accessor: "created_at" },
      { Header: "nom du projet", accessor: "name" },
      { Header: "Destinataire", accessor: "sent_to" },
      { Header: "statut", accessor: "status" },
      { Header: "Actions", accessor: "action" }
    ],
  
    rows: 
    unarchivedConsultations.map((consultation) =>
      ({
      name: consultation.project.name,
      created_at: new Date(consultation.created_at).toLocaleString('fr-FR', { month: 'long', day: 'numeric', year: 'numeric' }),
      sent_to: consultation.email,
      status: handleProjectStatus(consultation.response_status),
      action: Buttons(consultation.project.id, consultation.response_status) 
      })
    ),
  };

  const ArchivedConsultationsTable = {
    columns: [
      { Header: "Date d'envoi", accessor: "created_at" },
      { Header: "nom du projet", accessor: "name" },
      { Header: "Destinataire", accessor: "sent_to" },
      { Header: "statut", accessor: "status" },
      { Header: "Actions", accessor: "action" }
    ],
  
    rows: 
    archivedConsultations.map((consultation) =>
      ({
      name: consultation.project.name,
      created_at: new Date(consultation.created_at).toLocaleString('fr-FR', { month: 'long', day: 'numeric', year: 'numeric' }),
      sent_to: consultation.email,
      status: handleProjectStatus(consultation.response_status),
      action: Buttons(consultation.project.id, consultation.response_status) 
      })
    ),
  };

  return (
    <>
      <Sidenav />
      <DashboardLayout>
        <QuoteRequestsHeader title="MES DEMANDES DE PRIX"/>
        <SoftBox my={3}>
          <Card>
            <SoftBox display="flex" justifyContent="space-between" alignItems="flex-start" p={3}>
              <SoftBox lineHeight={1}>
                <SoftTypography variant="h5" fontWeight="medium">
                  Mes demandes de prix
                </SoftTypography>
                <SoftTypography variant="button" fontWeight="regular" color="text">
                  Liste complète des projets qui n'ont pas été archivés
                </SoftTypography>
              </SoftBox>
            </SoftBox>
            <DataTable
              table={unarchivedConsultationsTable}
              entriesPerPage={{
                defaultValue: 5,
                entries: [5, 10, 25],
              }}
              canSearch
            />
          </Card>
        </SoftBox>
        <SoftBox my={3}>
          <Card>
            <SoftBox display="flex" justifyContent="space-between" alignItems="flex-start" p={3}>
              <SoftBox lineHeight={1}>
                <SoftTypography variant="h5" fontWeight="medium">
                  Demandes de prix des projets archivés
                </SoftTypography>

              </SoftBox>
            </SoftBox>
            <DataTable
              table={ArchivedConsultationsTable}
              entriesPerPage={{
                defaultValue: 5,
                entries: [5, 10, 25],
              }}
              canSearch
            />
          </Card>
        </SoftBox>
      </DashboardLayout>
    </>
  );
})

export default QuoteRequestOverview;