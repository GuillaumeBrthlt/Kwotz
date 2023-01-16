import {useEffect} from 'react';
import { useProjectStore } from '@contexts/ProjectContext';
import { observer } from "mobx-react-lite";
import Card from "@mui/material/Card";

// Soft UI Dashboard PRO React components
import SoftBox from "@components/SoftBox";
import SoftTypography from "@components/SoftTypography";
import SoftButton from '@components/SoftButton';

import { Link } from 'react-router-dom';
import { Grid } from '@mui/material';

import Document from '@theme/Icons/Document';

import VisibilityIcon from '@mui/icons-material/Visibility';

import DataTable from "@components/Tables/DataTable";
import { useState } from 'react';

const QuoteResponse = observer(({project}) => {
  const projectStore = useProjectStore()
  const id = project.user_id
  const [projectConsultations, setProjectConsultations] = useState([])

  useEffect(() => {
   projectStore.getConsultations(id)
  }, [])

  useEffect(() => {
    const thisProjectConsultations = projectStore.consultations.filter(consultation => consultation.project.id === project.id)
    setProjectConsultations(thisProjectConsultations)
  }, [projectStore.consultations])

  function handleProjectStatus(status) {
    switch (status) {
      case true:
        return <SoftTypography color='success' fontWeight="medium" variant="body2">devis reçu</SoftTypography>
      case false:
        return <SoftTypography color='error' fontWeight="medium" variant="body2">En attente de réception</SoftTypography>
    }
  }

  function Buttons(consultationId, response_status) {
    const link = `/consultation/response/${consultationId}`

    return (
      <>
        <Link to={link}>
          <SoftButton variant="gradient" color="info" size="small">
            <VisibilityIcon sx={{marginRight: 1}}/>
            Voir
          </SoftButton>
        </Link>
      </>  
    )
  } 

  const ConsultationsTable = {
    columns: [
      { Header: "Date d'envoi", accessor: "created_at" },
      { Header: "Destinataire", accessor: "sent_to" },
      { Header: "statut", accessor: "status" },
      { Header: "Actions", accessor: "action" }
    ],
  
    rows: 
    projectConsultations.map((consultation) =>
      ({
      created_at: new Date(consultation.created_at).toLocaleString('fr-FR', { month: 'long', day: 'numeric', year: 'numeric' }),
      sent_to: consultation.email,
      status: handleProjectStatus(consultation.response_status),
      action: Buttons(consultation.id, consultation.response_status) 
      })
    ),
  };

  return (
    <>
      <SoftBox my={3}>
        <Card>
          <SoftBox display="flex" justifyContent="space-between" alignItems="flex-start" p={3}>
            <SoftBox lineHeight={1}>
              <SoftTypography variant="h5" fontWeight="medium">
                Demandes de prix
              </SoftTypography>
              <SoftTypography variant="button" fontWeight="regular" color="text">
                Liste des demandes de prix liées à ce projet
              </SoftTypography>
            </SoftBox>
          </SoftBox>
          <DataTable
            table={ConsultationsTable}
            entriesPerPage={{
              defaultValue: 5,
              entries: [5, 10, 25],
            }}
            canSearch
          />
        </Card>
      </SoftBox>
      {/* {projectStore.consultations.map(consultation => {
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
    )} */}
  </>
  )
})

export default QuoteResponse;
