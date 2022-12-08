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

// prop-type is a library for typechecking of props
import PropTypes from "prop-types";
import { Field, ErrorMessage } from "formik";

// Soft UI Dashboard PRO React components
import SoftBox from "@components/SoftBox";
import SoftTypography from "@components/SoftTypography";
import SoftInput from "@components/SoftInput";

function FormField({ name, label, ...rest }) {
  return (
    <>
      <SoftBox mb={1} ml={0.5} lineHeight={0} display="inline-block">
        <SoftTypography
          component="label"
          variant="caption"
          fontWeight="bold"
        >
          {label}
        </SoftTypography>
      </SoftBox>
      <Field name={name} as={SoftInput} {...rest}/>
      <SoftTypography component="div" variant="caption" color="error">
        <ErrorMessage name={name} />
      </SoftTypography>
    </>
  );
}

// typechecking props for FormField
FormField.propTypes = {
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired
};

export default FormField;
