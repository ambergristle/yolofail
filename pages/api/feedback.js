import mail from "@sendgrid/mail";

mail.setApiKey(process.env.SENDGRID_API_KEY);

// send feedback email via sendgrid
const feedback = async (req, res) => {
  if (!req.body) return res.status(400).end();
  const message = req.body;

  try {
    // post message to sendgrid via client
    const [response] = await mail.send(message);

    return res.status(200).end();
  } catch (error) {
    if (error.response) {
      console.log(error.response.body);
      return res.status(error.code).end();
    }
    console.log(error);
    return res.status(500).end();
  }
};

export default feedback;

// 400 format error
