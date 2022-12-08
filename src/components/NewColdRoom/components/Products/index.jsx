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
import { Field} from "formik";
import { Select, MenuItem } from "@mui/material";
import SoftInput from '@components/SoftInput'

// NewProduct page components
import FormField from "@components/NewColdRoom/components/FormField";

function Products({ formData }) {
  const { formField, values, errors, touched } = formData;
  const { product_types, entries_frequency, entries_quantity} = formField
  const { 
    product_types: product_typesV, 
    entries_frequency: entries_frequencyV, 
    entries_quantity: entries_quantityV, 
  } = values;

  return (
    <SoftBox>
      <SoftTypography variant="h5">Denrées stockées</SoftTypography>
      <SoftBox mt={3}>
        <Grid container >
          <Grid item xs={12}>
            <FormField 
              name={product_types.name}
              type="text" 
              label="type de denrées" 
              placeholder="ex: fruits et légumes" 
              value={product_typesV}
              error={errors.product_types && touched.product_types}
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
                  {entries_frequency.label}
                </SoftTypography>
              </SoftBox>
              <Field 
                name={entries_frequency.name}
                as={Select}
                input={<SoftInput type="text"/>}
                value={entries_frequencyV} 
              >
                <MenuItem value="daily">tous les jours</MenuItem>
                <MenuItem value="weekly">toutes les semaines</MenuItem>
                <MenuItem value="monthly">tous les mois</MenuItem>
              </Field>
            </SoftBox>
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormField 
              name={entries_quantity.name}
              type="number" 
              label="Quantité par entrée (kg)" 
              placeholder="ex: 1500 (facultatif)" 
              value={entries_quantityV}
            />
          </Grid>
        </Grid>
      </SoftBox>
    </SoftBox>
  );
}

Products.propTypes = {
  formData: PropTypes.oneOfType([PropTypes.object, PropTypes.func]).isRequired,
};

export default Products;
