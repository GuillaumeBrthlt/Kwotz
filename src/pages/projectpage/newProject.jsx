
import { useState } from "react";
import { useProjectStore } from "../../contexts/ProjectContext"; 
import { Formik, Form } from "formik";

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

export function NewProject() {
  const projectStore = useProjectStore()
  const [name, setName] = useState(null)
  const initialValues = {
    name: ""
  } 

  function handleKeyDown(e) {
    if (e.key === 'Enter') {
      handleSubmit()
    }
  }

  function handleSubmit() {
    const projectData = {
      "project": {
        "name": name
      }
    };
    projectStore.createProject(projectData)
  }

  return (
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
                        <SoftButton color="light">annuler</SoftButton>
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
  );
}

export default NewProject;