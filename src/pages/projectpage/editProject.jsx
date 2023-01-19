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
import React, { useEffect } from "react"
import DashboardLayout from "@components/LayoutContainers/DashboardLayout"
import Header from "@components/Header"
import { useParams } from "react-router-dom"
import { useProjectStore } from "@contexts/ProjectContext"
import { useState } from "react"
import {Previews} from "./components/previews"
import { observer } from "mobx-react-lite"
import SoftButton from "@components/SoftButton"
import { Grid, Modal } from "@mui/material"
import { Button } from "@mui/material"
import NewColdRoom from "@components/NewColdRoom"
import { useColdRoomStore } from "@contexts/ColdRoomContext"
import ColdRoomsList from "@pages/projectpage/components/ColdRoomsList"
import SendIcon from '@mui/icons-material/Send';
import SoftInput from "@components/SoftInput"
import { Card } from "@mui/material"
import SoftTypography from "@components/SoftTypography"
import CloseIcon from '@mui/icons-material/Close';
import { useUserStore } from "@contexts/UserContext"
import { useUserProfileStore } from "@contexts/UserProfileContext"
import Sidenav from "@components/navbars/Sidenav"
import CommentSection from "@pages/projectpage/components/CommentSection"
import Separator from "@pages/projectpage/components/Separator"
import SoftSelect from "@components/SoftSelect"
import { useSupplierStore } from "@contexts/SupplierContext"

export const ProjectEdit = observer(() => {
  const {id} = useParams()
  const projectStore = useProjectStore()
  const [newColdRoom, setNewColdRoom] = useState(false)
  const coldRoomStore = useColdRoomStore()
  const [coldRooms, setColdRooms] = useState([])
  const [email, setEmail] = useState("")
  const userStore = useUserStore()
  const userProfileStore = useUserProfileStore()
  const userId = userStore.user.id
  const [open, setOpen] = useState(false)
  const [project, setProject] = useState(null)
  const [sent, setSent] = useState(false)
  const [alreadySent, setAlreadySent] = useState(false)
  const [supplier, setSupplier] = useState(null)
  const [contact, setContact] = useState(null)
  const supplierStore = useSupplierStore()

  useEffect(() => {
    projectStore.getDetails(id)
    projectStore.getConsultations(userId)
  }, [id])

  useEffect(() => {
    coldRoomStore.getColdRooms()
  }, [])

  useEffect(() => {
    supplierStore.getSuppliers(userId)
  }, [])

  useEffect(() => {
    userProfileStore.getProfileDetails(userId)
  }, [userId])

  useEffect(() => {
    if (projectStore.projectDetails) {
      setProject(projectStore.projectDetails)
    }
  }, [projectStore.projectDetails])

  function handleOpen() {
    setSent(false)
    setOpen(true)
    setSupplier(null)
    setContact(null)
  }

  function handleClose() {
    setOpen(false)
  }

  function CheckAlreadySent(contactEmail) {
    const sameConsultation = projectStore.consultations.filter(consultation => consultation.email === contactEmail && consultation.project.id == id)
    console.log(sameConsultation)
    if (sameConsultation.length > 0) {
      setAlreadySent(true)
    } else {
      setAlreadySent(false)
    }
  }

  useEffect(() => {
    return async() => {
      let thoseColdRooms = coldRoomStore.coldRooms.filter(coldRoom => coldRoom.project_id == id)
      setColdRooms(thoseColdRooms)
    }
  },[coldRoomStore.coldRooms])

  function sendMail() {
    const payload = {
      project_id: id,
      email: email
    }
    projectStore.sendProject(payload)
    setSent(true)
  }

  const modalStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width:{xs: 350, md:600}
  };

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

  if (project) {

    return (
      <>
        <Sidenav />
        <SoftButton 
              variant="gradient" 
              color="success" 
              size="medium"
              onClick={() => {handleOpen()}}
              sx={
                open ? {
                  display: 'none', 
                  bottom: 50,
                  right: 50
                } : {
                  position: 'fixed',
                  zIndex: 1,
                  bottom: 50,
                  right: 50
                }
              }
            >
              <SendIcon sx={{marginRight: 2}}/>
              Envoyer
            </SoftButton>
        <DashboardLayout>
          <Header title={project.name}/>
          <Grid container justifyContent='center' mt={5}>
            <SoftButton 
              variant="gradient" 
              color="info" 
              size="medium" 
              onClick={() => {setNewColdRoom(true)}}
              sx={
                newColdRoom ? {display: 'none'} : {}
              }
            >
              + Ajouter une chambre froide
            </SoftButton>
          </Grid>
          {newColdRoom ? <NewColdRoom project={project.id} setNewColdRoom={setNewColdRoom}/> : <></>}
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
          <Grid container spacing={2} justifyContent='center' alignItems='start'>
            <Grid item sm={12} md={4}>
              <CommentSection comment={project.message} projectId={project.id}/>
              <ColdRoomsList coldRooms={coldRooms}/>
            </Grid>
            <Grid item sm={12} md={8}>
              <Previews project={project} coldRooms={coldRooms} user={userStore.user} profile={userProfileStore.profileDetails}/> 
            </Grid>
          </Grid>
        </DashboardLayout>
      </>
    )
  }
  
  return (
    <></>
  )
});
