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
import QuoteResponse from "@pages/projectpage/components/QuoteResponse"

export const ProjectView = observer(() => {
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
  const [sent, setSent] = useState(false)

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
    setSent(false)
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
    setSent(true)
  }

  if (project) {


    return (
      <>
        <Sidenav />
        <DashboardLayout>
          <Header title={project.name}/>
          <Grid container spacing={2} justifyContent='center' alignItems='start'>
            <Grid item sm={12} md={4}>
              <QuoteResponse project={project} />
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
