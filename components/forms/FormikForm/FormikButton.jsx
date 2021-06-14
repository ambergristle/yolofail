import { useFormikContext } from "formik";
import { Box, Button, CircularProgress, makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  submitting: {
    position: "absolute",
    top: "50%",
    left: "50%",
    marginTop: -12,
    marginLeft: -12,
    opacity: "50%",
  },
}));

// map formik props to Button component
// display form-wide errors; disable when invalid or submitting
const FormikButton = ({ type, label, startIcon, endIcon, ...props }) => {
  const { submitting } = useStyles();

  const { isSubmitting, isValid, dirty, errors, values } = useFormikContext();
  const pending = !isValid || !dirty || isSubmitting; // disable when invalid or submitting
  const error = errors.action; // display form action error

  return (
    <Box display="flex" alignItems="center">
      <Box position="relative">
        <Button
          {...props}
          type={type}
          disabled={pending}
          variant="contained"
          disableElevation
          startIcon={startIcon}
          endIcon={endIcon}
        >
          {label}
        </Button>
        {isSubmitting && (
          <CircularProgress
            size={24}
            color="secondary"
            className={submitting}
          />
        )}
        {error && <FormHelperText error>{error}</FormHelperText>}
      </Box>
    </Box>
  );
};

export default FormikButton;
