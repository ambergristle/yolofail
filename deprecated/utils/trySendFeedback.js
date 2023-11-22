import axios from "axios";

// generate message object with default, user-provided values
const newMessage = ({ email, message }) => ({
  to: "hello@yolofail.com",
  from: "feedback@yolofail.com",
  replyTo: email,
  subject: "User Feedback",
  text: message,
});

// // handle errors/error messages
// send message to api
const trySendFeedback = async (feedback) => {
  const message = newMessage(feedback);

  try {
    const response = await axios.post("/api/feedback", message);
    return response.status;
  } catch (error) {
    const status = error.response?.status;
    if (status) console.error(status);
    return false;
  }
};

export default trySendFeedback;
