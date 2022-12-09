import SoftInput from '@components/SoftInput'
import { useProjectStore } from '@contexts/ProjectContext'
import React, { useEffect } from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useParams } from 'react-router-dom'
import { Grid } from '@mui/material'
import SoftButton from '@components/SoftButton'
import { Previews } from '@pages/projectpage/components/previews'
import { BarLoader } from 'react-spinners'
import { observer } from 'mobx-react-lite'
import SoftAlert from '@components/SoftAlert'

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

  

  function Verification() {
    const [email, setEmail] = useState(null)
    const [failed, setFailed] = useState(false)

    function handleVerification() {
      if (email == projectStore.consultation.email) {
        setVerified(true)
      } else {
        setFailed(true)
        console.log(failed)
      }
    }

    return (
      <>
        <Grid container justifyContent='center' sx={failed ? {position: 'absolute', top: 70} : {display: 'none'}}>
          <SoftAlert color='error'>Nous n'avons pas pu vous identifier</SoftAlert>
        </Grid>
        <Grid 
          container 
          sx={ verified ? {display: 'none'} : {}} 
          width='100%' 
          height='100vh' 
          justifyContent='center'
          alignItems='center'
          spacing={2}
        >
          <Grid item xs={10} md={4}>
            <SoftInput
              placeholder='entrez ici votre mail'
              onChange={(e) => {setEmail(e.target.value)}}
            />
          </Grid>
          <Grid item xs={8} md={3}>
            <SoftButton 
              color='info'
              onClick={() => {handleVerification()}}
            >
              Vérifier mon email
            </SoftButton>
          </Grid>  
        </Grid>
      </>
    )
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
      <Verification />
      <Grid padding={5} sx={verified ? {} : {display: 'none'}}>
        <Previews profile={projectStore.consultation.user_profile} user={projectStore.consultation.user} project={projectStore.consultation.project} coldRooms={projectStore.consultation.cold_rooms}/>
      </Grid>
    </>
  )
})

export default ConsultationPage
