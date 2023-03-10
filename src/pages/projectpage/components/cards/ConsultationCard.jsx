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

// react-router components
import { Link } from "react-router-dom";

// prop-types is library for typechecking of props
import PropTypes from "prop-types";

// @mui material components
import Card from "@mui/material/Card";
import Divider from "@mui/material/Divider";
import { Grid } from "@mui/material";

// Soft UI Dashboard PRO React components
import SoftBox from "@components/SoftBox";
import SoftTypography from "@components/SoftTypography";
import SoftButton from "@components/SoftButton";
import { observer } from "mobx-react-lite";
import SendIcon from '@mui/icons-material/Send';
import DraftsIcon from '@mui/icons-material/Drafts';
import MarkunreadIcon from '@mui/icons-material/Markunread';

// @mui material icons
import VisibilityIcon from '@mui/icons-material/Visibility';
import TimelineItem from "@pages/projectpage/components/timeline/timelineItem";

const ConsultationCard = observer(({ consultation, handleOpen }) => {

  function UnreadConsultation() {
    if (consultation.response_status) {
      switch (consultation.read) {
        case true:
          return <DraftsIcon color="dark" fontSize="large"/>
        case false:
          return <MarkunreadIcon color="success" fontSize="large"/>
      }
    } else {
      return <SendIcon color="info" fontSize="large" />
    }    
  }

  const CardButtons = () => {
    return (
      <SoftBox display="flex" justifyContent="space-between" alignItems="center">
        <Grid>
          <SoftButton
            onClick={() => {handleOpen(consultation)}}
            variant="gradient"
            color="info"
            size="small"
          >
            <VisibilityIcon color="light" sx={{marginRight: 1}}/> Projet
          </SoftButton>
          <SoftButton
            component={Link}
            to={`/projects/response/${consultation.id}`}
            variant="gradient"
            color="success"
            size="small"
            sx={consultation.response_status ? {marginLeft: 2} : {display: 'none'}}
          >
            <VisibilityIcon color="light" sx={{marginRight: 1}}/> Devis
          </SoftButton>
        </Grid>
      </SoftBox>
    )
  }

  return (
    <Card sx={{height: '100%'}}>
      <SoftBox p={2} display='flex' flexDirection='column' justifyContent='space-between' height='100%'>
        <Grid>
          <SoftBox display="flex" alignItems="center">
            {UnreadConsultation()}
            <SoftBox ml={2} lineHeight={0}>
              <SoftTypography variant="h6" fontWeight="medium" textTransform="capitalize">
                Projet: {consultation.project.name}
              </SoftTypography>
              <SoftTypography
                variant="caption"
                fontWeight="bold"
                color="primary"
              >
                Envoyée à {consultation.email}
              </SoftTypography>
            </SoftBox>
          </SoftBox>
          <SoftBox my={2}>
            <SoftTypography variant="body2" color="text" sx={consultation.cold_rooms && consultation.cold_rooms.length > 0 ? {} : {display: 'none'}}>
              chambres froides: {consultation.cold_rooms ? consultation.cold_rooms.length : ''}
            </SoftTypography>
            <SoftTypography variant="body2" color="text" sx={consultation.air_conditionnings && consultation.air_conditionnings.length > 0 ? {} : {display: 'none'}}>
              pièces à climatiser: {consultation.air_conditionnings ? consultation.air_conditionnings.length : ''}
            </SoftTypography>
            <SoftTypography variant="body2" color="text" sx={consultation.spare_parts && consultation.spare_parts.length > 0 ? {} : {display: 'none'}}>
              pièces détachées: {consultation.spare_parts ? consultation.spare_parts.length : ''}
            </SoftTypography>
          </SoftBox>
          <Grid sx={consultation.response_status ? {display: 'none'} : {}}>
            <TimelineItem
              color="info"
              icon="send"
              title="demande de prix envoyée"
              dateTime={new Date(consultation.created_at).toLocaleString('fr-FR', { month: 'long', day: 'numeric', year: 'numeric', hour: 'numeric', minute: 'numeric' })}
              lastItem
            />
          </Grid>
          <Grid sx={consultation.response_status ? {} : {display: 'none'}}>
            <TimelineItem
              color="success"
              icon="check"
              title="devis reçu"
              dateTime={new Date(consultation.received_at).toLocaleString('fr-FR', { month: 'long', day: 'numeric', year: 'numeric', hour: 'numeric', minute: 'numeric' })}
              lastItem
            />
          </Grid>
        </Grid>
        <Grid>
          <Divider />
          {CardButtons()}
        </Grid> 
      </SoftBox>
    </Card>
  );
})

// Setting default values for the props of ConsultationCard
ConsultationCard.defaultProps = {
  id: "",
  dateTime: "",
};

// Typechecking props for the ConsultationCard
ConsultationCard.propTypes = {
  members: PropTypes.arrayOf(PropTypes.object),
};

export default ConsultationCard;