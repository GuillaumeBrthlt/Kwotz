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

import PropTypes from "prop-types";

// @mui material components
import Grid from "@mui/material/Grid";
import {Divider} from "@mui/material";

// Soft UI Dashboard PRO React components
import SoftBox from "@components/SoftBox";
import SoftTypography from "@components/SoftTypography";
import SoftInput from "@components/SoftInput"

// NewProduct page components
import FormField from "@components/NewColdRoom/components/FormField";
import { Field, ErrorMessage } from "formik";
import { Select } from "@mui/material";
import {MenuItem} from "@mui/material";


function GeneralInfo({ formData }) {
  const { formField, values, errors, touched } = formData;
  const {ACname, surface, height, volume} = formField
  const { 
    ACname: ACnameV, 
    surface: surfaceV, 
    height: heightV, 
    volume: volumeV, 
  } = values;

  return (
    <SoftBox>
      <SoftTypography variant="h5">Informations générales</SoftTypography>
      <SoftBox mt={3}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <FormField 
              name={ACname.name}
              type={ACname.type}
              label={ACname.label}
              placeholder={ACname.placeholder}
              value={ACnameV}
              error={errors.ACname && touched.ACname}
            />
          </Grid>
        </Grid>
      </SoftBox>
      <SoftBox mt={2}>
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <FormField 
              name={surface.name}
              type={surface.type}
              label={surface.label}
              value={surfaceV}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <FormField 
              name={height.name}
              type={height.type}
              label={height.label}
              value={heightV}
            />
          </Grid>
        </Grid>
      </SoftBox>
      <SoftBox position="relative" py={3}>
        <Divider />
        <SoftBox
          bgColor="white"
          position="absolute"
          top="50%"
          left="50%"
          px={1.5}
          lineHeight={1}
          sx={{ transform: "translate(-50%, -60%)" }}
        >
          <SoftTypography variant="button" fontWeight="medium" color="secondary">
            ou
          </SoftTypography>
        </SoftBox>
      </SoftBox>
      <SoftBox>
        <Grid container mb={4}>
          <Grid item xs={12}>
            <FormField 
              name={volume.name}
              type={volume.type}
              label={volume.label}
              value={volumeV}
            />
          </Grid>
        </Grid>
      </SoftBox>
    </SoftBox>
  );
}

GeneralInfo.propTypes = {
  formData: PropTypes.oneOfType([PropTypes.object, PropTypes.func]).isRequired,
};

export default GeneralInfo;
