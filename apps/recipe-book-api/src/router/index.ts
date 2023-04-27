import { resourceRouter } from "./resource";

import { router } from "../trpc";
import { recipeRouter } from "./recipe";

const appRouter = router({
  resource: resourceRouter,
  recipe: recipeRouter,
});

export default appRouter;
export type AppRouter = typeof appRouter;
