import { handleRoute } from '@/lib/middleware';
import { sendEmail } from '@/lib/sendgrid';

export default handleRoute({
  POST: async (req, res) => {
    await sendEmail(req.body);
    
    return res.status(200).json({
      success: true,
    });
  },
});
