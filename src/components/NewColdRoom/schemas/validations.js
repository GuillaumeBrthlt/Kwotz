import * as Yup from "yup";
import checkout from "./form";

const {
  formField: {
    CFname,
    temperature,
    condensing_unit,
    prod_outside,
    refrigerant_type,
    CFlength,
    width,
    height,
    volume,
    product_types,
    entries_frequency,
    entries_quantity,
    heat_sources_power,
    heat_sources,
    comment,
  },
} = checkout;

const validations = [
  Yup.object().shape({
    [CFname.name]: Yup.string().required(CFname.errorMsg),
    [temperature.name]: Yup.number().required(temperature.errorMsg),
    [condensing_unit.name]: Yup.string().required(condensing_unit.errorMsg),
    [prod_outside.name]: Yup.boolean(),
    [refrigerant_type.name]: Yup.string().required(refrigerant_type.errorMsg),
  }),
  Yup.object().shape({
    [CFlength.name]: Yup.number(),
    [width.name]: Yup.number(),
    [height.name]: Yup.number(),
    [volume.name]: Yup.number(),
  }),
  Yup.object().shape({
    [product_types.name]: Yup.string().required(product_types.errorMsg),
    [entries_frequency.name]: Yup.string(),
    [entries_quantity.name]: Yup.number(),
  }),
  Yup.object().shape({
    [heat_sources_power.name]: Yup.number(),
    [heat_sources.name]: Yup.string(),
  }),
  Yup.object().shape({
    [comment.name]: Yup.string(),
  }),
];

export default validations;