import { handleRoute } from '@/src/lib/something';
import { sendEmail } from './sendEmail';

export default handleRoute({
  POST: async (req, res) => {
    await sendEmail(req.body);
    
    return res.status(200).json({
      success: true,
    });
  },
});
