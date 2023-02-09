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
import { Modal, Button} from "@mui/material";

// Soft UI Dashboard PRO React components
import SoftBox from "@components/SoftBox";
import SoftTypography from "@components/SoftTypography";
import SoftButton from "@components/SoftButton";

// Soft UI Dashboard PRO React example components
import DashboardLayout from "@components/LayoutContainers/DashboardLayout";
import DataTable from "@components/Tables/DataTable";

import VisibilityIcon from '@mui/icons-material/Visibility';
import DraftsIcon from '@mui/icons-material/Drafts';
import MarkunreadIcon from '@mui/icons-material/Markunread';
import CloseIcon from '@mui/icons-material/Close';

// import dataTableData from "@pages/dashboard/data/dataTableData";
import { observer } from "mobx-react-lite";
import { useProjectStore } from "@contexts/ProjectContext";
import { useEffect } from "react";
import Sidenav from "@components/navbars/Sidenav";
import QuoteRequestsHeader from "@pages/projectpage/components/Header/QuoteRequestsHeader";
import { useState } from "react";
import { useUserStore } from "@contexts/UserContext";
import { Link } from "react-router-dom";
import { Previews } from "@pages/projectpage/components/previews";
import { useUserProfileStore } from "@contexts/UserProfileContext";

const QuotesOverview = observer(() => {
  const projectStore = useProjectStore()
  const [quotes, setQuotes] = useState([])
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
    const answeredConsultations = projectStore.consultations.filter(consultation => consultation.response_status)
    setQuotes(answeredConsultations)
  }, [projectStore.consultations])

  function handleOpen(consultation) {
    setConsultationToPreview(consultation)
    setOpenPreview(true)
  }

  function handleClose() {
    setOpenPreview(false)
  }

  function UnreadConsultation(read) {
    switch (read) {
      case true:
        return <DraftsIcon color="dark" fontSize="medium"/>
      case false:
        return <MarkunreadIcon color="success" fontSize="medium"/>
    }
  }

  function Buttons(consultation, consultationId) {
    return (
      <>
        <SoftButton variant="gradient" color="info" size="small" onClick={() => {handleOpen(consultation);}}>
          <VisibilityIcon sx={{marginRight: 1}}/>
          projet
        </SoftButton>
        <Link to={`/projects/response/${consultationId}`}>
          <SoftButton variant="gradient" color="success" size="small" sx={{marginLeft: 2}}>
            <VisibilityIcon sx={{marginRight: 1}}/>
            devis
          </SoftButton>
        </Link>
      </>  
    )
  } 

  const QuotesTable = {
    columns: [
      { Header: "lu / non lu", accessor: "read" },
      { Header: "Nom du projet", accessor: "name" },
      { Header: "Destinataire", accessor: "email" },
      { Header: "Date d'envoi", accessor: "created_at" },
      { Header: "Date de réception", accessor: "updated_at" },
      { Header: "Actions", accessor: "actions" },
    ],
  
    rows: 
    quotes.map((consultation) => 
      ({
      read: UnreadConsultation(consultation.read),
      updated_at: new Date(consultation.received_at).toLocaleString('fr-FR', { month: 'long', day: 'numeric', year: 'numeric' }),
      name: consultation.project.name,
      created_at: new Date(consultation.created_at).toLocaleString('fr-FR', { month: 'long', day: 'numeric', year: 'numeric' }),
      email: consultation.email,
      actions: Buttons(consultation, consultation.id)
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
          <Card>
            <SoftBox display="flex" justifyContent="space-between" alignItems="flex-start" p={3}>
              <SoftBox lineHeight={1}>
                <SoftTypography variant="h5" fontWeight="medium">
                  Mes devis reçus
                </SoftTypography>
                <SoftTypography variant="button" fontWeight="regular" color="text">
                  Liste complète des devis reçus
                </SoftTypography>
              </SoftBox>
            </SoftBox>
            <DataTable
              table={QuotesTable}
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

export default QuotesOverview;