import {useEffect} from 'react';
import { useProjectStore } from '@contexts/ProjectContext';
import { observer } from "mobx-react-lite";
import Card from "@mui/material/Card";

// Soft UI Dashboard PRO React components
import SoftBox from "@components/SoftBox";
import SoftTypography from "@components/SoftTypography";
import Sidenav from '@components/navbars/Sidenav';
import DashboardLayout from '@components/LayoutContainers/DashboardLayout';

import { Grid } from '@mui/material';

import ArrowBackIcon from '@mui/icons-material/ArrowBack';

import { useParams } from 'react-router-dom';
import Header from '@components/Header';
import { Previews } from './components/previews';
import { useUserStore } from '@contexts/UserContext';
import { useUserProfileStore } from '@contexts/UserProfileContext';
import SoftButton from '@components/SoftButton';
import { useNavigate } from 'react-router-dom';

import { Viewer } from '@react-pdf-viewer/core';
import { Worker } from '@react-pdf-viewer/core';
import { toolbarPlugin } from '@react-pdf-viewer/toolbar';
import { ToolbarSlot, TransformToolbarSlot } from '@react-pdf-viewer/toolbar';

import '@react-pdf-viewer/toolbar/lib/styles/index.css';
import '@react-pdf-viewer/core/lib/styles/index.css';

const ViewQuote = observer(() => {
  const {consultationID} = useParams()
  const projectStore = useProjectStore()
  const userStore = useUserStore()
  const userProfileStore = useUserProfileStore()
  const navigate = useNavigate()

  useEffect(() => {
   projectStore.getConsultation(consultationID)
   projectStore.getConsultations(userStore.user.id)
   userProfileStore.getProfileDetails(userStore.user.id)
  }, [])

  const toolbarPluginInstance = toolbarPlugin();
  const { renderDefaultToolbar, Toolbar } = toolbarPluginInstance;

  const transform = (slot) => ({
      ...slot,
      // These slots will be empty
      Open: () => null,
      SwitchTheme: () => null,
  });

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
            </Grid>
            <SoftBox p={3}>
              <SoftBox lineHeight={1}>        
                <Grid>
                  <SoftTypography variant="h5" fontWeight="medium" color="primary">
                    Devis re??u de la part de {projectStore.response.email}
                  </SoftTypography>
                  <SoftBox p={1} mt={2}>    
                    <SoftBox
                      bgColor="light"
                      borderRadius="lg"
                      shadow="lg"
                      p={2}
                      lineHeight={1}
                    >
                      <SoftTypography variant="h5" fontWeight="bold" color="dark" mb={2}>
                        Message du fournisseur:
                      </SoftTypography>
                      <SoftTypography variant="body2" fontWeight="regular" color="dark">
                        {projectStore.response.response_comment}
                      </SoftTypography>
                    </SoftBox>
                  </SoftBox>
                  {projectStore.response.document_url ? 
                  <SoftBox  pt={2} px={1} mt={1} bgColor="light" borderRadius="lg" sx={{marginX: 1}}>
                    <Grid container spacing={2} justifyContent='center'>
                      {projectStore.response.document_url.map(document => {
                        return (
                          <Grid 
                            item 
                            xs={12}
                            md={10} 
                            sx={{
                              maxHeight: '800px',
                              paddingBottom: 5,
                            }}
                            key={document}
                          >
                            <Grid mb={1}>
                              <Toolbar>{renderDefaultToolbar(transform)}</Toolbar>
                            </Grid>
                            <Worker workerUrl='https://unpkg.com/pdfjs-dist@3.3.122/build/pdf.worker.min.js'>
                              <Viewer 
                                fileUrl={document} 
                                plugins={[toolbarPluginInstance]}
                              />
                            </Worker>
                          </Grid>
                        )
                      })}
                    </Grid>
                  </SoftBox>
                  :
                    <></>
                  }
                </Grid>
              </SoftBox>
            </SoftBox>
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
