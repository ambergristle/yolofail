import { useField } from "formik";
import { TextField, Chip } from "@material-ui/core";
import { Autocomplete } from "@material-ui/lab";

// map formik props to Autocomplete component
const FormikAutocomplete = ({ placeholder, options, setOptions, ...props }) => {
  // field passes props required for form handling
  const [field, meta, helpers] = useField(props);
  const selected = field.value;
  const { setValue } = helpers;

  return (
    <Autocomplete
      {...field}
      {...props}
      options={options}
      filterSelectedOptions
      disableClearable
      forcePopupIcon={false}
      onChange={(_e, value) => setValue(value)}
      renderInput={(params) => (
        <TextField
          {...params}
          placeholder={!selected ? placeholder : ""}
          fullWidth
          variant="outlined"
          margin="dense"
        />
      )}
    />
  );
};

export default FormikAutocomplete;
