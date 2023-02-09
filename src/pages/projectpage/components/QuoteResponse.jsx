import {useEffect} from 'react';
import { useProjectStore } from '@contexts/ProjectContext';
import { observer } from "mobx-react-lite";
import Card from "@mui/material/Card";

// Soft UI Dashboard PRO React components
import SoftBox from "@components/SoftBox";
import SoftTypography from "@components/SoftTypography";
import SoftButton from '@components/SoftButton';

import { Link } from 'react-router-dom';

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
    const link = `/projects/response/${consultationId}`
    if (response_status) {
      return (
        <SoftTypography variant="body2">
          <Link to={link}>
            <SoftButton color="success" variant="gradient">Voir Devis</SoftButton>
          </Link>
        </SoftTypography>  
      )
    }
  } 

  const ConsultationsTable = {
    columns: [
      { Header: "Actions", accessor: "action" },
      { Header: "Destinataire", accessor: "sent_to" },
      { Header: "statut", accessor: "status" },
      { Header: "Date d'envoi", accessor: "created_at" }
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
    </>
  )
})

export default QuoteResponse;
