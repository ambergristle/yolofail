import { handleRoute } from "@/lib/something";
import { z } from "zod";

export default handleRoute({
  GET: async (req, res) => {
    const params = z.object({
      symbol: z.string(),
      amount: z.coerce.number(),
      buyDate: z.coerce.date(),
    }).parse(req.query)

    const results = queryTimeSeries(params)

    // cache or query symbol series
    // cache or query index

    return res.status(200).json({
      success: true,
      // 
    })
  }
})