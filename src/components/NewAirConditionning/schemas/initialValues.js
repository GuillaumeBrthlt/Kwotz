import checkout from "./form";

const {
  formField: {
    ACname,
    type,
    current_type,
    inside_unit_type,
    surface,
    height,
    volume,
    accessories,
    comment,
  },
} = checkout;

const initialValues = {
  [ACname.name]: "",
  [type.name]: 0,
  [current_type.name]: 0,
  [inside_unit_type.name]: "",
  [surface.name]: "",
  [height.name]: "",
  [volume.name]: "",
  [accessories.name]: "",
  [comment.name]: "",
};

export default initialValues;