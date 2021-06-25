import { useFormikContext } from "formik";
import { Box, Button, CircularProgress, makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  buttonBlock: {
    width: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  widthButton: {
    width: (props) => props.width,
  },
  loadingSpinner: {
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
const FormikButton = ({ showLoad, label, width, ...props }) => {
  const { buttonBlock, widthButton, loadingSpinner } = useStyles({ width });

  const { isSubmitting, isValid, dirty, errors, values } = useFormikContext();
  const pending = !isValid || !dirty || isSubmitting; // disable when invalid or submitting
  const error = errors.action; // display form action error

  return (
    <Box className={buttonBlock}>
      <Box className={buttonBlock} position="relative">
        <Button
          {...props}
          disabled={pending}
          variant="contained"
          disableElevation
          className={widthButton}
        >
          {label}
        </Button>
        {showLoad && isSubmitting && (
          <CircularProgress
            size={24}
            color="secondary"
            className={loadingSpinner}
          />
        )}
        {error && <FormHelperText error>{error}</FormHelperText>}
      </Box>
    </Box>
  );
};

export default FormikButton;
