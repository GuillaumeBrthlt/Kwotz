import {useEffect} from 'react';
import { useProjectStore } from '@contexts/ProjectContext';
import { observer } from "mobx-react-lite";
import Card from "@mui/material/Card";

// Soft UI Dashboard PRO React components
import SoftBox from "@components/SoftBox";
import SoftTypography from "@components/SoftTypography";
import Sidenav from '@components/navbars/Sidenav';
import DashboardLayout from '@components/LayoutContainers/DashboardLayout';


import {Link} from '@mui/material';
import { Grid } from '@mui/material';

import Document from '@theme/Icons/Document';

import { useParams } from 'react-router-dom';
import { useUserStore } from '@contexts/UserContext';

const ViewQuote = observer(() => {
  const {consultationID} = useParams()
  const projectStore = useProjectStore()

  useEffect(() => {
   projectStore.getConsultation(consultationID)
  }, [])

  useEffect(() => {
    if (projectStore.consultation) {
      projectStore.getConsultations(projectStore.consultation.project.id)
    }
  },[projectStore.consultation])

  useEffect(() => {
    projectStore.setResponse(consultationID)
  }, [projectStore.consultations])

  return ( 
    <>
    <Sidenav />
    <DashboardLayout>
      {projectStore.response ?
        <SoftBox my={3}>
          <Card>
            <SoftBox p={3}>
              <SoftBox lineHeight={1}>
                <SoftTypography variant="h5" fontWeight="medium" color="primary">
                  Réponse de {projectStore.response.email}
                </SoftTypography>            
                <Grid>
                <SoftBox p={1} mt={2}>
                    <SoftBox
                      bgColor="light"
                      borderRadius="lg"
                      shadow="lg"
                      p={2}
                      variant="gradient"
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
                  <SoftBox  pt={2} px={1}>
                    <SoftTypography variant="h6" fontWeight="medium" mb={2}>
                      Voir pièce(s) jointe(s):
                    </SoftTypography>
                    <Grid display='flex' flexDirection="column" rowSpacing={2}>
                      {projectStore.response.document_url.map(document => {
                        return (
                        <Link rel="noopener noreferrer" target="_blank" href={document} key={document} variant="body2">
                          <Document /> Ouvrir
                        </Link>
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
        </SoftBox>
      :
        <></>
      }
    </DashboardLayout>
    </>
  )
})

export default ViewQuote;
