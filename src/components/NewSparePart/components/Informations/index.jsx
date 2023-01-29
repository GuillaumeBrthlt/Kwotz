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

// Soft UI Dashboard PRO React components
import SoftBox from "@components/SoftBox";
import SoftTypography from "@components/SoftTypography";

// NewProduct page components
import FormField from "@components/NewSparePart/components/FormField";

function Informations({ formData }) {
  const { formField, values, errors, touched } = formData;
  const { SPname, brand, reference, quantity, details} = formField
  const { 
    SPname: SPnameV, 
    brand: brandV, 
    reference: referenceV, 
    quantity: quantityV,
    details: detailsV
  } = values;

  return (
    <SoftBox>
      <SoftBox mt={3}>
        <Grid container >
          <Grid item xs={12}>
            <FormField 
              name={SPname.name}
              type={SPname.type}
              label={SPname.label} 
              placeholder={SPname.placeholder}
              value={SPnameV}
              error={errors.SPname && touched.SPname}
            />
          </Grid>
        </Grid>
      </SoftBox>
      <SoftBox mt={2}>
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <FormField 
              name={brand.name}
              type={brand.type}
              label={brand.label} 
              placeholder={brand.placeholder}
              value={brandV}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <FormField 
              name={reference.name}
              type={reference.type}
              label={reference.label} 
              placeholder={reference.placeholder}
              value={referenceV}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <FormField 
              name={quantity.name}
              type={quantity.type}
              label={quantity.label} 
              value={quantityV}
            />
          </Grid>
          <Grid item xs={12}>
            <FormField 
              name={details.name}
              type={details.type}
              label={details.label} 
              value={detailsV}
              multiline rows={5}
            />
          </Grid>
        </Grid>
      </SoftBox>
    </SoftBox>
  );
}

Informations.propTypes = {
  formData: PropTypes.oneOfType([PropTypes.object, PropTypes.func]).isRequired,
};

export default Informations;
