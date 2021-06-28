import { Box, Typography } from "@material-ui/core";

import {
  useStore,
  chartDetailsSelectors as selectors,
} from "../../utils/store";

// display current value (not price) of 'held' asset
// $ and % change in value against index (ivv)
const ChartDetails = () => {
  // get data from store and formats
  // const { error, message } = useStore(selectors.getSystemError);
  const { currentValue, valueDelta, percentDelta } = useStore(
    selectors.getDetails
  );

  const current = currentValue.toFixed(2);
  const change = valueDelta >= 0 ? "+" : "-";
  const valueChange = Math.abs(valueDelta.toFixed(2));
  const percentChange = Math.abs(percentDelta.toFixed(2));

  return (
    <Box>
      <Typography variant="h2">${current}</Typography>
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
