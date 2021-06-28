import { Grid, makeStyles } from "@material-ui/core";

// expand vertically to fill window, align contnt vertically
const useStyles = makeStyles((theme) => ({
  main: { flex: 1 },
  container: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
  },
}));

// designate gutter space for ads (/index)
const AdGrid = ({ children }) => {
  const { main, container } = useStyles();

  return (
    <Grid container component="main" className={main}>
      <Grid item xs={false} sm={2}></Grid>
      <Grid item xs={12} sm={8} className={container}>
        {children}
      </Grid>
      <Grid item xs={false} sm={2}></Grid>
    </Grid>
  );
};

export default AdGrid;
