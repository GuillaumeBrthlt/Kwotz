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

import { useState } from "react";
import PropTypes from "prop-types";

// @mui material components
import Grid from "@mui/material/Grid";

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
  const {CFname, temperature, condensing_unit, prod_outside, refrigerant_type} = formField
  const { 
    CFname: CFnameV, 
    temperature: temperatureV, 
    condensing_unit: condensing_unitV, 
    prod_outside: prod_outsideV, 
    refrigerant_type: refrigerant_typeV 
  } = values;



  return (
    <SoftBox>
      <SoftTypography variant="h5">Informations générales</SoftTypography>
      <SoftBox mt={3}>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <FormField 
              name={CFname.name}
              type={CFname.type}
              label={CFname.label}
              placeholder={CFname.placeholder}
              value={CFnameV}
              error={errors.CFname && touched.CFname}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormField 
              name={temperature.name}
              type={temperature.type}
              label={temperature.label}
              placeholder={temperature.placeholder}
              value={temperatureV}
              error={errors.temperature && touched.temperature}
            />
          </Grid>
        </Grid>
      </SoftBox>
      <SoftBox mt={2}>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <SoftBox mb={3}>
              <SoftBox mb={1} ml={0.5} lineHeight={0} display="inline-block">
                <SoftTypography
                  component="label"
                  variant="caption"
                  fontWeight="bold"
                >
                  {condensing_unit.label}
                </SoftTypography>
              </SoftBox>
              <Field 
                name={condensing_unit.name}
                as={Select}
                input={<SoftInput type="text"/>}
                value={condensing_unitV} 
                error={errors.condensing_unit && touched.condensing_unit}
              >
                <MenuItem value="independant">Groupe de production indépendant</MenuItem>
                <MenuItem value="compressor_rack">Sur centrale de production</MenuItem>
                <MenuItem value="without">Ne pas chiffrer la production</MenuItem>
              </Field>
              <SoftTypography component="div" variant="caption" color="error">
                <ErrorMessage name={condensing_unit.name} />
              </SoftTypography>
            </SoftBox>
            <SoftBox mb={3}>
              <SoftBox mb={1} ml={0.5} lineHeight={0} display="inline-block">
                <SoftTypography
                  component="label"
                  variant="caption"
                  fontWeight="bold"
                >
                  Emplacement de la production
                </SoftTypography>
              </SoftBox>
              <Field 
                name={prod_outside.name}
                as={Select}
                input={<SoftInput type="text"/>}
                value={prod_outsideV} 
                error={errors.prod_outside && touched.prod_outside}
              >
                <MenuItem value="outside">A l'extérieur</MenuItem>
                <MenuItem value="inside">En salle des machines</MenuItem>
                <MenuItem value="without">Ne pas chiffrer la production</MenuItem>
              </Field>
              <SoftTypography component="div" variant="caption" color="error">
                <ErrorMessage name={condensing_unit.name} />
              </SoftTypography>
            </SoftBox>
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormField 
              name={refrigerant_type.name}
              type={refrigerant_type.type}
              label={refrigerant_type.label}
              placeholder={refrigerant_type.placeholder}
              value={refrigerant_typeV}
              error={errors.refrigerant_type && touched.refrigerant_type}
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
