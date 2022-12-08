import checkout from "./form";

const {
  formField: {
    CFname,
    temperature,
    condensing_unit,
    prod_outside,
    refrigerant_type,
    length,
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

const initialValues = {
  [CFname.name]: "",
  [temperature.name]: "",
  [condensing_unit.name]: "",
  [prod_outside.name]: "",
  [refrigerant_type.name]: "",
  [length.name]: "",
  [width.name]: "",
  [height.name]: "",
  [volume.name]: "",
  [product_types.name]: "",
  [entries_frequency.name]: "",
  [entries_quantity.name]: "",
  [heat_sources_power.name]: "",
  [heat_sources.name]: "",
  [comment.name]: "",
};

export default initialValues;