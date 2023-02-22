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
import Cube from "@theme/Icons/Cube";
import { observer } from "mobx-react-lite";
import { useProjectStore } from "@contexts/ProjectContext";

// @mui material icons
import DeleteIcon from '@mui/icons-material/Delete';
import VisibilityIcon from '@mui/icons-material/Visibility';
import EditIcon from '@mui/icons-material/Edit';
import TimelineItem from "@pages/projectpage/components/timeline/timelineItem";
import { useState } from "react";
import { useEffect } from "react";

const ProjectCard = observer(({ project }) => {
  const projectStore = useProjectStore()

  console.log(project)

  function ArchiveProject(id) {
    const payload = {
      project: {
        status: 'archived'
      }
    }
    projectStore.updateProject(id, payload)
  }

  const CardButtons = () => {
    return (
      <SoftBox display="flex" justifyContent="space-between" alignItems="center">
        <Grid>
          <SoftButton
            component={Link}
            to={`/projects/view/${project.id}`}
            variant="gradient"
            color="info"
            size="small"
          >
            <VisibilityIcon color="light"/>
          </SoftButton>
          <SoftButton
            component={Link}
            to={`/projects/edit/${project.id}`}
            variant="gradient"
            color="dark"
            size="small"
            sx={{marginLeft: 2}}
          >
            <EditIcon color="light"/>
          </SoftButton>
        </Grid>
        <SoftButton
          onClick={() => {if(window.confirm("Etes-vous sûr de vouloir archiver ce projet ? vous ne pourrez plus l'envoyer ou le modifier")){ArchiveProject(id)}}}
          variant="gradient"
          color="error"
          size="small"
        >
          <DeleteIcon color='light'/>
        </SoftButton>
      </SoftBox>
    )
  }

  return (
    <Card sx={{height: '100%'}}>
      <SoftBox p={2} display='flex' flexDirection='column' justifyContent='space-between' height='100%'>
        <Grid>
          <SoftBox display="flex" alignItems="center">
            <Cube size="35px" color="primary"/>
            <SoftBox ml={2} lineHeight={0}>
              <SoftTypography variant="h6" fontWeight="medium" textTransform="capitalize">
                {project.name}
              </SoftTypography>
              <SoftTypography
                variant="caption"
                fontWeight="regular"
                color="text"
                textTransform="capitalize"
              >
                Créé le {new Date(project.created_at).toLocaleString('fr-FR', { month: 'long', day: 'numeric', year: 'numeric', hour: 'numeric', minute: 'numeric' })}
              </SoftTypography>
            </SoftBox>
          </SoftBox>
          <SoftBox my={2}>
            <SoftTypography variant="body2" color="text" sx={project.cold_rooms && project.cold_rooms.length > 0 ? {} : {display: 'none'}}>
              chambres froides: {project.cold_rooms ? project.cold_rooms.length : ''}
            </SoftTypography>
            <SoftTypography variant="body2" color="text" sx={project.air_conditionnings && project.air_conditionnings.length > 0 ? {} : {display: 'none'}}>
              pièces à climatiser: {project.air_conditionnings ? project.air_conditionnings.length : ''}
            </SoftTypography>
            <SoftTypography variant="body2" color="text" sx={project.spare_parts && project.spare_parts.length > 0 ? {} : {display: 'none'}}>
              pièces détachées: {project.spare_parts ? project.spare_parts.length : ''}
            </SoftTypography>
          </SoftBox>
          {project.quote_requests.map(consultation => {
            return (
              <TimelineItem
                color="error"
                icon="send"
                title="Demande de prix envoyée"
                description={`à ${consultation.email}`}
                dateTime={new Date(consultation.created_at).toLocaleString('fr-FR', { month: 'long', day: 'numeric', year: 'numeric', hour: 'numeric', minute: 'numeric' })}
                lastItem
              />
            )
          })}
          <Grid sx={project.quote_requests.length > 0 ? {display: 'none'} : {}}>
            <TimelineItem
              color="info"
              icon="note_add"
              title="Création du projet"
              dateTime={new Date(project.created_at).toLocaleString('fr-FR', { month: 'long', day: 'numeric', year: 'numeric', hour: 'numeric', minute: 'numeric' })}
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

// Setting default values for the props of ProjectCard
ProjectCard.defaultProps = {
  id: "",
  dateTime: "",
};

// Typechecking props for the ProjectCard
ProjectCard.propTypes = {
  members: PropTypes.arrayOf(PropTypes.object),
};

export default ProjectCard;