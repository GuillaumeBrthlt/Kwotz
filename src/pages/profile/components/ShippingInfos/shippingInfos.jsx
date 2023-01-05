import { useState } from "react";

// prop-type is a library for typechecking of props
import PropTypes from "prop-types";

// @mui material components
import Grid from "@mui/material/Grid";

// Soft UI Dashboard PRO React components
import SoftBox from "@components/SoftBox";
import SoftTypography from "@components/SoftTypography";

// NewUser page components
import FormField from "../FormField/formField";

function ShippingInfos({ formData }) {
  const [state, setState] = useState("...");
  const { formField, values, errors, touched } = formData;
  const { shipping_alias, shipping_address, shipping_zipcode, shipping_city } = formField;
  const { shipping_alias: shipping_aliasV, shipping_address: shipping_addressV, shipping_zipcode: shipping_zipcodeV, shipping_city: shipping_cityV } = values;

  const handleSetState = (event) => setState(event.target.value);

  return (
    <SoftBox>
      <SoftTypography variant="h5" fontWeight="bold">
        Adresse de livraison par défaut
      </SoftTypography>
      <SoftBox mt={1.625}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <FormField
              type={shipping_alias.type}
              label={shipping_alias.label}
              name={shipping_alias.name}
              value={shipping_aliasV}
              placeholder={shipping_alias.placeholder}
              error={errors.shipping_alias && touched.shipping_alias}
              success={shipping_aliasV.length > 0 && !errors.shipping_alias}
            />
          </Grid>
          <Grid item xs={12}>
            <SoftBox mt={-1.625}>
              <FormField
                type={shipping_address.type}
                label={shipping_address.label}
                name={shipping_address.name}
                value={shipping_addressV}
                placeholder={shipping_address.placeholder}
                error={errors.shipping_address && touched.shipping_address}
                success={shipping_addressV.length > 0 && !errors.shipping_address}
              />
            </SoftBox>
          </Grid>
        </Grid>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <FormField
              type={shipping_city.type}
              label={shipping_city.label}
              name={shipping_city.name}
              value={shipping_cityV}
              placeholder={shipping_city.placeholder}
              error={errors.shipping_city && touched.shipping_city}
              success={shipping_cityV.length > 0 && !errors.shipping_city}
            />
          </Grid>
          <Grid item xs={6} sm={3}>
            <FormField
              type={shipping_zipcode.type}
              label={shipping_zipcode.label}
              name={shipping_zipcode.name}
              value={shipping_zipcodeV}
              placeholder={shipping_zipcode.placeholder}
              error={errors.shipping_zipcode && touched.shipping_zipcode}
              success={shipping_zipcodeV.length > 0 && !errors.shipping_zipcode}
            />
          </Grid>
        </Grid>
      </SoftBox>
    </SoftBox>
  );
}

// typechecking props for Address
ShippingInfos.propTypes = {
  formData: PropTypes.oneOfType([PropTypes.object, PropTypes.func]).isRequired,
};

export default ShippingInfos;