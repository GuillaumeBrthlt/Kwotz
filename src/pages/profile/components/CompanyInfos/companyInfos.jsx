import PropTypes from "prop-types";

// @mui material components
import Grid from "@mui/material/Grid";

// Soft UI Dashboard PRO React components
import SoftBox from "@components/SoftBox";
import SoftTypography from "@components/SoftTypography";

// NewUser page components
import FormField from "../FormField/formField";

function CompanyInfos({ formData }) {
  const { formField, values, errors, touched } = formData;
  const { company, address, zipcode, city } = formField;
  const {
    company: companyV,
    address: addressV,
    zipcode: zipcodeV,
    city: cityV,
  } = values;

  return (
    <SoftBox>
      <SoftBox lineHeight={0}>
        <SoftTypography variant="h5" fontWeight="bold">
          Ma société
        </SoftTypography>
        <SoftTypography variant="button" fontWeight="regular" color="text">
          Informations obligatoires
        </SoftTypography>
      </SoftBox>
      <SoftBox mt={1.625}>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <FormField
              type={company.type}
              label={company.label}
              name={company.name}
              value={companyV}
              placeholder={company.placeholder}
              error={errors.company && touched.company}
              success={companyV.length > 0 && !errors.company}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormField
              type={address.type}
              label={address.label}
              name={address.name}
              value={addressV}
              placeholder={address.placeholder}
              error={errors.address && touched.address}
              success={addressV.length > 0 && !errors.address}
            />
          </Grid>
        </Grid>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <FormField
              type={zipcode.type}
              label={zipcode.label}
              name={zipcode.name}
              value={zipcodeV}
              placeholder={zipcode.placeholder}
              error={errors.zipcode && touched.zipcode}
              success={zipcodeV.length > 0 && !errors.zipcode}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormField
              type={city.type}
              label={city.label}
              name={city.name}
              value={cityV}
              placeholder={city.placeholder}
              error={errors.city && touched.city}
              success={cityV.length > 0 && !errors.city}
            />
          </Grid>
        </Grid>
      </SoftBox>
    </SoftBox>
  );
}

// typechecking props for CompanyInfos
CompanyInfos.propTypes = {
  formData: PropTypes.oneOfType([PropTypes.object, PropTypes.func]).isRequired,
};

export default CompanyInfos;