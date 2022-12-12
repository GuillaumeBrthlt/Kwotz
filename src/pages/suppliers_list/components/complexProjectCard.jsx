// prop-types is library for typechecking of props
import PropTypes from "prop-types";

// @mui material components
import Card from "@mui/material/Card";
import Divider from "@mui/material/Divider";
import Icon from "@mui/material/Icon";

// Soft UI Dashboard PRO React components
import SoftBox from "@components/SoftBox";
import SoftTypography from "@components/SoftTypography";
import SoftAvatar from "@components/SoftAvatar";

// Custom styles for ComplexProjectCard
function ComplexProjectCard({ color, title, description, suppliers, dropdown }) {
  const renderSuppliers = suppliers.map((supplier, key) => {
    const supplierKey = `supplier-${key}`;    
  });

  return (
    <Card>
      <SoftBox p={2}>
        <SoftBox display="flex" alignItems="center">
          <SoftAvatar
            alt={title}
            size="xl"
            bgColor={color}
            sx={{ p: 1 }}
          />
          <SoftBox ml={2} lineHeight={0}>
            <SoftBox mb={1} lineHeight={0}>
              <SoftTypography variant="h6" textTransform="capitalize" fontWeight="medium">
                {title}
              </SoftTypography>
            </SoftBox>
            {suppliers.length > -1 ? <SoftBox display="flex">{renderSuppliers}</SoftBox> : null}
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
        <SoftBox my={2} lineHeight={1}>
          <SoftTypography variant="button" fontWeight="regular" color="text">
            {description}
          </SoftTypography>
        </SoftBox>
        <Divider />

        <SoftBox display="flex" justifyContent="space-between" alignItems="center">
          {suppliers.length > -1 ? (
            <SoftBox display="flex" flexDirection="column" lineHeight={0}>
              <SoftTypography variant="button" fontWeight="medium">
                {suppliers.length}
              </SoftTypography>
              <SoftTypography variant="button" fontWeight="medium" color="secondary">
                Nombre de contacts
              </SoftTypography>
            </SoftBox>
          ) : null}
            <SoftBox display="flex" flexDirection="column" lineHeight={0}>
              <SoftTypography variant="button" fontWeight="medium" color="secondary">
                Contacter
              </SoftTypography>
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
  title: PropTypes.string.isRequired,
  description: PropTypes.node.isRequired,
  suppliers: PropTypes.arrayOf(PropTypes.string),
  dropdown: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.shape({
      action: PropTypes.func,
      menu: PropTypes.node,
    }),
  ]),
};

export default ComplexProjectCard;
