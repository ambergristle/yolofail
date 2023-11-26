import { handleRoute } from "@/lib/middleware";
import { z } from "zod";
import { getChartData } from "./marketstack";

export default handleRoute({
  GET: async (req, res) => {
    const params = z.object({
      symbol: z.string(),
      amount: z.coerce.number(),
      buyDate: z.string(),
    }).parse(req.query)

    const data = getChartData(params)

    return res.status(200).json({
      success: true,
      data,
    })
  }
})