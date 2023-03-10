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
import { Modal, Button, Grid } from "@mui/material";

// Soft UI Dashboard PRO React components
import SoftBox from "@components/SoftBox";
import SoftInput from "@components/SoftInput";

// Soft UI Dashboard PRO React example components
import DashboardLayout from "@components/LayoutContainers/DashboardLayout";

import CloseIcon from '@mui/icons-material/Close';

// import dataTableData from "@pages/dashboard/data/dataTableData";
import { observer } from "mobx-react-lite";
import { useProjectStore } from "@contexts/ProjectContext";
import { useEffect } from "react";
import Sidenav from "@components/navbars/Sidenav";
import QuoteRequestsHeader from "@pages/projectpage/components/Header/QuoteRequestsHeader";
import { useState } from "react";
import { useUserStore } from "@contexts/UserContext";
import { Previews } from "@pages/projectpage/components/previews";
import { useUserProfileStore } from "@contexts/UserProfileContext";
import ConsultationCard from "./components/cards/ConsultationCard";

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

  
  const modalStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width:{xs: 350, md:'80%'},
    height: '90vh',
    overflow: 'auto'
  };

  const FilterConsultation = (value) => {
    const filteredConsultations = projectStore.consultations.filter(consultation => consultation.response_status && consultation.project.name.toLowerCase().includes(value.toLowerCase()))
    setQuotes(filteredConsultations)
  }

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
        <QuoteRequestsHeader title="MES DEVIS REÇUS"/>
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
          <Grid container spacing={3} rowSpacing={5} mb={2}>
            {quotes.sort((a, b) => new Date(b.received_at) - new Date(a.received_at)).map(quote => {
              return (
                <Grid item xs={12} md={4} key={quote.id}>
                  <ConsultationCard 
                    consultation={quote}
                    handleOpen={handleOpen}
                  />
                </Grid>
              )
            })}
          </Grid>
        </SoftBox>
      </DashboardLayout>
    </>
  );
})

export default QuotesOverview;