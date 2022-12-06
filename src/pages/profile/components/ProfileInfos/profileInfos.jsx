import PropTypes from "prop-types";

// @mui material components
import Grid from "@mui/material/Grid";

// Soft UI Dashboard PRO React components
import SoftBox from "@components/SoftBox";
import SoftTypography from "@components/SoftTypography";

// NewUser page components
import FormField from "../FormField/formField";

function ProfileInfos({ formData }) {
  const { formField, values, errors, touched } = formData;
  const { first_name, last_name, role, phone_number } = formField;
  const { first_name: first_nameV, last_name: last_nameV, role: roleV, phone_number: phone_numberV } = values;

  return (
    <SoftBox>
      <SoftBox lineHeight={0}>
        <SoftTypography variant="h5" fontWeight="bold">
          Informations personnelles
        </SoftTypography>
      </SoftBox>
      <SoftBox mt={1.625}>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <FormField
              type={first_name.type}
              label={first_name.label}
              name={first_name.name}
              value={first_nameV}
              placeholder={first_name.placeholder}
              error={errors.first_name && touched.first_name}
              success={first_nameV.length > 0 && !errors.first_name}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormField
              type={last_name.type}
              label={last_name.label}
              name={last_name.name}
              value={last_nameV}
              placeholder={last_name.placeholder}
              error={errors.last_name && touched.last_name}
              success={last_nameV.length > 0 && !errors.last_name}
            />
          </Grid>
        </Grid>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <FormField
              type={role.type}
              label={role.label}
              name={role.name}
              value={roleV}
              placeholder={role.placeholder}
              error={errors.role && touched.role}
              success={roleV.length > 0 && !errors.role}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormField
              type={phone_number.type}
              label={phone_number.label}
              name={phone_number.name}
              value={phone_numberV}
              placeholder={phone_number.placeholder}
            />
          </Grid>
        </Grid>
      </SoftBox>
    </SoftBox>
  );
}

// typechecking props for ProfileInfos
ProfileInfos.propTypes = {
  formData: PropTypes.oneOfType([PropTypes.object, PropTypes.func]).isRequired,
};

export default ProfileInfos;