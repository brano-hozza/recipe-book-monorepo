import { initTRPC } from "@trpc/server";
import type { Context } from "./prisma";

const t = initTRPC.context<Context>().create();
export const router = t.router;
export const publicProcedure = t.procedure;
export const middleware = t.middleware;
