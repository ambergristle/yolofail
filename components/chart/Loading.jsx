import { Box, CircularProgress, makeStyles } from "@material-ui/core";

// layer spinner over chart, display when loading only
const useStyles = makeStyles((theme) => ({
  loadingBlock: {
    position: "absolute",
    top: "0",
    left: "0",
    width: "100%",
    height: "100%",
    display: (loading) => (loading ? "flex" : "none"),
    justifyContent: "center",
    alignItems: "center",
  },
  loadingSpinner: {
    color: "rgba(0,0,0,0.25)",
  },
}));

// overlay semi-tranlucent loading spinner while value data is retrieved
const Loading = ({ loading }) => {
  const { loadingBlock, loadingSpinner } = useStyles(loading);

  return (
    <Box className={loadingBlock}>
      <CircularProgress size={175} className={loadingSpinner} />
    </Box>
  );
};

export default Loading;
