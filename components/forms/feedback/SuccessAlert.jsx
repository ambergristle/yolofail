import { Box, Paper, Typography, makeStyles } from "@material-ui/core";
import CheckCircleOutlineIcon from "@material-ui/icons/CheckCircleOutline";

const useStyles = makeStyles((theme) => ({
  successAlert: {
    margin: "8px 0px 4px 0px",
    padding: "5px 10px",
    display: "flex",
    alignItems: "center",
    color: "rgba(0, 200, 5, 1)",
    backgroundColor: "transparent",
    borderColor: "rgba(0, 200, 5, 1)",
  },
  checkIcon: { paddingRight: "5px" },
}));

const SuccessAlert = () => {
  const { successAlert, checkIcon } = useStyles();

  return (
    <Paper variant="outlined" className={successAlert}>
      <CheckCircleOutlineIcon className={checkIcon} />
      <Typography>We look forward to hearing your thoughts!</Typography>
    </Paper>
  );
};

export default SuccessAlert;
