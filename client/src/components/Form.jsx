import React from "react";

import {
  Grid,
  TextField,
  InputAdornment,
  Button,
  FormHelperText,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import { KeyboardDatePicker } from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import sub from "date-fns/sub";

const useStyles = makeStyles((theme) => ({
  button: {
    width: "40%",
  },
  buttonItem: {
    display: "flex",
    justifyContent: "center",
  },
}));

function Form(props) {
  const classes = useStyles();

  return (
    <Grid item xs={12} container spacing={1}>
      <Grid item xs={12} sm={4}>
        <TextField
          id="symbol-input"
          placeholder={props.defaults.symbol}
          value={props.selectedSymbol}
          onChange={props.handleSymbolChange}
          error={Boolean(props.errors.symbol)}
          helperText={props.errors.symbol}
          variant="outlined"
          label="symbol"
          margin="dense"
          fullWidth
          autoFocus
        />
      </Grid>

      <Grid item xs={12} sm={4}>
        <TextField
          id="amount-input"
          placeholder={props.defaults.amount}
          value={props.selectedAmount}
          onChange={props.handleAmountChange}
          error={Boolean(props.errors.amount)}
          helperText={props.errors.amount}
          InputProps={{
            startAdornment: <InputAdornment position="start">$</InputAdornment>,
          }}
          variant="outlined"
          label="amount"
          margin="dense"
          fullWidth
        />
      </Grid>

      <Grid item xs={12} sm={4}>
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <KeyboardDatePicker
            id="date-input"
            placeholder={props.defaults.date.toLocaleDateString("en-US", {
              month: "2-digit",
              day: "2-digit",
              year: "numeric",
            })}
            value={props.selectedDate}
            onChange={props.handleDateChange}
            minDate={sub(props.defaults.date, { years: 10 })}
            disableFuture="true"
            autoOk
            animateYearScrolling
            format="MM/dd/yyyy"
            inputVariant="outlined"
            disableToolbar="true"
            InputAdornmentProps={{ position: "start" }}
            label="date"
            invalidDateMessage="Invalid Date Format"
            minDateMessage="Data Unavailable"
            maxDateMessage="Data Unavailable"
            margin="dense"
            fullWidth
          />
        </MuiPickersUtilsProvider>
      </Grid>

      <Grid item xs={12} className={classes.buttonItem}>
        <Button
          onClick={props.handleClick}
          variant="contained"
          color="primary"
          size="large"
          disableElevation
          className={classes.button}
        >
          yeet
        </Button>
        <FormHelperText />
      </Grid>
    </Grid>
  );
}

export default Form;
