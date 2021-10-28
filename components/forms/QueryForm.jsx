import * as yup from "yup";
import sub from "date-fns/sub";
import { Grid, InputAdornment, makeStyles } from "@material-ui/core";

import * as fpix from "../../utils/fpix";
import tryQuery from "../../utils/query/tryQuery";
import { useStore, queryFormSelectors as selectors } from "../../utils/store";
import FormikForm from "./formik-form/FormikForm";
import FormikField from "./formik-form/FormikField";
import FormikDate from "./formik-form/FormikDate";
import FormikButton from "./formik-form/FormikButton";

// add margin below validated input to accomodate error message
// center submit button
const useStyles = makeStyles((theme) => ({
  validatedInput: { marginBottom: "20px" },
  queryButtonBlock: { display: "flex", justifyContent: "center" },
}));

// require symbol and amount (date always populated)
const validationSchema = yup.object({
  symbol: yup.string().required(),
  amount: yup.number().required(),
});

// collect query values and execute, updating chart if successful
const QueryForm = () => {
  const { validatedInput, queryButtonBlock, queryButton } = useStyles();

  // get data and update functions from store
  const [setSystemError, resetSystemError] = useStore(selectors.systemError);
  const initialValues = useStore(selectors.getQuery);
  const toggleLoading = useStore(selectors.toggleLoading);
  const setQuery = useStore(selectors.setQuery);
  const setResults = useStore(selectors.setResults);

  // execute query, store values, toggle loading spinner during request
  const queryValues = async ({ symbol, amount, date }, { setFieldError }) => {
    resetSystemError();
    toggleLoading();
    setQuery({ symbol, amount, date });

    try {
      // register search event
      fpix.event("Search", { search_string: symbol });

      // get results from attempted query
      const results = await tryQuery({ symbol, amount, date });

      // if successful, store results
      if (results) setResults(results);
    } catch (error) {
      const { status, message } = error.response;

      // if error < 500, user error, else system error
      if (status < 500) {
        setFieldError("symbol", message);
      } else {
        setSystemError(message);
      }
    }
    toggleLoading();
  };

  const handleSubmit = () => {};

  return (
    <FormikForm
      initialValues={initialValues}
      validationSchema={validationSchema}
      handleSubmit={queryValues}
    >
      <Grid container spacing={1}>
        <Grid item xs={12} sm={4}>
          <FormikField
            name="symbol"
            type="text"
            label="symbol"
            placeholder="GME"
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <FormikField
            name="amount"
            type="number"
            label="amount"
            placeholder="100.00"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">$</InputAdornment>
              ),
            }}
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <FormikDate name="date" label="date" />
        </Grid>
        <Grid item xs={12} className={queryButtonBlock}>
          <FormikButton
            type="submit"
            label="yeet"
            color="primary"
            width="50%"
          />
        </Grid>
      </Grid>
    </FormikForm>
  );
};

export default QueryForm;
