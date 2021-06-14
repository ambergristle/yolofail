import * as yup from "yup";
import sub from "date-fns/sub";
import { InputAdornment, makeStyles } from "@material-ui/core";

import FormikForm from "./FormikForm/FormikForm";
import FormikField from "./FormikForm/FormikField";
import FormikDate from "./FormikForm/FormikDate";
import FormikButton from "./FormikForm/FormikButton";
import FormikValues from "./FormikForm/FormikValues";

const useStyles = makeStyles((theme) => ({
  validatedInput: { marginBottom: "20px" },
}));

const initialValues = {
  symbol: "GOOG",
  amount: 100,
  date: new Date(),
};

const validationSchema = yup.object({
  symbol: yup.string().required(),
  amount: yup.number().required(),
});

const QueryForm = () => {
  return (
    <FormikForm
      initialValues={initialValues}
      validationSchema={validationSchema}
      handleSubmit={(values) => console.log(values)}
    >
      <FormikField name="symbol" type="text" placeholder="" />
      <FormikField
        name="amount"
        type="number"
        placeholder=""
        InputProps={{
          startAdornment: <InputAdornment position="start">$</InputAdornment>,
        }}
      />
      <FormikDate name="date" placeholder="" />
      <FormikButton type="submit" label="yeet" color="primary" />
      <FormikValues />
    </FormikForm>
  );
};

export default QueryForm;
