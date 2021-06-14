import { Box, makeStyles } from "@material-ui/core";
import { Line } from "react-chartjs-2";

import { options, data } from "./defaults";

// chart responds to container size when container has relative position
const useStyles = makeStyles((theme) => ({
  chartContainer: {
    height: "50vh",
    minWidth: "100%",
    position: "relative",
  },
}));

const PriceChart = ({ prices }) => {
  return (
    <Box>
      <Line data={data(prices)} options={options} />
    </Box>
  );
};

export default PriceChart;
