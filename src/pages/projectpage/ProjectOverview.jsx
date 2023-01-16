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
import { Grid, Modal, Button } from "@mui/material";

// Soft UI Dashboard PRO React components
import SoftBox from "@components/SoftBox";
import SoftTypography from "@components/SoftTypography";
import SoftButton from "@components/SoftButton";
import SoftInput from "@components/SoftInput";
import SoftSelect from "@components/SoftSelect";

// Soft UI Dashboard PRO React example components
import DashboardLayout from "@components/LayoutContainers/DashboardLayout";
import DataTable from "@components/Tables/DataTable";

import DeleteIcon from '@mui/icons-material/Delete';
import VisibilityIcon from '@mui/icons-material/Visibility';
import EditIcon from '@mui/icons-material/Edit';
import SendIcon from '@mui/icons-material/Send';
import CloseIcon from '@mui/icons-material/Close';

import Separator from "@pages/projectpage/components/Separator"

// Data
// import dataTableData from "@pages/dashboard/data/dataTableData";
import { observer } from "mobx-react-lite";
import { useProjectStore } from "@contexts/ProjectContext";
import { useSupplierStore } from "@contexts/SupplierContext";
import { useEffect } from "react";
import Sidenav from "@components/navbars/Sidenav";
import ProjectsHeader from "@pages/projectpage/components/Header/ProjectsHeader";
import { useState } from "react";
import { useUserStore } from "@contexts/UserContext";

const ProjectOverview = observer(() => {
  const projectStore = useProjectStore()
  const [unarchivedProjects, setUnarchivedProjects] = useState([])
  const [archivedProjects, setArchivedProjects] = useState([])
  const [email, setEmail] = useState("")
  const [open, setOpen] = useState(false)
  const [sent, setSent] = useState(false)
  const [supplier, setSupplier] = useState(null)
  const [contact, setContact] = useState(null)
  const [projectToSend, setProjectToSend] = useState(null)
  const [alreadySent, setAlreadySent] = useState(false)
  const userStore = useUserStore()
  const userID = userStore.user.id
  const supplierStore = useSupplierStore()
  
  useEffect(() => {
    projectStore.getProjects()
    supplierStore.getSuppliers(userID)
    projectStore.getConsultations(userID)
  }, [])

  useEffect(() => {
    if (projectStore.projects) {
      const archived = projectStore.projects.filter((project) => project.status === "archived")
      const unarchived = projectStore.projects.filter((project) => project.status !== "archived")
      setUnarchivedProjects(unarchived)
      setArchivedProjects(archived)
    }
  }, [projectStore.projects])

  function ArchiveProject(id) {
    const payload = {
      project: {
        status: 'archived'
      }
    }
    projectStore.updateProject(id, payload)
  }

  function sendMail() {
    const payload = {
      project_id: projectToSend,
      email: email
    }
    projectStore.sendProject(payload)
    setSent(true)
  }
  
  function handleOpen() {
    setSent(false)
    setOpen(true)
  }

  function handleClose() {
    setOpen(false)
  }

  function SupplierSelector() {
    const supplierOptions = supplierStore.suppliers.map(supplier => (
      {value: supplier, label: supplier.alias}
    ))

    return(
      <SoftSelect
        options={supplierOptions} 
        value={supplier ? {label: supplier.alias} : null}
        onChange={selectedSupplier => {setSupplier(selectedSupplier.value)}}
      />
    )
  }

  function CheckAlreadySent(email) {
    const sameConsultation = projectStore.consultations.filter(consultation => consultation.email === email && consultation.project.id === projectToSend)
    console.log(sameConsultation)
    if (sameConsultation.length > 0) {
      setAlreadySent(true)
    } else {
      setAlreadySent(false)
    }
  }

  function ContactSelector() {
    const displayContact = (contact) => {
      return (
        contact.first_name + " " + contact.last_name
      )
    }

    if (supplier) {
      const contactOptions = supplier.supplier_contacts.map(contact => (
        {value: contact, label: displayContact(contact)}
      ))

      return(
        <SoftSelect 
          options={contactOptions}
          value={contact ? {label: displayContact(contact)} : null}
          onChange={selectedContact => {setContact(selectedContact.value); setEmail(selectedContact.value.email); CheckAlreadySent(selectedContact.value.email)}}
        />
      )
    }
  }

  const modalStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width:{xs: 350, md:600}
  };

  function UnarchivedButtons(id) {
    const link = `/projects/view/${id}`
    const editLink = `/projects/edit/${id}`
    return (
      <>
        <Link to={link}>
          <SoftButton variant="gradient" color="info" size="small">
            <VisibilityIcon />
          </SoftButton>
        </Link>
        <Link to={editLink}>
          <SoftButton variant="gradient" color="dark" size="small" sx={{marginLeft: 2}}>
            <EditIcon />
          </SoftButton>
        </Link>
        <SoftButton color='success' size='small' sx={{marginLeft: 2}} onClick={() => {setProjectToSend(id); handleOpen()}}>
          <SendIcon />
        </SoftButton>
        <SoftButton color='error' size='small' sx={{marginLeft: 2}} onClick={() => {if(window.confirm("Etes-vous sûr de vouloir archiver ce projet ? vous ne pourrez plus l'envoyer ou le supprimer")){ArchiveProject(id)}}}>
          <DeleteIcon />
        </SoftButton>
      </>  
    )
  } 

  function ArchivedButtons(id) {
    const link = `/projects/view/${id}`
    return (
      <>
        <Link to={link}>
          <SoftButton variant="gradient" color="info" size="small">
            Détails
          </SoftButton>
        </Link>
      </>  
    )
  } 

  function handleProjectStatus(status) {
    switch (status) {
      case "sent":
        return <SoftTypography color='success' fontWeight="medium" variant="body2">demande de prix envoyée</SoftTypography>
      case "pending":
        return <SoftTypography color='error' fontWeight="medium" variant="body2">En attente d'envoi</SoftTypography>
    }
  }

  const unarchivedProjectsTable = {
    columns: [
      { Header: "Date de creation", accessor: "created_at" },
      { Header: "nom du projet", accessor: "name" },
      { Header: "nombre de Chambres froides", accessor: "coldRooms" },
      { Header: "statut", accessor: "status" },
      { Header: "Actions", accessor: "action" }
    ],
  
    rows: 
    unarchivedProjects.map((project) =>
      ({
      name: project.name,
      coldRooms: project.cold_rooms.length,
      created_at: new Date(project.created_at).toLocaleString('fr-FR', { month: 'long', day: 'numeric', year: 'numeric' }),
      status: handleProjectStatus(project.status),
      action: UnarchivedButtons(project.id) 
      })
    ),
  };

  const ArchivedProjectsTable = {
    columns: [
      { Header: "Date de creation", accessor: "created_at" },
      { Header: "nom du projet", accessor: "name" },
      { Header: "nombre de Chambres froides", accessor: "coldRooms" },
      { Header: "Actions", accessor: "action" }
    ],
  
    rows: 
    archivedProjects.map((project) =>
      ({
      name: project.name,
      coldRooms: project.cold_rooms.length,
      created_at: new Date(project.created_at).toLocaleString('fr-FR', { month: 'long', day: 'numeric', year: 'numeric' }),
      action: ArchivedButtons(project.id) 
      })
    ),
  };

  return (
    <>
      <Sidenav />
      <DashboardLayout>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="sending-form"
          aria-describedby="sending-project-form"
        >
          <Card sx={modalStyle}>
            <Button color="secondary" sx={{marginLeft: 'auto'}} size='large' onClick={() => {handleClose()}}>
              <CloseIcon />
            </Button>
            <SoftTypography  variant='h4' textAlign='center' mb={3}>
                {sent ? "Votre demande de prix a bien été envoyée!" : "Envoyer la demande prix"}
            </SoftTypography>
            <Grid container spacing={2} justifyContent='center' mb={2} mt={1} sx={sent ? {display: 'none'}: {}}>
              <Grid item xs={12}>
                <SoftTypography textAlign='center'>
                  Choisissez parmis vos contacts:
                </SoftTypography>
              </Grid>
              <Grid item xs={12}>
                <Grid container spacing={2} px={1}>
                  <Grid item xs={12} md={6}>
                    <SoftTypography variant="caption">
                      fournisseur:
                    </SoftTypography>
                    <SupplierSelector />
                  </Grid>
                  <Grid item xs={12} md={6} sx={supplier ? {} : {display: 'none'}}>
                    <SoftTypography variant="caption">
                      Contact:
                    </SoftTypography>
                    <ContactSelector />
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={12}>
                <Separator />
                <SoftTypography textAlign='center'>
                  Tapez l'adresse email:
                </SoftTypography>
              </Grid>
              <Grid item xs={11} md={8}>
                <SoftInput 
                  placeholder="email du contact"
                  value={email}
                  onChange={(e) => {setEmail(e.target.value); CheckAlreadySent(e.target.value)}}
                />
              </Grid>
              <Grid item>
                <SoftButton 
                  variant="gradient" 
                  color="success" 
                  size="medium"
                  disabled={alreadySent}
                  onClick={() => {sendMail()}}
                >
                  {alreadySent ? "Déjà envoyée à ce contact" : "Envoyer"}
                </SoftButton>
              </Grid>
            </Grid>
          </Card>
        </Modal>
        <ProjectsHeader title="MES PROJETS"/>
        <SoftBox my={3}>
          <Card>
            <SoftBox display="flex" justifyContent="space-between" alignItems="flex-start" p={3}>
              <SoftBox lineHeight={1}>
                <SoftTypography variant="h5" fontWeight="medium">
                  Mes projets
                </SoftTypography>
                <SoftTypography variant="button" fontWeight="regular" color="text">
                  Liste complète des projets qui n'ont pas été archivés
                </SoftTypography>
              </SoftBox>
            </SoftBox>
            <DataTable
              table={unarchivedProjectsTable}
              entriesPerPage={{
                defaultValue: 5,
                entries: [5, 10, 25],
              }}
              canSearch
            />
          </Card>
        </SoftBox>
        <SoftBox my={3}>
          <Card>
            <SoftBox display="flex" justifyContent="space-between" alignItems="flex-start" p={3}>
              <SoftBox lineHeight={1}>
                <SoftTypography variant="h5" fontWeight="medium">
                  Projets archivés
                </SoftTypography>

              </SoftBox>
            </SoftBox>
            <DataTable
              table={ArchivedProjectsTable}
              entriesPerPage={{
                defaultValue: 5,
                entries: [5, 10, 25],
              }}
              canSearch
            />
          </Card>
        </SoftBox>
      </DashboardLayout>
    </>
  );
})

export default ProjectOverview;