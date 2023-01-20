import checkout from "./form";

const {
  formField: {
    SPname,
    brand,
    reference,
    quantity,
    details,
  },
} = checkout;

const initialValues = {
  [SPname.name]: "",
  [brand.name]: "",
  [reference.name]: "",
  [quantity.name]: 1,
  [details.name]: "",
};

export default initialValues;