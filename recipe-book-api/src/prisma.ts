import { PrismaClient } from "@prisma/client";
import type { CreateExpressContextOptions } from "@trpc/server/adapters/express";
import type { inferAsyncReturnType } from "@trpc/server";
export async function createContext(opts?: CreateExpressContextOptions) {
  const prisma = new PrismaClient();

  return { prisma };
}

export type Context = inferAsyncReturnType<typeof createContext>;
