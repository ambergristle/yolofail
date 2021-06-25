import mail from "@sendgrid/mail";

mail.setApiKey(process.env.SENDGRID_API_KEY);

// send feedback email via sendgrid
const feedback = async (req, res) => {
  if (!req.body) return res.status(400).end();
  const message = req.body;

  try {
    const [response] = await mail.send(message);
    return res.status(response.statusCode).end();
  } catch (error) {
    if (error.response) {
      console.error(error.response.body);
      return res.status(error.code).end();
    }
    console.error(error);
    return res.status(500).end();
  }
};

export default feedback;
