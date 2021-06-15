import * as yup from "yup";
import sub from "date-fns/sub";
import { Grid, InputAdornment, makeStyles } from "@material-ui/core";

import tryQuery from "../../utils/tryQuery";
import {
  useStore,
  getQuerySelector,
  setQuerySelector,
  setResultsSelector,
} from "../../utils/store";

import FormikForm from "./FormikForm/FormikForm";
import FormikField from "./FormikForm/FormikField";
import FormikDate from "./FormikForm/FormikDate";
import FormikButton from "./FormikForm/FormikButton";
import FormikValues from "./FormikForm/FormikValues";

const useStyles = makeStyles((theme) => ({
  validatedInput: { marginBottom: "20px" },
  queryButtonBlock: { display: "flex", justifyContent: "center" },
}));

const validationSchema = yup.object({
  symbol: yup.string().required(),
  amount: yup.number().required(),
});

const QueryForm = () => {
  const { validatedInput, queryButtonBlock } = useStyles();

  const initialValues = useStore(getQuerySelector);
  const storeQuery = useStore(setQuerySelector);
  const storeResults = useStore(setResultsSelector);

  const queryValues = async ({ symbol, amount, date }) => {
    storeQuery({ symbol, amount, date });

    const results = await tryQuery({ symbol, amount, date });

    console.log("results", results);

    if (results) storeResults(results);
  };

  return (
    <FormikForm
      initialValues={initialValues}
      validationSchema={validationSchema}
      handleSubmit={queryValues}
    >
      <Grid container spacing={1}>
        <Grid item xs={12} sm={4}>
          <FormikField name="symbol" type="text" placeholder="" />
        </Grid>
        <Grid item xs={12} sm={4}>
          <FormikField
            name="amount"
            type="number"
            placeholder=""
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">$</InputAdornment>
              ),
            }}
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <FormikDate name="date" placeholder="" />
        </Grid>
        <Grid item xs={12} className={queryButtonBlock}>
          <FormikButton type="submit" label="yeet" color="primary" />
        </Grid>
      </Grid>
    </FormikForm>
  );
};

export default QueryForm;
