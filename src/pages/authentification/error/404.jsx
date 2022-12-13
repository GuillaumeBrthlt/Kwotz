// react-router-dom components
import { Link } from "react-router-dom";

// @mui material components
import Grid from "@mui/material/Grid";

// Soft UI Dashboard PRO React components
import SoftBox from "@components/SoftBox";
import SoftTypography from "@components/SoftTypography";
import SoftButton from "@components/SoftButton";

import PageLayout from "@components/LayoutContainers/PageLayout";

// Soft UI Dashboard PRO React base styles
import typography from "@theme/base/typography";

// Images
import error404 from "/assets/images/illustrations/error-404.png";
import DefaultNavbar from "@components/navbars/defaultNavbar";

function Error404() {
  const { d1, d3, d4, d5 } = typography;

  return (
    <>
      <DefaultNavbar />
      <PageLayout white>
        <SoftBox my={24} height="calc(100vh - 24rem)">
          <Grid
            container
            spacing={3}
            justifyContent="center"
            alignItems="center"
            sx={{ height: "100%" }}
          >
            <Grid item xs={11} sm={9} container alignItems="center">
              <Grid item xs={12} lg={6}>
                <SoftBox
                  fontSize={{ xs: d5.fontSize, sm: d4.fontSize, md: d3.fontSize, lg: d1.fontSize }}
                  lineHeight={1.2}
                >
                  <SoftTypography variant="inherit" color="error" textGradient fontWeight="bold">
                    Erreur 404
                  </SoftTypography>
                </SoftBox>
                <SoftTypography variant="h2" color="dark" textGradient fontWeight="bold">
                  Erm. Page introuvable
                </SoftTypography>
                <SoftBox mt={1} mb={2}>
                  <SoftTypography variant="body1" color="text">
                    Nous vous suggérons de vous rendre sur la page d'accueil pendant que nous tentons de résoudre ce problème.
                  </SoftTypography>
                </SoftBox>
                <SoftBox mt={4} mb={2}>
                  <SoftButton component={Link} to="/" variant="gradient" color="dark">
                    aller à l'accueil
                  </SoftButton>
                </SoftBox>
              </Grid>
              <Grid item xs={12} lg={6}>
                <SoftBox component="img" src={error404} alt="error-404" width="100%" />
              </Grid>
            </Grid>
          </Grid>
        </SoftBox>
      </PageLayout>
    </>
  );
}

export default Error404;
