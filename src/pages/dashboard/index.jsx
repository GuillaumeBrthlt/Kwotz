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
// react-router-dom components
import { Link } from "react-router-dom";

// @mui material components
import Card from "@mui/material/Card";
import Stack from "@mui/material/Stack";
import {Avatar} from "@mui/material";
import { Link as ExternalLink } from "@mui/material"

// Soft UI Dashboard PRO React components
import SoftBox from "@components/SoftBox";
import SoftTypography from "@components/SoftTypography";
import SoftButton from "@components/SoftButton";
import DefaultCounterCard from "@pages/dashboard/components/DefaultCounterCard";

// Soft UI Dashboard PRO React example components
import DashboardLayout from "@components/LayoutContainers/DashboardLayout";
import DataTable from "@components/Tables/DataTable";

import DraftsIcon from '@mui/icons-material/Drafts';
import MarkunreadIcon from '@mui/icons-material/Markunread';

// import dataTableData from "@pages/dashboard/data/dataTableData";
import { observer } from "mobx-react-lite";
import { useProjectStore } from "../../contexts/ProjectContext";
import { useEffect } from "react";
import Sidenav from "@components/navbars/Sidenav";
import Header from "@components/Header";
import { Grid } from "@mui/material";
import { useUserStore } from "@contexts/UserContext";
import { useSupplierStore } from "@contexts/SupplierContext";
import { useState } from "react";

const Dashboard = observer(() => {
  const projectStore = useProjectStore()
  const userStore = useUserStore()
  const supplierStore = useSupplierStore()
  const [quotes, setQuotes] = useState([])
  
  useEffect(() => {
    projectStore.getProjects()
    projectStore.getConsultations(userStore.user.id)
    supplierStore.getContacts(userStore.user.id)
  }, [])

  useEffect(() => {
    const answeredConsultations = projectStore.consultations.filter(consultation => consultation.response_status)
    setQuotes(answeredConsultations)
  }, [projectStore.consultations])


  function handleProjectStatus(status) {
    switch (status) {
      case "sent":
        return <SoftTypography color='success' fontWeight="medium" variant="body2">Envoyé en consultation</SoftTypography>
      case "pending":
        return <SoftTypography color='error' fontWeight="medium" variant="body2">Sauvegardé</SoftTypography>
    }
  }

  function handleConsultationStatus(status) {
    switch (status) {
      case true:
        return <SoftTypography color='success' fontWeight="medium" variant="body2">devis reçu</SoftTypography>
      case false:
        return <SoftTypography color='error' fontWeight="regular" variant="body2">En attente de réception</SoftTypography>
    }
  }

  function UnreadConsultation(read) {
    switch (read) {
      case true:
        return <DraftsIcon color="dark" fontSize="medium"/>
      case false:
        return <MarkunreadIcon color="success" fontSize="medium"/>
    }
  }
  


  function stringToColor(string) {
    let hash = 0;
    let i;
  
    /* eslint-disable no-bitwise */
    for (i = 0; i < string.length; i += 1) {
      hash = string.charCodeAt(i) + ((hash << 5) - hash);
    }
  
    let color = '#';
  
    for (i = 0; i < 3; i += 1) {
      const value = (hash >> (i * 8)) & 0xff;
      color += `00${value.toString(16)}`.slice(-2);
    }
    /* eslint-enable no-bitwise */
  
    return color;
  }

  
  function stringAvatar(alias) {
    const aliasArray = alias.split(' ')
    return {
      sx: {
        bgcolor: stringToColor(alias),
      },
      children: `${aliasArray.map(string => string[0]).join('')}`,
    };
  }
  
  const ProjectsTable = {
    columns: [
      { Header: "Date de creation", accessor: "created_at" },
      { Header: "Nom du projet", accessor: "name" },
      { Header: "Statut", accessor: "status" },
    ],
  
    rows: 
    projectStore.projects.map((project) => 
      ({
      name: project.name,
      created_at: new Date(project.created_at).toLocaleString('fr-FR', { month: 'long', day: 'numeric', year: 'numeric' }),
      status: handleProjectStatus(project.status)
      })
    ),
  };

  const ConsultationsTable = {
    columns: [
      { Header: "Date d'envoi", accessor: "created_at" },
      { Header: "Nom du projet", accessor: "name" },
      { Header: "envoyé à", accessor: "email" },
      { Header: "statut", accessor: "status" },
    ],
  
    rows: 
    projectStore.consultations.map((consultation) => 
      ({
      name: consultation.project.name,
      created_at: new Date(consultation.created_at).toLocaleString('fr-FR', { month: 'long', day: 'numeric', year: 'numeric' }),
      email: consultation.email,
      status: handleConsultationStatus(consultation.response_status)
      })
    ),
  };

  const QuotesTable = {
    columns: [
      { Header: "lu / non lu", accessor: "read" },
      { Header: "Date de réception", accessor: "updated_at" },
      { Header: "Date d'envoi", accessor: "created_at" },
      { Header: "Nom du projet", accessor: "name" },
      { Header: "envoyé à", accessor: "email" },
    ],
  
    rows: 
    quotes.map((consultation) => 
      ({
      read: UnreadConsultation(consultation.read),
      updated_at: new Date(consultation.received_at).toLocaleString('fr-FR', { month: 'long', day: 'numeric', year: 'numeric' }),
      name: consultation.project.name,
      created_at: new Date(consultation.created_at).toLocaleString('fr-FR', { month: 'long', day: 'numeric', year: 'numeric' }),
      email: consultation.email,
      })
    ),
  };

  function companyAvatar(contact) {
    const company = supplierStore.suppliers.find(supplier => supplier.id == contact.supplier_id).alias

    return (
      <>
      <Avatar {...stringAvatar(company)}/>
      </>
    )
  }

  const ContactsTable = {
    columns: [
      { Header: "Entreprise", accessor: "company" },
      { Header: "nom", accessor: "name" },
      { Header: "email", accessor: "email" },
      { Header: "téléphone", accessor: "phone" },
      { Header: "Adresse", accessor: "address" },
      { Header: "Ville", accessor: "city" },
    ],
  
    rows: 
    supplierStore.contacts.map((contact) => 
      ({
      company: companyAvatar(contact),
      name: `${contact.first_name} ${contact.last_name}`,
      email: <ExternalLink href={`mailto:${contact.email}`}><SoftTypography variant="button" color="text">{contact.email}</SoftTypography></ExternalLink>,
      phone: <ExternalLink href={`tel:${contact.phone}`}><SoftTypography variant="button" color="text">{contact.phone}</SoftTypography></ExternalLink>,
      address: contact.adress,
      city: contact.city ? `${contact.city} (${contact.zipcode})` : ''
      })
    ),
  };

  const nbrProjects = projectStore.projects.length

  const nbrSavedProjects = projectStore.projects.filter(project => project.status == "pending").length

  const nbrSentConsultations = projectStore.consultations.filter(consultation => consultation.response_status == false).length

  const nbrUnreadQuotes = projectStore.consultations.filter(consultation => consultation.response_status == true && consultation.read == false).length

  return (
    <>
      <Sidenav />
      <DashboardLayout>
        <Header title="MON TABLEAU DE BORD"/>
        <Grid container spacing={3} mt={2}>     
          <Grid item xs={6} md={3}>
            <DefaultCounterCard
              count={nbrProjects}
              title="Projets"
              description="Nombre total de projets"
            />
          </Grid>
          <Grid item xs={6} md={3}>
            <DefaultCounterCard
              count={nbrSavedProjects}
              title="Projets sauvegardés"
              description="Demandes de prix à envoyer"
              color="warning"
            />
          </Grid>
          <Grid item xs={6} md={3}>
            <DefaultCounterCard
              count={nbrSentConsultations}
              title="Réponses attendues"
              description="demandes de prix non répondues"
              color="error"
            />
          </Grid>
          <Grid item xs={6} md={3}>
            <DefaultCounterCard
              count={nbrUnreadQuotes}
              title="devis reçus"
              description="non lus"
              color="success"
            />
          </Grid>
        </Grid>
        <Grid container spacing={4}>
          <Grid item xs={12} mt={3}>
            <SoftBox sx={{height: '100%'}}>
              <Card sx={{height: '100%'}}>
                <SoftBox display="flex" justifyContent="space-between" alignItems="flex-start" p={3}>
                  <SoftBox lineHeight={1}>
                    <SoftTypography variant="h5" fontWeight="medium">
                      Mes devis reçus
                    </SoftTypography>
                    <SoftTypography variant="button" fontWeight="regular" color="text">
                      Mes derniers devis reçus
                    </SoftTypography>
                  </SoftBox>
                  <Stack spacing={2} direction="row">
                    <Link to="/projects/quotes">
                      <SoftButton variant="gradient" color="light" size="medium">
                        mes devis
                      </SoftButton>
                    </Link>
                  </Stack>
                </SoftBox>
                <DataTable
                  table={QuotesTable}
                  entriesPerPage={{
                    defaultValue: 5,
                    entries: [5, 10, 25],
                  }}
                />
              </Card>
            </SoftBox>
          </Grid>
        </Grid>
        <Grid container spacing={4}>
          <Grid item xs={12} md={6} mt={3}>
            <SoftBox sx={{height: '100%'}}>
              <Card sx={{height: '100%'}}>
                <SoftBox display="flex" justifyContent="space-between" alignItems="flex-start" p={3}>
                  <SoftBox lineHeight={1}>
                    <SoftTypography variant="h5" fontWeight="medium">
                      Mes Projets
                    </SoftTypography>
                    <SoftTypography variant="button" fontWeight="regular" color="text">
                      liste des derniers projets
                    </SoftTypography>
                  </SoftBox>
                  <Stack spacing={2} direction="row">
                    <Link to="/projects/new">
                      <SoftButton variant="gradient" color="success" size="medium">
                        Nouveau
                      </SoftButton>
                    </Link>
                    <Link to="/projects/all">
                      <SoftButton variant="gradient" color="light" size="medium">
                        mes projets
                      </SoftButton>
                    </Link>
                  </Stack>
                </SoftBox>
                <DataTable
                  table={ProjectsTable}
                  entriesPerPage={{
                    defaultValue: 5,
                    entries: [5, 10, 25],
                  }}
                />
              </Card>
            </SoftBox>
          </Grid>
          <Grid item xs={12} md={6} mt={3}>
            <SoftBox sx={{height: '100%'}}>
              <Card sx={{height: '100%'}}>
                <SoftBox display="flex" justifyContent="space-between" alignItems="flex-start" p={3}>
                  <SoftBox lineHeight={1}>
                    <SoftTypography variant="h5" fontWeight="medium">
                      Mes demandes de prix
                    </SoftTypography>
                    <SoftTypography variant="button" fontWeight="regular" color="text">
                      dernières demandes de prix envoyées
                    </SoftTypography>
                  </SoftBox>
                  <Stack spacing={1} direction="row">
                    <Link to="/projects/consultations">
                      <SoftButton variant="gradient" color="light" size="medium">
                        mes demandes de prix
                      </SoftButton>
                    </Link>
                  </Stack>
                </SoftBox>
                <DataTable
                  table={ConsultationsTable}
                  entriesPerPage={{
                    defaultValue: 5,
                    entries: [5, 10, 25],
                  }}
                />
              </Card>
            </SoftBox>
          </Grid>
          <Grid item xs={12} md={12} my={1}>
            <SoftBox sx={{height: '100%'}}>
              <Card sx={{height: '100%'}}>
                <SoftBox display="flex" justifyContent="space-between" alignItems="flex-start" p={3}>
                  <SoftBox lineHeight={1}>
                    <SoftTypography variant="h5" fontWeight="medium">
                      Mon carnet d'adresses
                    </SoftTypography>
                    <SoftTypography variant="button" fontWeight="regular" color="text">
                      liste de mes contacts
                    </SoftTypography>
                  </SoftBox>
                  <Stack spacing={1} direction="row">
                    <Link to="/suppliers">
                      <SoftButton variant="gradient" color="light" size="medium">
                        mes contacts
                      </SoftButton>
                    </Link>
                  </Stack>
                </SoftBox>
                <DataTable
                  table={ContactsTable}
                  entriesPerPage={{
                    defaultValue: 5,
                    entries: [5, 10, 25],
                  }}
                  canSearch
                />
              </Card>
            </SoftBox>
          </Grid>
        </Grid>
      </DashboardLayout>
    </>
  );
})

export default Dashboard;
