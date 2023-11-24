import { z } from "zod";

export const QueryTimeSeriesParams = z.object({
  symbol: z.string(),
  amount: z.coerce.number(),
  buyDate: z.coerce.date(),
})

export type QueryTimeSeriesParams = z.infer<typeof QueryTimeSeriesParams>;
