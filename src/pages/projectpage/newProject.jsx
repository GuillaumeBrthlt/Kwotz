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
import { useState, useEffect } from "react";
import { useProjectStore } from "../../contexts/ProjectContext"; 
import { Formik, Form } from "formik";
import { observer } from "mobx-react-lite";
import { BarLoader } from "react-spinners";

// @mui material components
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import Divider from "@mui/material/Divider";

// Soft UI Dashboard PRO React components
import SoftBox from "@components/SoftBox";
import SoftTypography from "@components/SoftTypography";
import SoftInput from "@components/SoftInput";
import SoftButton from "@components/SoftButton";

// Soft UI Dashboard PRO React example components
import DashboardLayout from "@components/LayoutContainers/DashboardLayout";
import DashboardNavbar from "@components/navbars/DashboardNavbar";
import Footer from "@components/Footer";
import { useNavigate } from "react-router-dom";
import Sidenav from "@components/navbars/Sidenav";

const NewProject = observer(() => {
  const projectStore = useProjectStore()
  const [name, setName] = useState(null)
  const navigate = useNavigate()

  const initialValues = {
    name: ""
  } 

  const sleep = (ms) =>
  new Promise((resolve) => {
    setTimeout(resolve, ms);
  });

  function handleKeyDown(e) {
    if (e.key === 'Enter') {
      handleSubmit()
    }
  }

  const handleSubmit = async () => {
    const projectData = {
      "project": {
        "name": name
      }
    };
    projectStore.createProject(projectData)
    await sleep(1000)
  }
  
  function getBack() {
    navigate('/dashboard')
  }

  useEffect(()=> {
    sleep(1000)
    if (projectStore.created) {
      navigate(`/project-edit/${projectStore.latestProject.id}`)
      projectStore.created = false
    }
  },[projectStore.created])

  if (projectStore.loading) {
    return (
      <Grid display='flex' height='100vh' justifyContent='center' alignItems='center'>
        <BarLoader color="#17c1e8" />
      </Grid>
    )
  }

  return (
    <>
      <Sidenav />
      <DashboardLayout>
        <DashboardNavbar />
        <SoftBox mt={3} mb={4}>
          <Grid container spacing={3} justifyContent="center">
            <Grid item xs={12} lg={9}>
              <Card sx={{ overflow: "visible" }}>
                <SoftBox p={2} lineHeight={1}>
                  <SoftTypography variant="h6" fontWeight="medium">
                    Nouveau Projet
                  </SoftTypography>
                  <SoftTypography variant="button" fontWeight="regular" color="text">
                    Créer un nouveau projet
                  </SoftTypography>
                  <Divider />
                  <Formik
                    initialValues={initialValues}
                    onSubmit={handleSubmit}
                  >
                    <Form>
                      <SoftBox
                        display="flex"
                        flexDirection="column"
                        justifyContent="flex-end"
                        height="100%"
                      >
                        <SoftBox mb={1} ml={0.5} lineHeight={0} display="inline-block">
                          <SoftTypography component="label" variant="caption" fontWeight="bold">
                            Nom du projet
                          </SoftTypography>
                        </SoftBox>
                        <SoftInput 
                          type="text"
                          placeholder="votre référence chantier" 
                          onChange={e => setName(e.target.value)}
                          onKeyDown={handleKeyDown}
                        />
                      </SoftBox>
                      <SoftBox display="flex" justifyContent="flex-end" mt={3}>
                        <SoftBox mr={1}>
                          <SoftButton color="light" onClick={getBack}>annuler</SoftButton>
                        </SoftBox>
                        <SoftButton 
                          type="submit"
                          variant="gradient"
                          color="info"
                        >
                          créer le projet
                        </SoftButton>
                      </SoftBox>
                    </Form>
                  </Formik>
                </SoftBox>
              </Card>
            </Grid>
          </Grid>
        </SoftBox>
        <Footer />
      </DashboardLayout>
    </>
  );
})

export default NewProject;