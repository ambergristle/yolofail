import { useField } from "formik";
import { TextField, FormHelperText } from "@material-ui/core";

// map formik props to TextField component
const FormikField = ({ type, placeholder, multiline, rows, ...props }) => {
  // field passes props required for form handling
  const [field, meta] = useField(props);

  // if field error and field touched, display error
  const errorText = meta.error && meta.touched ? meta.error : "";

  return (
    <TextField
      {...field}
      {...props}
      type={type}
      placeholder={placeholder}
      error={!!errorText}
      label={errorText}
      multiline={multiline}
      rows={rows}
      fullWidth
      variant="outlined"
      margin="dense"
    />
  );
};

export default FormikField;
