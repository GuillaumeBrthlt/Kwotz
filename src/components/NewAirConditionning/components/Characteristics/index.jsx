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

import { Grid } from "@mui/material";
import {Divider} from "@mui/material";
// Soft UI Dashboard PRO React components
import SoftBox from "@components/SoftBox";
import SoftTypography from "@components/SoftTypography";
import FormField from "@components/NewColdRoom/components/FormField";
import SoftInput from "@components/SoftInput";

import { Field, ErrorMessage } from "formik";
import { Select } from "@mui/material";
import {MenuItem} from "@mui/material";

function Characteristics({formData}) {
  const { formField, values, errors, touched } = formData;
  const {type, current_type, inside_unit_type} = formField
  const { 
    type: typeV, 
    current_type: current_typeV,
    inside_unit_type: inside_unit_typeV,
  } = values;

  return (
    <SoftBox>
      <SoftTypography variant="h5" fontWeight="bold">
        Caractéristiques
      </SoftTypography>
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
                  {type.label}
                </SoftTypography>
              </SoftBox>
              <Field 
                name={type.name}
                as={Select}
                input={<SoftInput type="text"/>}
                value={typeV} 
                error={errors.type && touched.type}
              >
                <MenuItem value={0}>Monosplit</MenuItem>
                <MenuItem value={1}>Multisplit</MenuItem>
              </Field>
              <SoftTypography component="div" variant="caption" color="error">
                <ErrorMessage name={type.name} />
              </SoftTypography>
            </SoftBox>
          </Grid>
          <Grid item xs={12} sm={6}>
            <SoftBox mb={3}>
              <SoftBox mb={1} ml={0.5} lineHeight={0} display="inline-block">
                <SoftTypography
                  component="label"
                  variant="caption"
                  fontWeight="bold"
                >
                  {current_type.label}
                </SoftTypography>
              </SoftBox>
              <Field 
                name={current_type.name}
                as={Select}
                input={<SoftInput current_type="text"/>}
                value={current_typeV} 
                error={errors.current_type && touched.current_type}
              >
                <MenuItem value={0}>Monophasé</MenuItem>
                <MenuItem value={1}>Triphasé</MenuItem>
              </Field>
              <SoftTypography component="div" variant="caption" color="error">
                <ErrorMessage name={current_type.name} />
              </SoftTypography>
            </SoftBox>
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormField 
              name={inside_unit_type.name}
              type={inside_unit_type.type}
              label={inside_unit_type.label}
              placeholder={inside_unit_type.placeholder}
              value={inside_unit_typeV}
              error={errors.inside_unit_type && touched.inside_unit_type}
            />
          </Grid>
        </Grid>
      </SoftBox>
    </SoftBox>
  );
}

Characteristics.propTypes = {
  formData: PropTypes.oneOfType([PropTypes.object, PropTypes.func]).isRequired,
};

export default Characteristics;
