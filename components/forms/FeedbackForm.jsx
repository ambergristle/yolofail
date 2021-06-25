import * as yup from "yup";

import FormikForm from "./FormikForm/FormikForm";
import FormikField from "./FormikForm/FormikField";
import FormikButton from "./FormikForm/FormikButton";

const initialValues = { email: "", message: "" };

const validationSchema = yup.object({
  email: yup.string().email().required(),
  message: yup.string().required(),
});

const handleSubmit = (values) => console.log(values);

const FeedbackForm = () => {
  return (
    <FormikForm
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      <FormikField />
      <FormikButton />
    </FormikForm>
  );
};

export default FeedbackForm;
