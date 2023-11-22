import { Box } from "@material-ui/core";

import { useStore, getSentFeedbackSelector } from "../../../utils/store";
import FeedbackForm from "./FeedbackForm";
import SuccessAlert from "./SuccessAlert";

// wrap feedback form and alert, show conditionally
const FeedbackFormBlock = () => {
  // check if feedback sent in session, show alert if true, else form
  const sent = useStore(getSentFeedbackSelector);
  return <Box mt={5}>{!sent ? <FeedbackForm /> : <SuccessAlert />}</Box>;
};

export default FeedbackFormBlock;
