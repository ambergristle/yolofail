import { memo } from "react";
import { Box, CircularProgress, makeStyles } from "@material-ui/core";
import { Line } from "react-chartjs-2";

import Loading from "./Loading";

import {
  useStore,
  getloadingSelector,
  getChartDataSelector,
  getChangeSelector,
} from "../../utils/store";
import { options, data } from "./defaults";

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

const ValueChart = () => {
  const { chartContainer } = useStyles();

  const loading = useStore(getloadingSelector);
  const values = useStore(getChartDataSelector);
  const change = useStore(getChangeSelector);

  return (
    <Box className={chartContainer}>
      <LineChart values={values} change={change} />
      <Loading loading={loading} />
    </Box>
  );
};

export default ValueChart;
