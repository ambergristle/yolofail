import { useStore, getSentFeedbackSelector } from "../../../utils/store";

import { Box } from "@material-ui/core";

import FeedbackForm from "./FeedbackForm";
import SuccessAlert from "./SuccessAlert";

const FeedbackFormBlock = () => {
  const sent = useStore(getSentFeedbackSelector);
  return <Box mt={5}>{!sent ? <FeedbackForm /> : <SuccessAlert />}</Box>;
};

export default FeedbackFormBlock;
