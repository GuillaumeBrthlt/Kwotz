// prop-types is library for typechecking of props
import PropTypes from "prop-types";

// @mui material components
import Card from "@mui/material/Card";
import Divider from "@mui/material/Divider";
import Icon from "@mui/material/Icon";

// Soft UI Dashboard PRO React components
import SoftBox from "@components/SoftBox";
import SoftTypography from "@components/SoftTypography";
import Avatar from '@mui/material/Avatar';
import SoftButton from "@components/SoftButton";
import { Link } from "react-router-dom";


import StoreIcon from '@mui/icons-material/Store';


// Custom styles for ComplexProjectCard
function ComplexProjectCard({ color, supplier, dropdown }) {

  function stringToColor(string) {
    let hash = 0;
    let i;
  
    /* eslint-disable no-bitwise */
    for (i = 0; i < string.length; i += 1) {
      hash = string.charCodeAt(i) + ((hash << 5) - hash);
    }
  
    let color = '#';
  
    for (i = 0; i < 3; i += 1) {
      const value = (hash >> (i * 8)) & 0xff;
      color += `00${value.toString(16)}`.slice(-2);
    }
    /* eslint-enable no-bitwise */
  
    return color;
  }

  
  function stringAvatar(alias) {
    const aliasArray = alias.split(' ')
    return {
      sx: {
        bgcolor: stringToColor(alias),
      },
      children: `${aliasArray.map(string => string[0]).join('')}`,
    };
  }
  
  return (
    <Card>
      <SoftBox p={2}>
        <SoftBox display="flex" alignItems="center">
          <Avatar {...stringAvatar(supplier.alias)}/>
          <SoftBox ml={2} lineHeight={0}>
            <SoftBox mb={1} lineHeight={0}>
              <SoftTypography variant="h6" textTransform="capitalize" fontWeight="medium">
                {supplier.alias}
              </SoftTypography>
            </SoftBox>
          </SoftBox>
          {dropdown && (
            <SoftTypography
              color="secondary"
              onClick={dropdown.action}
              sx={{
                ml: "auto",
                alignSelf: "flex-start",
                py: 1.25,
              }}
            >
              <Icon fontSize="default" sx={{ cursor: "pointer" }}>
                more_vert
              </Icon>
            </SoftTypography>
          )}
          {dropdown.menu}
        </SoftBox>
        <SoftBox my={2}>
          <SoftTypography  variant="body2" color="text">
            {supplier.address}
          </SoftTypography>
          <SoftTypography  variant="body2" color="text">
            {supplier.zipcode}, {supplier.city}
          </SoftTypography>
        </SoftBox>
        <Divider />

        <SoftBox display="flex" justifyContent="space-between" alignItems="center">
            <SoftBox display="flex" flexDirection="column" lineHeight={0}>
              <SoftTypography variant="button" fontWeight="medium">
                {supplier.supplier_contacts.length}
              </SoftTypography>
              <SoftTypography variant="button" fontWeight="medium" color="secondary">
                Contact(s)
              </SoftTypography>
            </SoftBox>
            <SoftBox display="flex" flexDirection="column" lineHeight={0}>
              <SoftButton color="info" size="small" component={Link} to={`/suppliers/${supplier.id}`}>
                Voir
              </SoftButton>
            </SoftBox>
        </SoftBox>
      </SoftBox>
    </Card>
  );
}

// Setting default values for the props of ComplexProjectCard
ComplexProjectCard.defaultProps = {
  color: "dark",
  suppliers: [],
  dropdown: false,
};

// Typechecking props for the ProfileInfoCard
ComplexProjectCard.propTypes = {
  color: PropTypes.oneOf([
    "primary",
    "secondary",
    "info",
    "success",
    "warning",
    "error",
    "dark",
    "light",
  ]),
  dropdown: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.shape({
      action: PropTypes.func,
      menu: PropTypes.node,
    }),
  ]),
};

export default ComplexProjectCard;
