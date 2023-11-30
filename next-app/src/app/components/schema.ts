
import { z } from 'zod';

export const ZQueryFormValues = z.object({
  symbol: z.string(),
  amount: z.number().min(1), // max?
  buyDate: z.date(),
});

export type QueryFormValues = z.infer<typeof ZQueryFormValues>;
