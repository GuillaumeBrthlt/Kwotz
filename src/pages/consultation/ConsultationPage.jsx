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
import SoftBox from '@components/SoftBox'
import SoftTypography from '@components/SoftTypography'
import { Card } from '@mui/material'
import SoftButton from '@components/SoftButton'
import SoftBadgeDot from '@components/SoftBadgeDot'
import SoftInput from '@components/SoftInput'
import { useDropzone } from 'react-dropzone'
import "./ConsultationPage.css"

const  ConsultationPage = observer(() => {
  const { id } = useParams()
  const projectStore = useProjectStore()
  const navigate = useNavigate()
  const [verified, setVerified] = useState(false)
  const [responseComment, setResponseComment] = useState("");
  const [quoteDocument, setQuoteDocument] = useState()

  useEffect(() => {
    projectStore.getConsultation(id)
  }, [id])

  const handleSubmit = ()  =>{
    const data = new FormData()
    data.append("quote_request[response_comment]", responseComment)
    data.append("quote_request[response_status]", true)
    Array.from(quoteDocument).forEach((document) => {
    data.append("quote_request[document][]", document)
    })
    projectStore.updateQuoteRequest(data, id)
    console.log(quoteDocument)
  }

  if (projectStore.hasErrors) {
    navigate('/404')
  }

  const {
    acceptedFiles,
    getRootProps,
    getInputProps
  } = useDropzone({
    accept: {
      'image/pdf': [".pdf"]
    }
  });

  const acceptedFileItems = acceptedFiles.map(file => (
    <SoftBadgeDot size="md" key={file.path}
      badgeContent={file.path}
    />
  ));

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
      <Grid padding={5} sx={verified ? {} : {display: 'none'}} maxWidth='1200px' marginX='auto'>
        <Card>
          <SoftBox display="flex" justifyContent="space-between" alignItems="flex-start" p={3}>
            <SoftBox lineHeight={1}>
              <SoftTypography variant="h5" fontWeight="medium">
                Envoyer une réponse
              </SoftTypography>
            </SoftBox>
          </SoftBox>
          <SoftBox p={3}>
            <SoftInput
              multiline
              rows={5}
              value={responseComment}
              onChange={(e) => {setResponseComment(e.target.value)}}
              placeholder={"Ecrivez un commentaire à joindre a vôtre devis"}
            >
            </SoftInput>
          </SoftBox>
          <SoftBox>
            <SoftBox
              display="flex"
              flexDirection="column"
              justifyContent="flex-end"
              height="100%"
              padding={3}
            >
              <SoftBox mb={1} ml={0.5} mt={3} lineHeight={0} display="inline-block">
                <SoftTypography component="label" variant="caption" fontWeight="bold">
                  Envoyez un devis
                </SoftTypography>
              </SoftBox>
              <section className="container">
                <div onChange={e => setQuoteDocument(e.target.files)} {...getRootProps({ className: 'dropzone' })}>
                  <input {...getInputProps()} />
                  <SoftTypography variant="body2" fontWeight="light" opacity={0.5}>
                    Deposer les fichiers à envoyer ici (vous pouvez en selectionner plusieurs).
                  </SoftTypography>
                  <SoftTypography variant="body2" fontWeight="light" opacity={0.5}>
                    Seuls les .pdf sont acceptés
                  </SoftTypography>
                </div>
                <aside>
                <SoftTypography variant="caption" fontWeight="bold">Fichiers à envoyer</SoftTypography>
                  <ul>{acceptedFileItems}</ul>
                </aside>
              </section>
            </SoftBox>
          </SoftBox>
          <SoftBox display="flex" justifyContent="flex-end" my={3} mx={3}>
            <SoftButton variant="gradient" color="info" onClick={(e) => {handleSubmit()}}>
              Envoyer réponse
            </SoftButton>
          </SoftBox>
        </Card>
      </Grid>
    </>
  )
})

export default ConsultationPage
