import axios from "axios";

const newMessage = ({ from, message }) => ({
  to: "hello@yolofail.com",
  from: "feedback@yolofail.com",
  replyTo: from,
  subject: "User Feedback",
  text: message,
});

const trySendFeedback = async (feedback) => {
  const message = newMessage(feedback);

  try {
    const response = await axios.post("/api/feedback", message);
    return response.status;
  } catch (error) {
    console.log(error);
  }
};

export default trySendFeedback;
