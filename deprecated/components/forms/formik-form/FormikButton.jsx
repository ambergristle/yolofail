import { useFormikContext } from "formik";
import {
  Box,
  Button,
  CircularProgress,
  FormHelperText,
  makeStyles,
} from "@material-ui/core";

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
// // overlay with spinner while submitting (in progress) if showLoad
const FormikButton = ({ showLoad, label, width, ...props }) => {
  const { buttonBlock, widthButton, loadingSpinner } = useStyles({ width });

  // get form state from formik context
  const { isSubmitting, isValid, dirty } = useFormikContext();
  const pending = !isValid || !dirty || isSubmitting; // disable when invalid or submitting

  return (
    <Box className={buttonBlock}>
      <Box className={buttonBlock} position="relative" flexDirection="column">
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
      </Box>
    </Box>
  );
};

export default FormikButton;
