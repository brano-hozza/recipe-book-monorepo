import { z } from "zod";
import { router, publicProcedure } from "../trpc";

export const exampleRouter = router({
  exampleWithArgs: publicProcedure
    .input(
      z.object({
        message: z.string(),
      })
    )
    .mutation((req) => {
      return { info: req.input.message };
    }),

  example: publicProcedure.query(async ({ ctx }) => {
    return { info: 42 };
  }),
});
