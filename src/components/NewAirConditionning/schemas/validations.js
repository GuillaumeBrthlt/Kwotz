import * as Yup from "yup";
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

const validations = [
  Yup.object().shape({
    [ACname.name]: Yup.string().required(ACname.errorMsg),
    [surface.name]: Yup.number(),
    [height.name]: Yup.number(),
    [volume.name]: Yup.number(),
  }),
  Yup.object().shape({
    [type.name]: Yup.number().required(type.errorMsg),
    [current_type.name]: Yup.number().required(current_type.errorMsg),
    [inside_unit_type.name]: Yup.string().required(inside_unit_type.errorMsg),
  }),
  Yup.object().shape({
    [accessories.name]: Yup.string(),
    [comment.name]: Yup.string(),
  }),
];

export default validations;