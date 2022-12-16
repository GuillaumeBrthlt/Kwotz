import {useEffect} from 'react';
import { useProjectStore } from '@contexts/ProjectContext';
import { observer } from "mobx-react-lite";
import Card from "@mui/material/Card";

// Soft UI Dashboard PRO React components
import SoftBox from "@components/SoftBox";
import SoftTypography from "@components/SoftTypography";
import {Link} from '@mui/material';
import { Grid } from '@mui/material';
import Document from '@theme/Icons/Document';

const QuoteResponse = observer(({project}) => {
  const projectStore = useProjectStore()
  const id = project.user_id

  useEffect(() => {
   projectStore.getConsultations(id)
  }, [])


  return (
    <>
      {projectStore.consultations.map(consultation => {
        if (consultation.project.id == project.id) {
          return (
            <SoftBox my={3} key={consultation.created_at}>
              <Card>
                <SoftBox p={3}>
                  <SoftBox lineHeight={1}>
                    {consultation.document_url || consultation.response_comment ? 
                      <>
                        <SoftTypography variant="h5" fontWeight="medium" color="primary">
                          Réponse de {consultation.email}
                        </SoftTypography>            
                        <Grid>
                          {consultation.document_url ? 
                          <SoftBox  pt={2} px={1}>
                            <SoftTypography variant="h6" fontWeight="medium" mb={2}>
                              Voir pièce(s) jointe(s):
                            </SoftTypography>
                            <Grid display='flex' flexDirection="column" rowSpacing={2}>
                              {consultation.document_url.map(document => {
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
                          <SoftBox p={1} mt={2}>
                            <SoftBox
                              bgColor="dark"
                              borderRadius="lg"
                              shadow="lg"
                              p={2}
                              variant="gradient"
                              lineHeight={1}
                            >
                              <SoftTypography variant="h6" fontWeight="medium" color="white">
                                Message:
                              </SoftTypography>
                              <SoftTypography variant="body2" fontWeight="regular" color="white">
                                {consultation.response_comment}
                              </SoftTypography>
                            </SoftBox>
                          </SoftBox>
                        </Grid>
                      </>
                    :
                      <>
                      <SoftTypography variant="h5" fontWeight="medium" color="secondary">
                        Pas encore de réponse de {consultation.email}
                      </SoftTypography>
                      </>
                    }
                  </SoftBox>
                </SoftBox>
              </Card>
            </SoftBox>
          )
        }
      }
    )}
  </>
  )
})

export default QuoteResponse;
