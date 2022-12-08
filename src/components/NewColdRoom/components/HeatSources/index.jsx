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
import PropTypes from "prop-types";

// Soft UI Dashboard PRO React components
import SoftBox from "@components/SoftBox";
import SoftTypography from "@components/SoftTypography";

// NewProduct page components
import FormField from "@components/NewColdRoom/components/FormField";

function HeatSources({ formData }) {
  const { formField, values } = formData;
  const {heat_sources_power, heat_sources} = formField
  const { 
    heat_sources_power: heat_sources_powerV, 
    heat_sources: heat_sourcesV
  } = values;

  return (
    <SoftBox>
      <SoftTypography variant="h5">Autres sources de chaleur</SoftTypography>
      <Grid container mb={4}>
        <Grid item xs={12} mt={2}>
          <FormField 
            name={heat_sources.name}
            type="text" 
            label="Description des différentes sources de chaleur" 
            multiline rows={5}
            placeholder='ex: four: 5000W (facultatif)'
            value={heat_sourcesV}
          />
        </Grid>
        <Grid item xs={12} mt={2}>
          <FormField 
            name={heat_sources_power.name}
            type="number" 
            label="Puissance total des sources de chaleur (kW)" 
            placeholder='(facultatif)' 
            value={heat_sources_powerV}
          />
        </Grid>
      </Grid>
    </SoftBox>
  );
}

HeatSources.propTypes = {
  formData: PropTypes.oneOfType([PropTypes.object, PropTypes.func]).isRequired,
};

export default HeatSources;
