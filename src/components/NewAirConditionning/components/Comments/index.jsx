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
import FormField from "@components/NewColdRoom/components/FormField";

function Comments({ formData }) {
  const { formField, values } = formData;
  const {comment, accessories} = formField
  const { 
    comment: commentV, 
    accessories: accessoriesV,
  } = values;

  return (
    <SoftBox>
      <SoftTypography variant="h5">Commentaires</SoftTypography>
      <Grid container mb={4}>
        <Grid item xs={12} mt={2}>
          <FormField 
            name={accessories.name}
            type={accessories.type}
            label={accessories.label}
            multiline rows={5}
            placeholder={accessories.placeholder}
            value={accessoriesV}            
          />
        </Grid>
        <Grid item xs={12} mt={2}>
          <FormField 
            name={comment.name}
            type={comment.type}
            label={comment.label}
            multiline rows={5}
            placeholder={comment.placeholder}
            value={commentV}            
          />
        </Grid>
      </Grid>
    </SoftBox>
  );
}

Comments.propTypes = {
  formData: PropTypes.oneOfType([PropTypes.object, PropTypes.func]).isRequired,
};

export default Comments;
