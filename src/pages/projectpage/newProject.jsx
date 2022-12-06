import axios from 'axios';
import React, { useState } from 'react';

// @mui material components
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import Divider from "@mui/material/Divider";
import Switch from "@mui/material/Switch";

// Soft UI Dashboard PRO React components
import SoftBox from "@components/SoftBox";
import SoftTypography from "@components/SoftTypography";
import SoftInput from "@components/SoftInput";
import SoftSelect from "@components/SoftSelect";
import SoftEditor from "@components/SoftEditor";


function NewProject() {
  const [editorValue, setEditorValue] = useState(
    "<p>Hello World!</p><p>Some initial <strong>bold</strong> text</p><br><br>"
  );

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <SoftBox mt={3} mb={4}>
        <Grid container spacing={3} justifyContent="center">
          <Grid item xs={12} lg={9}>
            <Card sx={{ overflow: "visible" }}>
              <SoftBox p={2} lineHeight={1}>
                <SoftTypography variant="h6" fontWeight="medium">
                  New Project
                </SoftTypography>
                <SoftTypography variant="button" fontWeight="regular" color="text">
                  Créer un nouveau projet
                </SoftTypography>
                <Divider />
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
                  <SoftInput placeholder="Soft UI Dashboard PRO React" />
                </SoftBox>
                <SoftBox mt={3} mb={2}>
                  <Grid container spacing={3}>
                    <Grid item xs={12} md={6}>
                      <SoftBox mb={1} ml={0.5} lineHeight={0} display="inline-block">
                        <SoftTypography component="label" variant="caption" fontWeight="bold">
                          Private Project - Status
                        </SoftTypography>
                      </SoftBox>
                      <SoftBox pl={0.5} pb={1.5}>
                        <SoftTypography
                          component="label"
                          variant="caption"
                          fontWeight="regular"
                          color="text"
                        >
                          If you are available for hire outside of the current situation, you can
                          encourage others to hire you.
                        </SoftTypography>
                      </SoftBox>
                      <SoftBox ml={0.5} mb={0.25}>
                        <Switch />
                      </SoftBox>
                    </Grid>
                  </Grid>
                </SoftBox>
                <SoftBox
                  display="flex"
                  flexDirection="column"
                  justifyContent="flex-end"
                  height="100%"
                >
                  <SoftBox mb={1} ml={0.5} mt={3} lineHeight={0} display="inline-block">
                    <SoftTypography component="label" variant="caption" fontWeight="bold">
                      Description du projet - Message
                    </SoftTypography>
                  </SoftBox>
                  <SoftBox mb={1.5} ml={0.5} mt={0.5} lineHeight={0} display="inline-block">
                    <SoftTypography
                      component="label"
                      variant="caption"
                      fontWeight="regular"
                      color="text"
                    >
                      This is how others will learn about the project, so make it good!
                    </SoftTypography>
                  </SoftBox>
                  <SoftEditor value={editorValue} onChange={setEditorValue} />
                </SoftBox>

                <SoftBox
                  display="flex"
                  flexDirection="column"
                  justifyContent="flex-end"
                  height="100%"
                >
                  <SoftBox mb={1} ml={0.5} mt={3} lineHeight={0} display="inline-block">
                    <SoftTypography component="label" variant="caption" fontWeight="bold">
                      Contact fournisseur(s)
                    </SoftTypography>
                  </SoftBox>
                  <SoftSelect
                    defaultValue={[
                      { value: "choice 1", label: "Choice 1" },
                      { value: "label two", label: "label two" },
                    ]}
                    options={[
                      { value: "choice 1", label: "Choice 1" },
                      { value: "choice 2", label: "Choice 2" },
                      { value: "choice 3", label: "Choice 3" },
                      { value: "choice 4", label: "Choice 4" },
                      { value: "label one", label: "Label One", isDisabled: true },
                      { value: "label two", label: "Tabel Two" },
                      { value: "label three", label: "Label Three" },
                    ]}
                    isMulti
                  />
                </SoftBox>
                
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