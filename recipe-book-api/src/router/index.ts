import { exampleRouter } from "./example";
import { router } from "../trpc";
import type { AnyRouter } from "@trpc/server";

const appRouter = router({
  example: exampleRouter,
});

export default appRouter;
export type AppRouter = typeof appRouter;
