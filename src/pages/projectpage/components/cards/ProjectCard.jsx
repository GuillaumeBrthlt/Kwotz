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

// react-router components
import { Link } from "react-router-dom";

// prop-types is library for typechecking of props
import PropTypes from "prop-types";

// @mui material components
import Card from "@mui/material/Card";
import Divider from "@mui/material/Divider";

// Soft UI Dashboard PRO React components
import SoftBox from "@components/SoftBox";
import SoftTypography from "@components/SoftTypography";
import SoftButton from "@components/SoftButton";
import Cube from "@theme/Icons/Cube";

function ProjectCard({title, dateTime, action }) {

  return (
    <Card>
      <SoftBox p={2}>
        <SoftBox display="flex" alignItems="center">
          <Cube size="48px" color="info"/>
          <SoftBox ml={1} lineHeight={0}>
            <SoftTypography variant="h6" fontWeight="medium" textTransform="capitalize">
              {title}
            </SoftTypography>
            {dateTime ? (
              <SoftTypography
                variant="caption"
                fontWeight="regular"
                color="text"
                textTransform="capitalize"
              >
                {dateTime}
              </SoftTypography>
            ) : null}
          </SoftBox>
        </SoftBox>
        <Divider />
        <SoftBox display="flex" justifyContent="space-between" alignItems="center">
          {action.type === "internal" ? (
            <SoftButton
              component={Link}
              to={action.route}
              variant="gradient"
              color={action.color}
              size="small"
            >
              {action.label}
            </SoftButton>
          ) : (
            <SoftButton
              component="a"
              href={action.route}
              variant="gradient"
              color={action.color}
              size="small"
            >
              {action.label}
            </SoftButton>
          )}
        </SoftBox>
      </SoftBox>
    </Card>
  );
}

// Setting default values for the props of ProjectCard
ProjectCard.defaultProps = {
  id: "",
  dateTime: "",
};

// Typechecking props for the ProjectCard
ProjectCard.propTypes = {
  title: PropTypes.string.isRequired,
  dateTime: PropTypes.string,
  members: PropTypes.arrayOf(PropTypes.object),
  action: PropTypes.shape({
    type: PropTypes.oneOf(["enternal", "internal"]).isRequired,
    route: PropTypes.string.isRequired,
    color: PropTypes.oneOf([
      "primary",
      "secondary",
      "info",
      "success",
      "warning",
      "error",
      "dark",
      "light",
    ]).isRequired,
    label: PropTypes.string.isRequired,
  }).isRequired,
};

export default ProjectCard;