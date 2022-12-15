import {useState, useEffect} from 'react';
import { useProjectStore } from '@contexts/ProjectContext';
import { observer } from "mobx-react-lite";
import Card from "@mui/material/Card";

// Soft UI Dashboard PRO React components
import SoftBox from "@components/SoftBox";
import SoftTypography from "@components/SoftTypography";
import SoftButton from "@components/SoftButton";
import {PropagateLoader} from 'react-spinners'

// Data
// import dataTableData from "@pages/dashboard/data/dataTableData";

const QuoteResponse = observer(({project}) => {
  const projectStore = useProjectStore()

  useEffect(() => {
    projectStore.getConsultation(project.id)
    console.log(projectStore.consultation)
  }, [])
  
  
  return (
    <div>
    {projectStore.consultation.response_comment == null ? (
      <Grid display='flex' height='100vh' justifyContent='center' alignItems='center'>
        <PropagateLoader color="#36d7b7"/>
      </Grid>) : (
    <SoftBox my={3}>
      <Card>
        <SoftBox display="flex" justifyContent="space-between" alignItems="flex-start" p={3}>
          <SoftBox lineHeight={1}>
            <SoftTypography variant="h5" fontWeight="medium">
              Réponse Fournisseur
            </SoftTypography>            
            <Card>
              <SoftBox display="flex" justifyContent="space-between" alignItems="centers" pt={2} px={2}>
                <SoftTypography variant="h6" fontWeight="medium">
                  Voir pièce(s) jointe(s)
                </SoftTypography>
                <SoftButton variant="gradient" color="dark" size="small">
                  ouvrir
                </SoftButton>
              </SoftBox>
              <SoftBox p={2}>
                <SoftBox mt={6} mb={3} lineHeight={0}>
                </SoftBox>
                <SoftBox
                  bgColor="dark"
                  borderRadius="lg"
                  shadow="lg"
                  p={2}
                  variant="gradient"
                  lineHeight={1}
                >
                  <SoftTypography variant="h6" fontWeight="medium" color="white">
                    Commentaire:
                  </SoftTypography>
                  <SoftBox mb={3}>
                    <SoftTypography variant="button" fontWeight="regular" color="white">
                    </SoftTypography>
                  </SoftBox>
                </SoftBox>
              </SoftBox>
            </Card>
          </SoftBox>
        </SoftBox>
      </Card>
    </SoftBox>
  )}
  </div>
  )
})

export default QuoteResponse;
