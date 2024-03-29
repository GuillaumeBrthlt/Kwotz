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
import { Grid, Link } from '@mui/material'
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

  useEffect(() => {
    if (projectStore.consultation) {
      setResponseComment(projectStore.consultation.response_comment)
    }
  },[projectStore.consultation])

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

  console.log(projectStore.consultation)
  
  return (
    <>
      <Grid sx={verified ? {display: 'none'} : {}}>
        <IdentityCheck setVerified={setVerified} verifemail={projectStore.consultation.email} />
      </Grid>
      <Grid sx={verified ? {} : {display: 'none'}} marginX='auto'>
        <AnswerLayout
          title="Transmettre votre devis"
          description="Vous trouverez toutes les informations de la demande de prix sur la page se trouvant sous le formulaire de réponse. Votre client sera notifié par e-mail lorsque votre devis aura été envoyé."
          image={curved8}
        >
          <Card>
            <SoftBox display="flex" justifyContent="space-between" alignItems="flex-start" p={3}>
              <SoftBox lineHeight={1}>
                <SoftTypography variant="h5" fontWeight="medium">
                  Votre réponse
                </SoftTypography>
              </SoftBox>
            </SoftBox>
                <SoftBox p={3}>
                  <SoftInput
                    multiline
                    rows={5}
                    value={responseComment}
                    onChange={(e) => {setResponseComment(e.target.value)}}
                    placeholder={"Écrivez ici un message à joindre à votre devis (facultatif)"}
                  >
                  </SoftInput>
                </SoftBox>
                <SoftBox p={3} sx={projectStore.consultation.response_status ? {} : {display: 'none'}}>
                  <SoftTypography variant="h5" fontWeight="medium">
                    Les documents que vous avez déjà transmis:
                  </SoftTypography>
                </SoftBox>
                <SoftBox paddingX={6} sx={projectStore.consultation.response_status ? {} : {display: 'none'}}>
                  <ul>
                    {projectStore.consultation.document_url.map((document, index) => {
                      return (
                        <li>
                          <Link href={document} target="_blank" rel="noopener noreferrer">{`document ${index + 1}`}</Link>
                        </li>
                      )
                    })}
                  </ul>
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
                      <SoftTypography component="label" variant="h5" >
                        Envoyez un devis
                      </SoftTypography>
                    </SoftBox>
                    <section className="container">
                      <div {...getRootProps({ className: 'dropzone' })}>
                        <input {...getInputProps()} />
                        <SoftTypography variant="body2" fontWeight="light" opacity={0.5}>
                          Deposer les fichiers à envoyer ici (vous pouvez en selectionner plusieurs).
                        </SoftTypography>
                        <SoftTypography variant="body2" fontWeight="light" opacity={0.5}>
                          Seuls les .pdf sont acceptés
                        </SoftTypography>
                      </div>
                      <aside>
                      <SoftTypography variant="h5">Fichiers à envoyer:</SoftTypography>
                        <ul>{acceptedFileItems}</ul>
                      </aside>
                    </section>
                  </SoftBox>
                </SoftBox>
                <SoftBox display="flex" justifyContent="flex-end" my={3} mx={3}>
                  <SoftButton 
                    variant="gradient" 
                    color="info" 
                    onClick={() => {if(window.confirm("Attention, si vous aviez déjà transmis une réponse elle sera écrasée et remplacée la nouvelle réponse")){handleSubmit()}}}
                  >
                    {projectStore.consultation.response_status ? 'Modifier' : 'Envoyer'}
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
