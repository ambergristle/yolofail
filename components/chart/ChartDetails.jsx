import { Box, Typography } from "@material-ui/core";

import { useStore, getDetailsSelector as details } from "../../utils/store";

const ChartDetails = () => {
  const { currentValue, valueDelta, percentDelta } = useStore(details);

  const change = valueDelta >= 0 ? "+" : "-";
  const valueChange = Math.abs(valueDelta.toFixed(2));
  const percentChange = Math.abs(percentDelta.toFixed(2));

  return (
    <Box>
      <Typography variant="h2">${currentValue.toFixed(2)}</Typography>
      <Typography variant="h6" display="inline">
        {`${change}$${valueChange} (${change}${percentChange}%)`}
      </Typography>
      <Typography variant="h6" color="textSecondary" display="inline">
        {" against S&P500"}
      </Typography>
    </Box>
  );
};

export default ChartDetails;
