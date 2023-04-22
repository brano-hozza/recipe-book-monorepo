import { z } from "zod";
import { router, publicProcedure } from "../trpc";
import type { inferRouterInputs, inferRouterOutputs } from "@trpc/server";
import type { Resource } from "@prisma/client";
enum UNIT {
  G = "G",
  ML = "ML",
  PCS = "PCS",
}
const resourceSchema = z.object({
  id: z.number().optional(),
  name: z.string(),
  img: z.string().optional(),
  description: z.string().optional(),
  unit: z.enum(["G", "ML", "PCS"]),
  amount: z.number(),
});

export const resourceRouter = router({
  create: publicProcedure.input(resourceSchema).mutation(
    async ({ input, ctx }) =>
      (await ctx.prisma.resource.create({
        data: {
          name: input.name,
          description: input.description,
          img: input.img,
          unit: input.unit,
          amount: input.amount,
        },
      })) as Resource
  ),

  update: publicProcedure.input(resourceSchema).mutation(
    async ({ input, ctx }) =>
      (await ctx.prisma.resource.update({
        where: {
          id: input.id,
        },
        data: {
          name: input.name,
          description: input.description,
          img: input.img,
          unit: input.unit,
          amount: input.amount,
        },
      })) as Resource
  ),

  delete: publicProcedure.input(z.number()).mutation(
    async ({ input, ctx }) =>
      (await ctx.prisma.resource.delete({
        where: {
          id: input,
        },
      })) as Resource
  ),

  get: publicProcedure.input(z.number()).query(
    async ({ input, ctx }) =>
      (await ctx.prisma.resource.findUnique({
        where: {
          id: input,
        },
      })) as Resource
  ),

  getAll: publicProcedure.query(
    async ({ ctx }) =>
      (await ctx.prisma.resource.findMany()) as (Resource & { unit: UNIT })[]
  ),
});

export type ResourceRouter = typeof resourceRouter;
type RouterInputs = inferRouterInputs<ResourceRouter>;
type RouterOutputs = inferRouterOutputs<ResourceRouter>;

export type CreateResourceDTO = RouterInputs["create"];
export type UpdateResourceDTO = RouterInputs["update"];

export type ResourceDTO = RouterOutputs["get"];
