import { Formik, Form } from "formik";

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
