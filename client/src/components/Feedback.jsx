import React, { useState } from "react";

import { Grid, TextField, Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import SendIcon from "@material-ui/icons/Send";

const useStyles = makeStyles((theme) => ({
  button: {
    width: "40%",
  },
  buttonItem: {
    display: "flex",
    justifyContent: "center",
  },
}));

function Feedback() {
  const [email, setEmail] = useState();
  const [message, setMessage] = useState();

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };
  const handleMessageChange = (event) => {
    setMessage(event.target.value);
  };

  const handleClick = () => {
    console.log(email, message);
  };

  const classes = useStyles();

  return (
    <Grid item xs={12} container spacing={1}>
      <Grid item xs={12}>
        <TextField
          placeholder="you@email.com"
          value={email}
          onChange={handleEmailChange}
          label="email"
          variant="outlined"
          margin="dense"
          fullWidth
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          placeholder="let us know what you think!"
          value={message}
          onChange={handleMessageChange}
          multiline
          rows={3}
          rowsMax={3}
          label="feedback"
          variant="outlined"
          margin="dense"
          fullWidth
        />
      </Grid>
      <Grid item xs={12} className={classes.buttonItem}>
        <Button
          onClick={handleClick}
          endIcon={<SendIcon />}
          variant="contained"
          color="primary"
          className={classes.button}
          size="large"
        >
          send
        </Button>
      </Grid>
    </Grid>
  );
}

export default Feedback;
