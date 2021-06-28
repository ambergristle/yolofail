import { Formik, Form } from "formik";

// wrap fields in formik Form
// set submitting to true, execute passed handleSubmit function, on submit
const FormikForm = ({
  initialValues,
  validationSchema,
  handleSubmit,
  children,
}) => {
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      validateOnChange
      onSubmit={async (values, actions) => {
        actions.setSubmitting(true);
        handleSubmit(values, actions);
      }}
    >
      <Form>{children}</Form>
    </Formik>
  );
};

export default FormikForm;
