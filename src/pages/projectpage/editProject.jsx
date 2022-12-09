import React, { useEffect } from "react"
import DashboardLayout from "@components/LayoutContainers/DashboardLayout"
import Header from "@components/Header"
import { useParams } from "react-router-dom"
import { useProjectStore } from "@contexts/ProjectContext"
import { useState } from "react"
import {Previews} from "./components/previews"
import { observer } from "mobx-react-lite"
import SoftButton from "@components/SoftButton"
import { Grid } from "@mui/material"
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

export const ProjectOverview = observer(() => {
  const {id} = useParams()
  const projectStore = useProjectStore()
  const [newColdRoom, setNewColdRoom] = useState(false)
  const coldRoomStore = useColdRoomStore()
  const [coldRooms, setColdRooms] = useState([])
  const [send, setSend] = useState(false)
  const [email, setEmail] = useState(null)

  useEffect(() => {
    projectStore.getDetails(id)
  }, [id])

  useEffect(() => {
    coldRoomStore.getColdRooms()
  }, [])

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

  if (projectStore.projectDetails) {
    const project = projectStore.projectDetails;

    return (
      <DashboardLayout>
        <DashboardNavbar />
        <SoftButton 
            variant="gradient" 
            color="success" 
            size="medium"
            onClick={() => {setSend(true)}}
            sx={
              send ? {
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
        <Card sx={send ? {marginTop: 3, textAlign: 'center'} : {display: 'none'}}>
          <Button color="secondary" sx={{marginLeft: 'auto'}} size='large' onClick={() => {setSend(false)}}>
            <CloseIcon />
          </Button>
          <SoftTypography  variant='h4'>
              Formulaire d'envoi
          </SoftTypography>
          <Grid container spacing={4} justifyContent='center' mb={2} mt={1}>
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
        <Grid container spacing={2} justifyContent='center'>
          <Grid item sm={12} md={4}>
            <ColdRoomsList coldRooms={coldRooms}/>
          </Grid>
          <Grid item sm={12} md={8}>
            <Previews project={project} coldRooms={coldRooms}/> 
          </Grid>
        </Grid>
        
      </DashboardLayout>
    )
  }

  return (
    <></>
  )
});
