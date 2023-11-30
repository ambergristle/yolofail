import mail, { ResponseError } from '@sendgrid/mail';
import { z } from 'zod';
import { parserFactory } from './utils';

const ZSendEmailParams = z.object({ 
  from: z.string().email(),
  text: z.string(),
});

const parseSendEmailParams = parserFactory(ZSendEmailParams);

type SendEmailParams = z.infer<typeof ZSendEmailParams>;

const SENDGRID_API_KEY = process.env.SENDGRID_API_KEY;
if (!SENDGRID_API_KEY) throw new Error('Environment Error: SendGrid key is required');

mail.setApiKey(SENDGRID_API_KEY);

export const sendEmail = async (data: SendEmailParams) => {
  try {
    const { from, text } = parseSendEmailParams(data);

    await mail.send({
      from: 'feedback@yolofail.com',
      replyTo: from,
      to: 'hello@yolofail.com',
      subject: 'User Feedback',
      text: text,
    });

  } catch (error) {

    if (error instanceof ResponseError) {
      throw new Error('', { cause: error });
    }

    throw new Error('', { cause: error });
  }
};
