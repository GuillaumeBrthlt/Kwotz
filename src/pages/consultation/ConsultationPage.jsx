import { useProjectStore } from '@contexts/ProjectContext'
import React, { useEffect } from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useParams } from 'react-router-dom'
import { Grid } from '@mui/material'
import { Previews } from '@pages/projectpage/components/previews'
import { BarLoader } from 'react-spinners'
import { observer } from 'mobx-react-lite'
import IdentityCheck from './components/IdentityCheck'

const  ConsultationPage = observer(() => {
  const { id } = useParams()
  const projectStore = useProjectStore()
  const navigate = useNavigate()
  const [verified, setVerified] = useState(false)
  
  useEffect(() => {
    projectStore.getConsultation(id)
  }, [id])

  if (projectStore.hasErrors) {
    navigate('/404')
  }

  if (!projectStore.consultation) {
    return (
      <Grid display='flex' height='100vh' justifyContent='center' alignItems='center'>
        <BarLoader color="#17c1e8" />
      </Grid>
    )
  }
  
  return (
    <>
      <Grid sx={verified ? {display: 'none'} : {}}>
        <IdentityCheck setVerified={setVerified} verifemail={projectStore.consultation.email} />
      </Grid>
      <Grid padding={5} sx={verified ? {} : {display: 'none'}} maxWidth='1200px' marginX='auto'>
        <Previews 
          profile={projectStore.consultation.user_profile} 
          user={projectStore.consultation.user} 
          project={projectStore.consultation.project} 
          coldRooms={projectStore.consultation.cold_rooms}
          date={projectStore.consultation.created_at}
        />
      </Grid>
    </>
  )
})

export default ConsultationPage
