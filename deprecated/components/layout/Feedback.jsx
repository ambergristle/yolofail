import { useState } from "react";
import { Dialog, DialogContent } from "@material-ui/core";
import FeedbackForm from "../forms/feedback/FeedbackForm";

// show feedback form as popup; hide on clickaway
const Feedback = ({ show, handleHide }) => (
  <Dialog open={show} onClose={handleHide} fullWidth maxWidth="sm">
    <DialogContent>
      <FeedbackForm hideForm={handleHide} />
    </DialogContent>
  </Dialog>
);

export default Feedback;
