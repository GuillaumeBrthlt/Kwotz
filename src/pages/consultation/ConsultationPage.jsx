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
import AnswerLayout from '@pages/consultation/components/AnswerLayout'
import curved8 from "/assets/images/curved-images/curved8.jpg"

const  ConsultationPage = observer(() => {
  const { id } = useParams()
  const projectStore = useProjectStore()
  const navigate = useNavigate()
  const [verified, setVerified] = useState(false)
  const [responseComment, setResponseComment] = useState("");
  const [sent, setSent] = useState(false)

  useEffect(() => {
    projectStore.getConsultation(id)
  }, [id])

  const handleSubmit = ()  =>{
    const data = new FormData()
    data.append("quote_request[response_comment]", responseComment)
    if (acceptedFiles.length > 0) {
      acceptedFiles.forEach((document) => {
      data.append("quote_request[document][]", document)
      })
    } 
    projectStore.updateQuoteRequest(data, id)
    setSent(true)
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
      <Grid sx={verified ? {} : {display: 'none'}} marginX='auto'>
        <AnswerLayout
          title="Transmettre votre devis"
          description="Vous trouverez toutes les informations de la demande de prix sur la page se trouvant sous le formulaire de r??ponse. Votre client sera notifi?? par mail lorsque votre devis aura ??t?? envoy??."
          image={curved8}
        >
          <Card>
            <SoftBox display="flex" justifyContent="space-between" alignItems="flex-start" p={3}>
              <SoftBox lineHeight={1}>
                <SoftTypography variant="h5" fontWeight="medium">
                  Envoyer une r??ponse
                </SoftTypography>
              </SoftBox>
            </SoftBox>
            <SoftBox p={3}>
              <SoftInput
                multiline
                rows={5}
                value={responseComment}
                onChange={(e) => {setResponseComment(e.target.value)}}
                placeholder={"??crivez ici un message ?? joindre ?? votre devis (facultatif)"}
                disabled={sent}
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
                  <div {...getRootProps({ className: 'dropzone' })}>
                    <input {...getInputProps()} />
                    <SoftTypography variant="body2" fontWeight="light" opacity={0.5}>
                      Deposer les fichiers ?? envoyer ici (vous pouvez en selectionner plusieurs).
                    </SoftTypography>
                    <SoftTypography variant="body2" fontWeight="light" opacity={0.5}>
                      Seuls les .pdf sont accept??s
                    </SoftTypography>
                  </div>
                  <aside>
                  <SoftTypography variant="caption" fontWeight="bold">Fichiers ?? envoyer</SoftTypography>
                    <ul>{acceptedFileItems}</ul>
                  </aside>
                </section>
              </SoftBox>
            </SoftBox>
            <SoftBox display="flex" justifyContent="flex-end" my={3} mx={3}>
              <SoftButton variant="gradient" color="info" onClick={(e) => {handleSubmit()}} disabled={sent}>
                {sent ? 'R??ponse envoy??e!' : 'Envoyer r??ponse'}
              </SoftButton>
            </SoftBox>
          </Card>
          <Previews 
            profile={projectStore.consultation.user_profile} 
            user={projectStore.consultation.user} 
            project={projectStore.consultation.project} 
            coldRooms={projectStore.consultation.cold_rooms}
            date={projectStore.consultation.created_at}
            spareParts={projectStore.consultation.spare_parts}
            ACs={projectStore.consultation.air_conditionnings}
          />
        </AnswerLayout>
      </Grid>  
    </>
  )
})

export default ConsultationPage
