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

// @mui material components
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";

// Soft UI Dashboard PRO React components
import SoftBox from "@components/SoftBox";
import SoftTypography from "@components/SoftTypography";
import SoftButton from "@components/SoftButton";

import {useReactToPrint} from "react-to-print";

// Images
import { observer } from "mobx-react-lite";
import ColdRoomDetails from "@pages/projectpage/components/ColdRoomDetails";
import { useRef } from "react";

export const Previews = observer(({profile, project, coldRooms, user}) => {
  const componentRef = useRef()

  const handlePrint = useReactToPrint({
    content: () => componentRef.current
  })

  return (

    <SoftBox mt={{ xs: 4, md: 3 }} mb={{ xs: 4, md: 8 }}>
      <Grid container justifyContent="center">
        <Grid width='100%'>
          <div>
            <Card ref={componentRef}>
              {/* Invoice header */}
              <SoftBox p={3}>
                <Grid container justifyContent="space-between">
                  <Grid item xs={12} md={4}>
                    <SoftTypography variant="h6" fontWeight="medium">
                      {profile.first_name} {profile.last_name}
                    </SoftTypography>
                    <SoftTypography variant="h6" fontWeight="medium">
                      {profile.company}
                    </SoftTypography>
                    <SoftTypography variant="h6" fontWeight="medium">
                      {profile.address}
                    </SoftTypography>
                    <SoftTypography variant="h6" fontWeight="medium">
                      {profile.zipcode} {profile.city}
                    </SoftTypography>
                    <SoftBox mt={1} mb={2}>
                      <SoftTypography display="block" variant="body2" color="secondary">
                        tel: {profile.phone_number}
                      </SoftTypography>
                    </SoftBox>
                  </Grid>
                </Grid>
                <SoftBox mt={{ xs: 5, md: 5 }}>
                  <Grid container justifyContent="space-between">
                    <Grid item xs={12} md={4}>
                      <SoftTypography variant="h6" color="secondary" fontWeight="medium">
                        Nom du projet
                      </SoftTypography>
                      <SoftTypography variant="h5" fontWeight="medium">
                        {project.name}
                      </SoftTypography>
                    </Grid>
                    <Grid item xs={12} md={7} lg={5}>
                      <SoftBox
                        width="100%"
                        display="flex"
                        flexDirection={{ xs: "column", md: "row" }}
                        alignItems={{ xs: "flex-start", md: "center" }}
                        textAlign={{ xs: "left", md: "right" }}
                        mt={{ xs: 3, md: 0 }}
                      >
                        <SoftBox width="60%">
                          <SoftTypography variant="h6" color="secondary" fontWeight="medium">
                            consultation du:
                          </SoftTypography>
                        </SoftBox>
                        <SoftBox width="40%">
                          <SoftTypography variant="h6" fontWeight="medium">
                            {new Date(project.created_at).toLocaleDateString('fr')}
                          </SoftTypography>
                        </SoftBox>
                      </SoftBox>
                    </Grid>
                  </Grid>
                </SoftBox>
              </SoftBox>

              {/* Invoice content */}
              <SoftBox p={3}>
                {coldRooms.map(coldRoom => <ColdRoomDetails key={coldRoom.id} coldRoom={coldRoom}/>)}
              </SoftBox>

              {/* Invoice footer */}
              <SoftBox p={3} mt={7}>
                <Grid container>
                  <Grid item xs={12} lg={5}>
                    <SoftTypography
                      component="span"
                      variant="h6"
                      fontWeight="medium"
                      color="secondary"
                    >
                      email:{" "}
                      <SoftTypography component="span" variant="h6" fontWeight="medium">
                        support@creative-tim.com
                      </SoftTypography>
                    </SoftTypography>
                  </Grid>
                  <Grid item xs={12} lg={7}>
                    <SoftBox
                      width="100%"
                      height={{ xs: "auto", md: "100%" }}
                      display="flex"
                      justifyContent={{ xs: "flex-start", md: "flex-end" }}
                      alignItems="flex-end"
                      mt={{ xs: 2, md: 0 }}
                    >
                      <SoftButton 
                        variant="gradient" 
                        color="info"
                        onClick={handlePrint}
                      > 
                        Imprimer
                      </SoftButton>
                    </SoftBox>
                  </Grid>
                </Grid>
              </SoftBox>
            </Card>
          </div>
        </Grid>
      </Grid>
    </SoftBox>
  );
})
