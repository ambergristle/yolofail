const Details = ({ change, value, percent }) => {
  value = value.toFixed(2);
  percent = perce.toFixed(2);
  return (
    <Box>
      <Typography variant="h2">
        ${props.details.currentValue.toFixed(2)}
      </Typography>
      <Box>
        <Typography variant="h6" display="inline">
          {`${change}$${value} (${change}${percent}%)`}
        </Typography>
        <Typography variant="h6" display="inline" color="textSecondary">
          {" against S&P500"}
        </Typography>
      </Box>
    </Box>
  );
};
