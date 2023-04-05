import {useEffect} from 'react';
import { useProjectStore } from '@contexts/ProjectContext';
import { observer } from "mobx-react-lite";
import Card from "@mui/material/Card";

// Soft UI Dashboard PRO React components
import SoftBox from "@components/SoftBox";
import SoftTypography from "@components/SoftTypography";
import Sidenav from '@components/navbars/Sidenav';
import DashboardLayout from '@components/LayoutContainers/DashboardLayout';
import breakpoints from "@theme/base/breakpoints";

import { Grid } from '@mui/material';
import AppBar from "@mui/material/AppBar";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";

import ArrowBackIcon from '@mui/icons-material/ArrowBack';

import { useParams } from 'react-router-dom';
import Header from '@components/Header';
import { Previews } from './components/previews';
import { useUserStore } from '@contexts/UserContext';
import { useUserProfileStore } from '@contexts/UserProfileContext';
import SoftButton from '@components/SoftButton';
import { useNavigate } from 'react-router-dom';

import { Worker } from '@react-pdf-viewer/core';

import '@react-pdf-viewer/toolbar/lib/styles/index.css';
import '@react-pdf-viewer/core/lib/styles/index.css';
import PdfViewer from './components/PdfViewer';
import { useState } from 'react';

const ViewQuote = observer(() => {
  const {consultationID} = useParams()
  const projectStore = useProjectStore()
  const userStore = useUserStore()
  const userProfileStore = useUserProfileStore()
  const navigate = useNavigate()
  const [pdf, setPdf] = useState(0)
  const [tabsOrientation, setTabsOrientation] = useState("horizontal");

  const handleSetDocument = (event, newDocument) => setPdf(newDocument);

  useEffect(() => {
    function handleTabsOrientation() {
      return window.innerWidth < breakpoints.values.md
        ? setTabsOrientation("vertical")
        : setTabsOrientation("horizontal");
    }

    window.addEventListener("resize", handleTabsOrientation);

    handleTabsOrientation();

    return () => window.removeEventListener("resize", handleTabsOrientation);
  }, [tabsOrientation]);



  useEffect(() => {
   projectStore.getConsultation(consultationID)
   projectStore.getConsultations(userStore.user.id)
   userProfileStore.getProfileDetails(userStore.user.id)
  }, [])


  useEffect(() => {
    if (projectStore.consultations.length > 0) {
      projectStore.setResponse(consultationID)
    }
  }, [projectStore.consultations])



  return ( 
    <>
    <Sidenav />
    <DashboardLayout>
      <Header title={`Offre de prix pour le projet: ${projectStore.consultation ? projectStore.consultation.project.name : ''}`} />
      {projectStore.response ?
        <SoftBox my={3}>
          <Card>
            <Grid m={2}>
              <SoftButton color="error" onClick={() => {navigate(-1)}}>
                <ArrowBackIcon sx={{marginRight: 1}}/>
                Retour
              </SoftButton>
              <SoftTypography variant="h3" fontWeight="bold" color="text" sx={{marginTop: 4}}>
                DEVIS DE: {projectStore.response.email}
              </SoftTypography>
            </Grid>
            <Grid container mt={2}>
              <Grid item xs={12} md={8} container alignContent="center" justifyContent="center">
                {projectStore.response.document_url ? 
                <>
                  <AppBar position='static' sx={{margin: 2}}>
                    <Tabs orientation={tabsOrientation} value={pdf} onChange={handleSetDocument}>
                      {projectStore.response.document_url.map((document, index) => {
                        return (
                          <Tab label={`document ${index + 1}`} key={index}/>
                        )})
                      }
                    </Tabs>
                  </AppBar>
                    <Grid container spacing={2} justifyContent='center'>
                      {projectStore.response.document_url.map((document, index) => {
                        if (pdf  === index) {
                          return (
                            <Grid 
                              item 
                              xs={12}
                              sx={{
                                height: {xs: '500px', md: '800px'},
                                paddingBottom: 5,
                              }}
                              key={document}
                            >
                              <Worker workerUrl='https://unpkg.com/pdfjs-dist@3.3.122/build/pdf.worker.min.js'>
                                <PdfViewer fileUrl={document} />
                              </Worker>
                            </Grid>
                          )
                        }  
                      })}
                  </Grid>
                </>
              :
                <></>
              }
              </Grid>
              <Grid item xs={12} md={4} container flexDirection="column" justifyContent="center" p={4}>
                <Grid item>
                  <SoftTypography variant="h4" fontWeight="bold" color="primary" mb={2}>
                    Message du fournisseur:
                  </SoftTypography>
                </Grid>
                <Grid item>
                  <SoftTypography variant="body" fontWeight="regular" color="dark">
                    {projectStore.response.response_comment}
                  </SoftTypography>
                </Grid>
              </Grid>
            </Grid>
          </Card>
          <Grid item sm={12} xl={6}>
            <SoftTypography variant="h4" mb={-2} mt={3}>
              Rappel du projet:
            </SoftTypography>
              <Previews project={projectStore.response.project} coldRooms={projectStore.response.cold_rooms} user={userStore.user} profile={userProfileStore.profileDetails} spareParts={projectStore.response.spare_parts} ACs={projectStore.response.air_conditionnings}/> 
            </Grid>
        </SoftBox>
      :
        <></>
      }
    </DashboardLayout>
    </>
  )
})

export default ViewQuote;
