import * as Yup from "yup";
import checkout from "./form";

const {
  formField: { company, address, zipcode, city, role, first_name, last_name, shipping_alias, shipping_address, shipping_zipcode, shipping_city },
} = checkout;

const validations = [
  Yup.object().shape({
    [company.name]: Yup.string().required(company.errorMsg),
    [address.name]: Yup.string().required(address.errorMsg),
    [zipcode.name]: Yup.string().required(zipcode.errorMsg).min(4, zipcode.invalidMsg),
    [city.name]: Yup.string().required(city.errorMsg),
  }),
  Yup.object().shape({
    [shipping_alias.name]: Yup.string().required(shipping_alias.errorMsg),
    [shipping_address.name]: Yup.string().required(shipping_address.errorMsg),
    [shipping_zipcode.name]: Yup.string().required(shipping_zipcode.errorMsg).min(4, zipcode.invalidMsg),
    [shipping_city.name]: Yup.string().required(shipping_city.errorMsg),
  }),
  Yup.object().shape({
    [role.name]: Yup.string().required(role.errorMsg),
    [first_name.name]: Yup.string().required(first_name.errorMsg),
    [last_name.name]: Yup.string().required(last_name.errorMsg),
  }),
];

export default validations;