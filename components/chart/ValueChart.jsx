import { Box, CircularProgress, makeStyles } from "@material-ui/core";
import { Line } from "react-chartjs-2";

import {
  useStore,
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

const ValueChart = () => {
  const { chartContainer } = useStyles();
  const values = useStore(getChartDataSelector);
  const change = useStore(getChangeSelector);

  return (
    <Box className={chartContainer}>
      <Line data={data({ ...values, change })} options={options} />
    </Box>
  );
};

export default ValueChart;
