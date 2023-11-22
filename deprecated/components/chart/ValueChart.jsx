import { memo } from "react";
import { Box, CircularProgress, makeStyles } from "@material-ui/core";
import { Line } from "react-chartjs-2";

import Loading from "./Loading";
import SystemError from "./SystemError";

import { useStore, valueChartSelectors as selectors } from "../../utils/store";
import { options, data } from "./chartDefaults";

// chart responds to container size when container has relative position
const useStyles = makeStyles((theme) => ({
  chartContainer: {
    height: "50vh",
    minWidth: "100%",
    position: "relative",
  },
}));

// prevent redundant rerenders when loading state changes
const LineChart = memo(({ values, change }) => (
  <Line data={data({ ...values, change })} options={options} />
));

// chart selected asset performance against index
const ValueChart = () => {
  const { chartContainer } = useStyles();

  // get data from store
  const loading = useStore(selectors.getLoading);
  const { error, message } = useStore(selectors.getSystemError);
  const values = useStore(selectors.getChartData);
  const change = useStore(selectors.getChange);

  return (
    <Box className={chartContainer}>
      {!error ? (
        <>
          <LineChart values={values} change={change} />
          <Loading loading={loading} />
        </>
      ) : (
        <SystemError message={message} />
      )}
    </Box>
  );
};

export default ValueChart;
