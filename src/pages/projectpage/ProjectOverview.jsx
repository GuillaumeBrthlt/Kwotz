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
import { Grid } from "@mui/material";

// Soft UI Dashboard PRO React components
import SoftBox from "@components/SoftBox";

// Soft UI Dashboard PRO React example components
import DashboardLayout from "@components/LayoutContainers/DashboardLayout";
import ProjectCard from "@pages/projectpage/components/cards/projectCard";

// Data
// import dataTableData from "@pages/dashboard/data/dataTableData";
import { observer } from "mobx-react-lite";
import { useProjectStore } from "@contexts/ProjectContext";
import { useEffect } from "react";
import Sidenav from "@components/navbars/Sidenav";
import ProjectsHeader from "@pages/projectpage/components/Header/ProjectsHeader";
import { useState } from "react";
import SoftInput from "@components/SoftInput";
import SoftButton from "@components/SoftButton";

const ProjectOverview = observer(() => {
  const projectStore = useProjectStore()
  const [search, setSearch] = useState('')
  const [unarchivedProjects, setUnarchivedProjects] = useState([])
  
  useEffect(() => {
    projectStore.getProjects()
  }, [])

  useEffect(() => {
    if (projectStore.projects) {
      const unarchived = projectStore.projects.filter((project) => project.status !== "archived")
      setUnarchivedProjects(unarchived)
    }
  }, [projectStore.projects])

  const FilterProject = (value) => {
    console.log(search)
    let filteredProjects = projectStore.projects.filter((project) => project.status !== "archived" && project.name.toLowerCase().includes(value.toLowerCase()))
    setUnarchivedProjects(filteredProjects)
  }


  return (
    <>
      <Sidenav />
      <DashboardLayout>
        <ProjectsHeader title="MES PROJETS"/>
        <SoftBox my={3}>
          <Grid container spacing={3} mb={6} mt={2} justifyContent="center">
            <Grid item xs={12} md={5}>
              <SoftInput 
                width='100%'
                placeholder='Rechercher...'
                onChange={(e) => FilterProject(e.target.value)}
              />
            </Grid>
          </Grid>
          <Grid container spacing={3} rowSpacing={5} mb={2}>
            {unarchivedProjects.sort((a, b) => new Date(b.created_at) - new Date(a.created_at)).map(project => {
              return (
                <Grid item xs={12} md={4} key={project.id}>
                  <ProjectCard 
                    project={project}
                  />
                </Grid>
              )
            })}
          </Grid>
        </SoftBox>
      </DashboardLayout>
    </>
  );
})

export default ProjectOverview;