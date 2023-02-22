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
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";

// Soft UI Dashboard PRO React components
import SoftBox from "@components/SoftBox";
import SoftTypography from "@components/SoftTypography";
import SoftButton from "@components/SoftButton";
import { Link } from "react-router-dom";

// Images
import curved0 from "/assets/images/curved-images/curved0.jpg";

function ProjectsHeader({ title }) {

  return (
    <Grid>
    <SoftBox position="relative" mt={0}>
      <SoftBox
        display="flex"
        alignItems="center"
        position="relative"
        minHeight="5rem"
        borderRadius="xl"
        sx={{
          backgroundImage: ({ functions: { rgba, linearGradient }, palette: { gradients } }) =>
            `${linearGradient(
              rgba(gradients.info.main, 0.6),
              rgba(gradients.info.state, 0.6)
            )}, url(${curved0})`,
          backgroundSize: "cover",
          backgroundPosition: "50%",
          overflow: "hidden",
        }}
      />
      <Card
        sx={{
          backdropFilter: `saturate(200%) blur(30px)`,
          backgroundColor: ({ functions: { rgba }, palette: { white } }) => rgba(white.main, 0.8),
          boxShadow: ({ boxShadows: { navbarBoxShadow } }) => navbarBoxShadow,
          position: "relative",
          mt: -4,
          mx: 3,
          py: 2,
          px: 2,
        }}
      >
        <Grid container spacing={3} alignItems="center" >
          <Grid item xs={4}></Grid>
          <Grid item xs={12} md={4} justifyContent='center' display='flex'>
            <SoftBox height="100%" mt={0.5} lineHeight={1}>
              <SoftTypography variant="h5" fontWeight="medium">
                {title}
              </SoftTypography>
            </SoftBox>
          </Grid>
          <Grid item xs={12} md={4} display='flex' justifyContent={{xs: 'center', md:'flex-end'}}>
            <Link to="/projects/new">
              <SoftButton variant="gradient" color="success" size="small">
                + nouveau projet
              </SoftButton>
            </Link>
          </Grid>
        </Grid>
      </Card>
    </SoftBox>
    </Grid>
  );
}

export default ProjectsHeader;
