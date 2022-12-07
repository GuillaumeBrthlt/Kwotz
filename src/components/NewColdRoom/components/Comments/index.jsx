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

// Soft UI Dashboard PRO React components
import SoftBox from "@components/SoftBox";
import SoftTypography from "@components/SoftTypography";
import SoftSelect from "@components/SoftSelect";

// NewProduct page components
import FormField from "@components/NewColdRoom/components/FormField";

function Comments() {
  return (
    <SoftBox>
      <SoftTypography variant="h5">Autres sources de chaleur</SoftTypography>
      <Grid container mb={4}>
        <Grid item xs={12} mt={2}>
          <FormField 
            type="text" 
            label="Description des différentes sources de chaleur" 
            multiline rows={5}
            placeholder='(facultatif)'
          />
        </Grid>
      </Grid>
    </SoftBox>
  );
}

export default Comments;
