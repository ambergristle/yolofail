import mail from "@sendgrid/mail";

mail.setApiKey(process.env.SENDGRID_API_KEY);

// forwarding needs to be set up
const newAlert = (message) => ({
  to: "alerts@yolofail.com",
  from: "errors@yolofail.com",
  replyTo: "errors@yolofail.com",
  subject: message,
  text: " ",
});

// send error alert via SendGrid
const sendErrorAlert = async (message) => {
  const alert = newAlert(message);

  try {
    // post alert to sendgrid via client
    const [response] = await mail.send(alert);
  } catch (error) {
    if (error.response) {
      console.log(error.response.body);
    } else {
      console.log(error);
    }
  }
};

export default sendErrorAlert;
