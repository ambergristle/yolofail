import mail from '@sendgrid/mail';
import { z } from 'zod';

mail.setApiKey(process.env.SENDGRID_API_KEY);

export const sendEmail = async (data: { from: string; message: string; }) => {
  try {
    const { from, text } = z.object({ 
      from: z.string().email(),
      text: z.string(),
    }).parse(data);

    const [response] = await mail.send({
      from: 'feedback@yolofail.com',
      replyTo: from,
      to: 'hello@yolofail.com',
      subject: 'User Feedback',
      text: text,
    });

  } catch (error) {
    if (error instanceof ErrSenor && error.response) {

    }

    throw new Error('', { cause: error });
  }
};
