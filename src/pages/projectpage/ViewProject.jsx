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
import { Grid } from "@mui/material"
import { useColdRoomStore } from "@contexts/ColdRoomContext"
import { useUserStore } from "@contexts/UserContext"
import { useUserProfileStore } from "@contexts/UserProfileContext"
import Sidenav from "@components/navbars/Sidenav"
import QuoteResponse from "@pages/projectpage/components/QuoteResponse"

export const ProjectView = observer(() => {
  const {id} = useParams()
  const projectStore = useProjectStore()
  const coldRoomStore = useColdRoomStore()
  const [coldRooms, setColdRooms] = useState([])
  const [spareParts, setSpareParts] = useState([])
  const [ACs, setACs] = useState([])
  const userStore = useUserStore()
  const userProfileStore = useUserProfileStore()
  const userId = userStore.user.id
  const [project, setProject] = useState(null)

  useEffect(() => {
    projectStore.getDetails(id)
  }, [id])

  useEffect(() => {
    coldRoomStore.getColdRooms()
    coldRoomStore.getSpareParts()
    coldRoomStore.getAC()
  }, [])

  useEffect(() => {
    userProfileStore.getProfileDetails(userId)
  }, [userId])

  useEffect(() => {
    if (projectStore.projectDetails) {
      setProject(projectStore.projectDetails)
    }
  }, [projectStore.projectDetails])

  useEffect(() => {
    return async() => {
      let thoseColdRooms = coldRoomStore.coldRooms.filter(coldRoom => coldRoom.project_id == id)
      setColdRooms(thoseColdRooms)
    }
  },[coldRoomStore.coldRooms])

  useEffect(() => {
    return async() => {
      let thoseSpareParts = coldRoomStore.spareParts.filter(sparePart => sparePart.project_id == id)
      setSpareParts(thoseSpareParts)
    }
  },[coldRoomStore.spareParts])

  useEffect(() => {
    return async() => {
      let thoseACs = coldRoomStore.AC.filter(AC => AC.project_id == id)
      setACs(thoseACs)
    }
  },[coldRoomStore.AC])

  if (project) {

    return (
      <>
        <Sidenav />
        <DashboardLayout>
          <Header title={`Détails du projet: ${project.name}`}/>
          <Grid container spacing={2} justifyContent='center' alignItems='start'>
            <Grid item sm={12} >
              <QuoteResponse project={project} />
            </Grid>
            <Grid item sm={12}>
              <Previews project={project} coldRooms={coldRooms} user={userStore.user} profile={userProfileStore.profileDetails} spareParts={spareParts} ACs={ACs}/> 
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
