import checkout from "./form";
import { useUserProfileStore } from "@contexts/UserProfileContext";

const {
  formField: {
    company,
    address,
    zipcode,
    city,
    role,
    first_name,
    last_name,
    shipping_alias,
    shipping_address,
    shipping_zipcode,
    shipping_city,
    phone_number,
  },
} = checkout;

const initialValues = {
  [company.name]: "",
  [address.name]: "",
  [zipcode.name]: "",
  [city.name]: "",
  [role.name]: "",
  [first_name.name]: "",
  [last_name.name]: "",
  [shipping_alias.name]: "",
  [shipping_address.name]: "",
  [shipping_zipcode.name]: "",
  [shipping_city.name]: "",
  [phone_number.name]: "",
};

export default initialValues;