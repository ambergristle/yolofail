import axios from "axios";

const trySendFeedback = async (feedback) => {
  try {
    const response = axios.post("/api/feedback", feedback);
    return response.status;
  } catch (error) {
    console.log(error);
  }
};

export default trySendFeedback;
