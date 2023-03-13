import * as Yup from "yup";
import checkout from "./form";

const {
  formField: {
    SPname,
    brand,
    reference,
    quantity,
    details,
  }
} = checkout;

const validations = [
  Yup.object().shape({
    [SPname.name]: Yup.string().required(SPname.errorMsg),
    [brand.name]: Yup.string(),
    [reference.name]: Yup.string(),
    [quantity.name]: Yup.number(),
    [details.name]: Yup.string(),
  })
];

export default validations;