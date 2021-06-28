import { Box, Typography, makeStyles } from "@material-ui/core";

// layer spinner over chart, display when loading only
const useStyles = makeStyles((theme) => ({
  errorBlock: {
    position: "absolute",
    top: "0",
    left: "0",
    width: "100%",
    height: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(255,255,255,1)",
  },
}));

// overlay semi-tranlucent loading spinner while value data is retrieved
const SystemError = ({ message }) => {
  const { errorBlock } = useStyles();

  return (
    <Box className={errorBlock}>
      <Typography variant="h5" color="textSecondary">
        {message}
      </Typography>
      <Typography variant="h6" color="textSecondary">
        please try again later
      </Typography>
    </Box>
  );
};

export default SystemError;
