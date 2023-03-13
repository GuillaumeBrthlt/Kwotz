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

// @mui material components
import Icon from "@mui/material/Icon";

// Soft UI Dashboard PRO React components
import SoftBox from "@components/SoftBox";
import SoftTypography from "@components/SoftTypography";

// Soft UI Dashboard PRO React base styles
import borders from "@theme/base/borders";



function OutlinedCard({image, text, action}) {
  const { borderWidth, borderColor } = borders;
  return (
    <SoftBox
      height="100%"
      display="flex"
      flexDirection="column"
      justifyContent="flex-end"
      alignItems="center"
      borderRadius="xl"
      shadow="xxl"
      border={`${borderWidth[1]} dashed ${borderColor}`}
      textAlign="center"
      p={3}
      sx={{cursor: 'pointer'}}
      onClick={action}
    >
      <SoftBox component="img" src={image} alt="Rocketship" width="50%" mb={3} />
      <SoftTypography
        variant="button"
        color="text"
        fontWeight="medium"
      >
        {text} <Icon sx={{ fontWeight: "bold" }}>arrow_forward</Icon>
      </SoftTypography>
    </SoftBox>
  );
}

export default OutlinedCard;