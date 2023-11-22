import * as yup from "yup";

import { Box } from "@material-ui/core";

import { useStore, setSentFeedbackSelector } from "../../../utils/store";
import trySendFeedback from "../../../utils/trySendFeedback";
import FormikForm from "../formik-form/FormikForm";
import FormikField from "../formik-form/FormikField";
import FormikButton from "../formik-form/FormikButton";

// set initial form values (empty) and validation schema, error messages
const initialValues = { email: "", message: "" };

const validationSchema = yup.object({
  email: yup
    .string()
    .email("please use a valid email address")
    .required("please include your email address"),
  message: yup.string().required("please include a message"),
});

// collect user feedback (only permit once per session)
const FeedbackForm = ({ hideForm }) => {
  // get sentFeedback update function from store
  const sentFeedback = useStore(setSentFeedbackSelector);

  // attempt to send feedback, set sentFeedBack and hide form if successful
  // display error message on failure
  const sendFeedback = async (values, { setSubmitting }) => {
    const sent = await trySendFeedback(values);
    if (sent) {
      sentFeedback();
      hideForm();
    } else {
      setFieldError("message", "please try again");
    }
    setSubmitting(false);
  };

  return (
    <FormikForm
      initialValues={initialValues}
      validationSchema={validationSchema}
      handleSubmit={sendFeedback}
    >
      <FormikField
        name="email"
        type="email"
        label="email"
        placeholder="you@email.com"
      />
      <FormikField
        name="message"
        type="text"
        label="feedback"
        multiline
        rows={4}
        placeholder="i love this app!"
      />
      <Box p={1}>
        <FormikButton label="send feedback" type="submit" color="primary" />
      </Box>
    </FormikForm>
  );
};

export default FeedbackForm;
