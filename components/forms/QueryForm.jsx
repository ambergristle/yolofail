import * as yup from "yup";
import sub from "date-fns/sub";
import { Grid, InputAdornment, makeStyles } from "@material-ui/core";

import tryQuery from "../../utils/query/tryQuery";
import {
  useStore,
  toggleloadingSelector,
  getQuerySelector,
  setQuerySelector,
  setResultsSelector,
} from "../../utils/store";

import FormikForm from "./formik-form/FormikForm";
import FormikField from "./formik-form/FormikField";
import FormikDate from "./formik-form/FormikDate";
import FormikButton from "./formik-form/FormikButton";
import FormikValues from "./formik-form/FormikValues";

const useStyles = makeStyles((theme) => ({
  validatedInput: { marginBottom: "20px" },
  queryButtonBlock: { display: "flex", justifyContent: "center" },
}));

const validationSchema = yup.object({
  symbol: yup.string().required(),
  amount: yup.number().required(),
});

const QueryForm = () => {
  const { validatedInput, queryButtonBlock, queryButton } = useStyles();

  const initialValues = useStore(getQuerySelector);
  const toggleLoading = useStore(toggleloadingSelector);
  const storeQuery = useStore(setQuerySelector);
  const storeResults = useStore(setResultsSelector);

  const queryValues = async ({ symbol, amount, date }) => {
    toggleLoading();
    storeQuery({ symbol, amount, date });

    const results = await tryQuery({ symbol, amount, date });

    if (results) storeResults(results);
    toggleLoading();
  };

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
            placeholder="GOOG"
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