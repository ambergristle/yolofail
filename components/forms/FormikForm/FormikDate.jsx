import { useField } from "formik";
import { format, formatISO } from "date-fns";
import DateFnsUtils from "@date-io/date-fns";
import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import { DatePicker } from "@material-ui/pickers";
import { InputAdornment } from "@material-ui/core";
import EventIcon from "@material-ui/icons/Event";

// map formik props to DateTimePicker component
const FormikDate = ({ placceholder, ...props }) => {
  // field passes props required for form handling
  const [field, meta, helpers] = useField(props);
  const { setValue } = helpers;

  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <DatePicker
        {...field}
        {...props}
        onChange={(value) => setValue(formatISO(value))}
        autoOk
        disableToolbar="true"
        invalidDateMessage="Invalid Date Format"
        disableFuture="true"
        minDateMessage="Data Unavailable"
        maxDateMessage="Data Unavailable"
        inputVariant="outlined"
        margin="dense"
        fullWidth
        format="MM/dd/yyyy"
        animateYearScrolling
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <EventIcon />
            </InputAdornment>
          ),
        }}
      />
    </MuiPickersUtilsProvider>
  );
};

export default FormikDate;
