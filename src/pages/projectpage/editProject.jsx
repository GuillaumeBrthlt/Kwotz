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
import DashboardNavbar from "@components/navbars/DashboardNavbar"
import SendIcon from '@mui/icons-material/Send';
import SoftInput from "@components/SoftInput"
import { Card } from "@mui/material"
import SoftTypography from "@components/SoftTypography"
import CloseIcon from '@mui/icons-material/Close';
import { useUserStore } from "@contexts/UserContext"
import { useUserProfileStore } from "@contexts/UserProfileContext"
import Sidenav from "@components/navbars/Sidenav"
import CommentSection from "@pages/projectpage/components/CommentSection"

export const ProjectEdit = observer(() => {
  const {id} = useParams()
  const projectStore = useProjectStore()
  const [newColdRoom, setNewColdRoom] = useState(false)
  const coldRoomStore = useColdRoomStore()
  const [coldRooms, setColdRooms] = useState([])
  const [email, setEmail] = useState(null)
  const userStore = useUserStore()
  const userProfileStore = useUserProfileStore()
  const userId = userStore.user.id
  const [open, setOpen] = useState(false)
  const [project, setProject] = useState(null)

  useEffect(() => {
    projectStore.getDetails(id)
  }, [id])

  useEffect(() => {
    coldRoomStore.getColdRooms()
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
    setOpen(true)
  }

  function handleClose() {
    setOpen(false)
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
  }

  const modalStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width:{xs: 350, md:600}
  };

  if (project) {


    return (
      <>
        <Sidenav />
        <DashboardLayout>
          <DashboardNavbar />
          <SoftButton 
              variant="gradient" 
              color="success" 
              size="medium"
              onClick={() => {handleOpen()}}
              sx={
                open ? {
                  display: 'none', 
                  position: 'fixed',
                  zIndex: '1',
                  bottom: 50,
                  right: 50
                } : {
                  position: 'fixed',
                  zIndex: '1',
                  bottom: 50,
                  right: 50
                }
              }
            >
              <SendIcon sx={{marginRight: 2}}/>
              Envoyer
            </SoftButton>
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
              <SoftTypography  variant='h4' textAlign='center'>
                  Envoyer la demande prix
              </SoftTypography>
              <Grid container spacing={2} justifyContent='center' mb={2} mt={1}>
                <Grid item xs={11} md={8}>
                  <SoftInput 
                    placeholder="email du contact"
                    onChange={e=> setEmail(e.target.value)}
                  />
                </Grid>
                <Grid item>
                  <SoftButton 
                    variant="gradient" 
                    color="success" 
                    size="medium"
                    onClick={() => {sendMail()}}
                  >
                    Envoyer
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
