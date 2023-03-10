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

// Soft UI Dashboard PRO React components
import SoftBox from "@components/SoftBox";
import SoftTypography from "@components/SoftTypography";
import SoftButton from "@components/SoftButton";
import DefaultCounterCard from "@pages/dashboard/components/DefaultCounterCard";

// Soft UI Dashboard PRO React example components
import DashboardLayout from "@components/LayoutContainers/DashboardLayout";
import DataTable from "@components/Tables/DataTable";

// import dataTableData from "@pages/dashboard/data/dataTableData";
import { observer } from "mobx-react-lite";
import { useProjectStore } from "../../contexts/ProjectContext";
import { useEffect } from "react";
import Sidenav from "@components/navbars/Sidenav";
import Header from "@components/Header";
import { Divider, Grid } from "@mui/material";
import { useUserStore } from "@contexts/UserContext";
import { useSupplierStore } from "@contexts/SupplierContext";
import { useState } from "react";
import OutlinedCard from "./components/OutlinedCard";
import ContactCard from "@components/ContactCard";
import SoftInput from "@components/SoftInput";

const Dashboard = observer(() => {
  const projectStore = useProjectStore()
  const userStore = useUserStore()
  const supplierStore = useSupplierStore()
  const [quotes, setQuotes] = useState([])
  const [contacts, setContacts] = useState([])
  
  useEffect(() => {
    projectStore.getProjects()
    projectStore.getConsultations(userStore.user.id)
    supplierStore.getContacts(userStore.user.id)
  }, [])

  useEffect(() => {
    const answeredConsultations = projectStore.consultations.filter(consultation => consultation.response_status && consultation.project.status != "archived")
    setQuotes(answeredConsultations)
  }, [projectStore.consultations])

  useEffect(() => {
    setContacts(supplierStore.contacts)
  },[supplierStore.contacts])


  

  function CheckQuote(consultationID) {
    return (
      <Link to={`/projects/response/${consultationID}`}>
        <SoftButton variant="gradient" color="success" size="medium">
          Voir
        </SoftButton>
      </Link>
    )
  }

  function ModifyProject(projectID) {
    return (
      <Link to={`/projects/edit/${projectID}`}>
        <SoftButton variant="gradient" color="info" size="medium">
          Modifier
        </SoftButton>
      </Link>
    )
  }
  
  const ProjectsTable = {
    columns: [
      { Header: "Actions", accessor: "actions" },
      { Header: "Nom du projet", accessor: "name" },
      { Header: "Date de creation", accessor: "created_at" },
    ],
  
    rows: 
    projectStore.projects.filter(project => project.status == "pending").map((project) => 
      ({
      actions: ModifyProject(project.id),
      name: project.name,
      created_at: new Date(project.created_at).toLocaleString('fr-FR', { month: 'long', day: 'numeric', year: 'numeric' }),
      })
    ),
  };

  const ConsultationsTable = {
    columns: [
      { Header: "Nom du projet", accessor: "name" },
      { Header: "envoyé à", accessor: "email" },
      { Header: "Date d'envoi", accessor: "created_at" },
    ],
  
    rows: 
    projectStore.consultations.filter(consultation => consultation.project.status != "archived" && !consultation.response_status).map((consultation) => 
      ({
      name: consultation.project.name,
      created_at: new Date(consultation.created_at).toLocaleString('fr-FR', { month: 'long', day: 'numeric', year: 'numeric' }),
      email: consultation.email,
      })
    ),
  };

  const QuotesTable = {
    columns: [
      { Header: "Actions", accessor: "actions" },
      { Header: "Date de réception", accessor: "updated_at" },
      { Header: "Nom du projet", accessor: "name" },
      { Header: "De la part de", accessor: "email" },
    ],
  
    rows: 
    quotes.filter(quote => !quote.read).map((consultation) => 
      ({
      updated_at: new Date(consultation.received_at).toLocaleString('fr-FR', { month: 'long', day: 'numeric', year: 'numeric' }),
      name: consultation.project.name,
      email: consultation.email,
      actions: CheckQuote(consultation.id)
      })
    ),
  };

  const nbrSavedProjects = projectStore.projects.filter(project => project.status == "pending").length

  const nbrSentConsultations = projectStore.consultations.filter(consultation => consultation.response_status == false && consultation.project.status != "archived").length

  const nbrUnreadQuotes = projectStore.consultations.filter(consultation => consultation.response_status == true && !consultation.read).length

  function FilterContacts(value) {
    let filteredContacts = supplierStore.contacts.filter(contact => contact.first_name.toLowerCase().includes(value.toLowerCase()) || contact.last_name.toLowerCase().includes(value.toLowerCase()))
    setContacts(filteredContacts)
  }

  return (
    <>
      <Sidenav />
      <DashboardLayout>
        <Header title="MON TABLEAU DE BORD"/>
        <Grid container mt={4} justifyContent="center">
          <Link to="/projects/new">
            <SoftButton variant="gradient" color="success" size="medium">
              + créer un nouveau projet
            </SoftButton>
          </Link>
        </Grid>
        <SoftBox
            bgColor="light"
            variant="gradient"
            borderRadius="lg"
            shadow="lg"
            mt={4}
            sx={{
              padding: 2
            }}
          >
          <Grid container spacing={3}>   
            <Grid item container xs={12} md={3} spacing={3} alignContent="space-between">
              <Grid item xs={6} md={12} height={{xs: '100%', md: '45%'}}>
                <DefaultCounterCard
                  count={nbrUnreadQuotes}
                  title="devis non lus"
                  color="success"
                />
              </Grid>
              <Grid item xs={6} md={12} height={{xs: '100%', md: '45%'}}>
                <Link to='/projects/quotes'>
                  <OutlinedCard 
                    text="Mes devis"
                  />
                </Link>
              </Grid>
            </Grid>
            <Grid item xs={12} md={9}>
              <SoftBox sx={{height: '100%'}}>
                <Card sx={{height: '100%'}}>
                  <SoftBox display="flex" justifyContent="space-between" alignItems="flex-start" p={3}>
                    <SoftBox lineHeight={1}>
                      <SoftTypography variant="h5" fontWeight="medium">
                        Mes devis non lus
                      </SoftTypography>
                      <SoftTypography variant="button" fontWeight="regular" color="text">
                        liste des devis que vous n'avez pas encore ouvert
                      </SoftTypography>
                    </SoftBox>
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
        </SoftBox> 
        <SoftBox
          bgColor="light"
          variant="gradient"
          borderRadius="lg"
          shadow="lg"
          mt={4}
          sx={{
            padding: 2
          }}
        >
          <Grid container spacing={3}>
            <Grid item container xs={12} md={3} spacing={3} alignContent='space-between'>
              <Grid item xs={6} md={12} height={{xs: '100%', md: '45%'}}>
                <DefaultCounterCard
                  count={nbrSentConsultations}
                  title="Réponses attendues"
                  color="error"
                />
              </Grid>
              <Grid item xs={6} md={12} height={{xs: '100%', md: '45%'}}>
                <Link to='/projects/consultations'>
                  <OutlinedCard 
                    text="Mes demandes de prix"
                  />
                </Link>
              </Grid>
            </Grid>
            <Grid item xs={12} md={9}>
              <SoftBox sx={{height: '100%'}}>
                <Card sx={{height: '100%'}}>
                  <SoftBox display="flex" justifyContent="space-between" alignItems="flex-start" p={3}>
                    <SoftBox lineHeight={1}>
                      <SoftTypography variant="h5" fontWeight="medium">
                        Demandes en attente
                      </SoftTypography>
                      <SoftTypography variant="button" fontWeight="regular" color="text">
                        Demandes de prix sans réponse fournisseur
                      </SoftTypography>
                    </SoftBox>
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
          </Grid>
        </SoftBox>
        <SoftBox
          bgColor="light"
          variant="gradient"
          borderRadius="lg"
          shadow="lg"
          mt={4}
          sx={{
            padding: 2
          }}
        >
          <Grid container spacing={3}> 
            <Grid item container xs={12} md={3} spacing={3} alignContent="space-between">
              <Grid item xs={6} md={12} height={{xs: '100%', md: '45%'}}>
                <DefaultCounterCard
                  count={nbrSavedProjects}
                  title="Projets sauvegardés"
                  color="primary"
                />
              </Grid>
              <Grid item xs={6} md={12} height={{xs: '100%', md: '45%'}}>
                <Link to='/projects/all'>
                  <OutlinedCard 
                    text="Mes projets"
                  />
                </Link>
              </Grid>
            </Grid>
            <Grid item xs={12} md={9}>
              <SoftBox sx={{height: '100%'}}>
                <Card sx={{height: '100%'}}>
                  <SoftBox display="flex" justifyContent="space-between" alignItems="flex-start" p={3}>
                    <SoftBox lineHeight={1}>
                      <SoftTypography variant="h5" fontWeight="medium">
                        Projets à envoyer
                      </SoftTypography>
                      <SoftTypography variant="button" fontWeight="regular" color="text">
                        liste des projets qui ont été créés mais qui n'ont encore été envoyés à aucun fournisseur
                      </SoftTypography>
                    </SoftBox>
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
          </Grid>
        </SoftBox>
        <Grid container mt={4}>
          <Grid item xs={12} md={12} my={1}>
            <SoftBox sx={{height: '100%'}}>
              <Card sx={{height: '100%'}}>
                <SoftBox display="flex" justifyContent="space-between" alignItems="flex-start" p={3}>
                  <SoftBox lineHeight={1}>
                    <SoftTypography variant="h5" fontWeight="medium">
                      Mon carnet d'adresses
                    </SoftTypography>
                    <SoftTypography variant="button" fontWeight="regular" color="text">
                      Tous mes contacts
                    </SoftTypography>
                  </SoftBox>
                </SoftBox>
                <Grid item mb={2} mx={2} xs={10} md={4}>
                  <SoftInput
                    placeholder="Rechercher..."
                    onChange={(e) => FilterContacts(e.target.value)}
                  />
                </Grid>
                <Divider />
                <Grid item container spacing={2} mb={4} px={2}>
                  {contacts.map(contact => {
                    return (
                      <Grid item xs={12} md={4} key={contact.id}>
                        <ContactCard contact={contact} />
                      </Grid>
                    )
                  })}
                </Grid>
              </Card>
            </SoftBox>
          </Grid>
        </Grid>
      </DashboardLayout>
    </>
  );
})

export default Dashboard;
