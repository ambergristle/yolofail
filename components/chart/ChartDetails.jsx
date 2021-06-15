import { Box, Typography } from "@material-ui/core";

import { useStore, getDetailsSelector as details } from "../../utils/store";

const ChartDetails = () => {
  const { currentValue, valueDelta, percentDelta } = useStore(details);

  const change = valueDelta >= 0 ? "+" : "-";

  return (
    <Box display="flex" flexDirection="column">
      <Typography variant="h2">${currentValue.toFixed(2)}</Typography>
      <Box display="flex">
        <Typography variant="h6" display="inline">
          {change}${valueDelta.toFixed(2)} ({change}
          {percentDelta.toFixed(2)})
        </Typography>
        <Typography variant="h6" display="inline" color="textSecondary">
          {" against S&P500"}
        </Typography>
      </Box>
    </Box>
  );
};

export default ChartDetails;
