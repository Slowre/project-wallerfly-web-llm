import { z } from "zod";
export const storeSchema = z.object({
   theme: z.enum(['light', 'dark']),
  setTheme: z.custom<((theme:'light'|'dark')=>void)>()
});
export type StoreType =z.infer<typeof storeSchema>