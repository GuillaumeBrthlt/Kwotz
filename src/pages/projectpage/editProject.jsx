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

export const ProjectOverview = observer(() => {
  const {id} = useParams()
  const projectStore = useProjectStore()
  const [newColdRoom, setNewColdRoom] = useState(false)
  const coldRoomStore = useColdRoomStore()
  const [coldRooms, setColdRooms] = useState([])

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

  if (projectStore.projectDetails) {
    const project = projectStore.projectDetails;

    return (
      <DashboardLayout>
        <DashboardNavbar />
        <Header title={project.name}/>
        <Grid container justifyContent='center' mt={5}>
          <SoftButton 
            variant="gradient" 
            color="info" 
            size="medium" 
            onClick={() => {setNewColdRoom(true)}}
            sx={newColdRoom ? {display: 'none'} : '' }
          >
            + Ajouter une chambre froide
          </SoftButton>
        </Grid>
        {newColdRoom ? <NewColdRoom project={project.id} setNewColdRoom={setNewColdRoom}/> : ''}
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
