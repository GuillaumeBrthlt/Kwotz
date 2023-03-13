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
import { Modal } from "@mui/material";
import { Grid } from "@mui/material";

// Soft UI Dashboard PRO React components
import SoftBox from "@components/SoftBox";
import SoftTypography from "@components/SoftTypography";
import SoftButton from "@components/SoftButton";
import SoftInput from "@components/SoftInput";

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
import { Link } from "react-router-dom";
import { useUserProfileStore } from "@contexts/UserProfileContext";
import { Previews } from "@pages/projectpage/components/previews";
import CloseIcon from '@mui/icons-material/Close';
import {Button} from "@mui/material";
import ConsultationCard from "@pages/projectpage/components/cards/ConsultationCard";

const QuoteRequestOverview = observer(() => {
  const projectStore = useProjectStore()
  const [unarchivedConsultations, setUnarchivedConsultations] = useState([])
  const [archivedConsultations, setArchivedConsultations] = useState([])
  const userStore = useUserStore()
  const userProfileStore = useUserProfileStore()
  const userID = userStore.user.id
  const [openPreview, setOpenPreview] = useState(false)
  const [consultationToPreview, setConsultationToPreview] = useState(null)

  
  useEffect(() => {
    projectStore.getProjects()
    projectStore.getConsultations(userID)
    userProfileStore.getProfileDetails(userID)
  }, [])

  useEffect(() => {
    if (projectStore.projects) {
      const archived = projectStore.consultations.filter((consultation) => consultation.project.status === "archived")
      const unarchived = projectStore.consultations.filter((consultation) => consultation.project.status !== "archived")
      setUnarchivedConsultations(unarchived)
      setArchivedConsultations(archived)
    }
  }, [projectStore.projects])

  function handleOpen(consultation) {
    setConsultationToPreview(consultation)
    setOpenPreview(true)
  }

  function handleClose() {
    setOpenPreview(false)
  }

  function Buttons(consultation, response_status, consultationId) {
    return (
      <>
        <SoftButton variant="gradient" color="info" size="small" onClick={() => {handleOpen(consultation);}}>
          <VisibilityIcon sx={{marginRight: 1}}/>
          projet
        </SoftButton>
        {
          response_status ?
            <Link to={`/projects/response/${consultationId}`}>
              <SoftButton variant="gradient" color="success" size="small" sx={{marginLeft: 2}}>
                <VisibilityIcon sx={{marginRight: 1}}/>
                devis
              </SoftButton>
            </Link>
          :
            <></>
        }
      </>  
    )
  } 

  function handleProjectStatus(status) {
    switch (status) {
      case true:
        return <SoftTypography color='success' fontWeight="medium" variant="body2">reçu</SoftTypography>
      case false:
        return <SoftTypography color='error' fontWeight="medium" variant="body2">En attente</SoftTypography>
    }
  }

  const FilterConsultation = (value) => {
    let filteredConsultations = projectStore.consultations.filter(consultation => consultation.project.status != "archived" && consultation.project.name.toLowerCase().includes(value.toLowerCase()))
    setUnarchivedConsultations(filteredConsultations)
  }

  const ArchivedConsultationsTable = {
    columns: [
      { Header: "nom du projet", accessor: "name" },
      { Header: "statut", accessor: "status" },
      { Header: "Destinataire", accessor: "sent_to" },
      { Header: "Date d'envoi", accessor: "created_at" },
      { Header: "Actions", accessor: "action" }
    ],
  
    rows: 
    archivedConsultations.map((consultation) =>
      ({
      name: consultation.project.name,
      created_at: new Date(consultation.created_at).toLocaleString('fr-FR', { month: 'long', day: 'numeric', year: 'numeric' }),
      sent_to: consultation.email,
      status: handleProjectStatus(consultation.response_status),
      action: Buttons(consultation, consultation.response_status, consultation.id) 
      })
    ),
  };

  const modalStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width:{xs: 350, md:'80%'},
    height: '90vh',
    overflow: 'auto'
  };

  return (
    <>
      <Sidenav />
      <DashboardLayout>
        <Modal
          open={openPreview}
          onClose={handleClose}
          aria-labelledby="sending-form"
          aria-describedby="sending-project-form"
          >
          <Card sx={modalStyle}>
            <Button color="secondary" sx={{marginLeft: 'auto'}} size='large' onClick={() => {handleClose()}}>
              <CloseIcon />
            </Button>
            <Previews 
              project={consultationToPreview ? consultationToPreview.project : ''} 
              coldRooms={consultationToPreview ? consultationToPreview.cold_rooms : ''} 
              user={userStore.user} 
              profile={userProfileStore.profileDetails}
              date={consultationToPreview ? consultationToPreview.created_at : ''}
              spareParts={consultationToPreview ? consultationToPreview.spare_parts : ''}
              ACs={consultationToPreview ? consultationToPreview.air_conditionnings : ''}
            />
          </Card>
        </Modal>
        <QuoteRequestsHeader title="MES DEMANDES DE PRIX"/>
        <SoftBox my={3}>
          <Grid container spacing={3} mb={6} mt={2} justifyContent="center">
            <Grid item xs={12} md={5}>
              <SoftInput 
                width='100%'
                placeholder='Rechercher par nom de projet...'
                onChange={(e) => FilterConsultation(e.target.value)}
              />
            </Grid>
          </Grid>
          <Grid container spacing={3} rowSpacing={5} mb={5}>
            {unarchivedConsultations.sort((a, b) => new Date(b.created_at) - new Date(a.created_at)).map(consultation => {
              return (
                <Grid item xs={12} md={4} key={consultation.id}>
                  <ConsultationCard 
                    consultation={consultation}
                    handleOpen={handleOpen}
                  />
                </Grid>
              )
            })}
          </Grid>
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