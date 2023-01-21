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
import SparePartDetails from "@pages/projectpage/components/SparePartDetails";

export const Previews = observer(({profile, project, coldRooms, user, date, spareParts}) => {
  const componentRef = useRef()

  const handlePrint = useReactToPrint({
    content: () => componentRef.current
  })

  function displayMessage(message) {
    if (message) {
      return (
        <SoftBox p={3}>
          <SoftTypography variant='h5' color="primary" fontWeight="medium">
            Informations
          </SoftTypography>
          {project.message.split('\n').map(line => {
            return (
                <SoftTypography key={line} variant='body2'>
                {line}
              </SoftTypography>
            )
          })} 
        </SoftBox>
      ) 
    }
  }

  return (

    <SoftBox mt={{ xs: 4, md: 3 }} mb={{ xs: 4, md: 8 }}>
      <Grid container justifyContent="center">
        <Grid width='100%'>
          <div>
            <Card ref={componentRef}>
              {/* Invoice header */}
              <SoftBox p={3}>
                <Grid container justifyContent="space-between" flexWrap="wrap-reverse">
                  <Grid item xs={12} md={7}>
                    <SoftTypography variant="h6" fontWeight="medium">
                      {profile.first_name} {profile.last_name}
                    </SoftTypography>
                    <SoftTypography variant="body2" fontWeight="light">
                      {profile.role}
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
                        email: {user.email}
                      </SoftTypography>
                      <SoftTypography display="block" variant="body2" color="secondary">
                        tel: {profile.phone_number}
                      </SoftTypography>
                    </SoftBox>
                  </Grid>
                  <Grid item xs={12} md={3}>
                    <SoftBox
                      width="100%"
                      height={{ xs: "auto", md: "100%" }}
                      display="flex"
                      justifyContent='flex-end'
                      alignItems="flex-start"
                      mb={{ xs: 2, md: 0 }}
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
                        justifyContent="flex-end"
                        flexDirection={{ xs: "column", md: "row" }}
                        alignItems={{ xs: "flex-start", md: "center" }}
                        textAlign={{ xs: "left", md: "right" }}
                        mt={{ xs: 3, md: 0 }}
                      >
                        <SoftBox >
                          <SoftTypography variant="h6" color="secondary" fontWeight="medium">
                            demande de prix du:
                          </SoftTypography>
                        </SoftBox>
                        <SoftBox marginLeft={{xs: 0, md:1}}>
                          <SoftTypography variant="h6" fontWeight="medium">
                            {date ? new Date(date).toLocaleDateString('fr') : "(date de consultation)"}
                          </SoftTypography>
                        </SoftBox>
                      </SoftBox>
                    </Grid>
                    <Grid item xs={12} mt={3} display="flex" alignItems="flex-end" sx={coldRooms ? {} : {display:'none'}}>
                      <SoftTypography variant="h6" color="secondary" fontWeight="medium">
                        Nombre de chambres froides: 
                      </SoftTypography>
                      <SoftTypography variant="h5" fontWeight="medium" marginLeft={1}>
                        {coldRooms ? coldRooms.length : ''}
                      </SoftTypography>
                    </Grid>
                    <Grid item xs={12} display="flex" alignItems="flex-end" sx={spareParts ? {} : {display:'none'}}>
                      <SoftTypography variant="h6" color="secondary" fontWeight="medium">
                        Nombre de pièces détachées: 
                      </SoftTypography>
                      <SoftTypography variant="h5" fontWeight="medium" marginLeft={1}>
                        {spareParts ? spareParts.length : ''}
                      </SoftTypography>
                    </Grid>
                  </Grid>
                </SoftBox>
              </SoftBox>
              {project.message ? displayMessage(project.message) : ''}
              {/* Invoice content */}
              <SoftBox p={3} sx={coldRooms ? {} : {display:'none'}}>
                {coldRooms ? coldRooms.map(coldRoom => <ColdRoomDetails key={coldRoom.id} coldRoom={coldRoom}/>) : ''}
              </SoftBox>
              <SoftBox p={3} sx={spareParts ? {} : {display:'none'}}>
                <SoftTypography variant='h4' >
                  Pièces détachées
                </SoftTypography>
                {spareParts ? spareParts.map(sparePart => <SparePartDetails key={sparePart.id} sparePart={sparePart}/>) : ''}
              </SoftBox>
            </Card>
          </div>
        </Grid>
      </Grid>
    </SoftBox>
  );
})
