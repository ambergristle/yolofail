import React from "react";

import { AppBar, Toolbar, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  appBar: {
    marginBottom: "2%",
    boxShadow: "none",
  },
  toolBar: {
    display: "flex",
    justifyContent: "center",
  },
}));

function Header() {
  const classes = useStyles();

  return (
    <AppBar position="static" className={classes.appBar} color="transparent">
      <Toolbar className={classes.toolBar}>
        <Typography variant="h4" align="center" color="primary">
          yolofail
        </Typography>
      </Toolbar>
    </AppBar>
  );
}

export default Header;
