import { z } from "zod";
import { router, publicProcedure } from "../trpc";
import type { inferRouterInputs, inferRouterOutputs } from "@trpc/server";

const recipeSchema = z.object({
  id: z.number().optional(),
  name: z.string(),
  description: z.string().optional(),
  ingredients: z.array(
    z.object({
      id: z.number(),
      amount: z.number(),
    })
  ),
  instructions: z.array(z.string()),
});

export const recipeRouter = router({
  create: publicProcedure.input(recipeSchema).mutation(
    async ({ input, ctx }) =>
      await ctx.prisma.recipe.create({
        include: { ingredients: true },
        data: {
          name: input.name,
          description: input.description,
          ingredients: {
            createMany: {
              data: input.ingredients.map((ingredient) => ({
                amount: ingredient.amount,
                resourceId: ingredient.id,
              })),
            },
          },
          instructions: input.instructions,
        },
      })
  ),

  update: publicProcedure.input(recipeSchema).mutation(
    async ({ input, ctx }) =>
      await ctx.prisma.recipe.update({
        where: {
          id: input.id,
        },
        include: { ingredients: true },
        data: {
          name: input.name,
          description: input.description,
          ingredients: {
            createMany: {
              data: input.ingredients.map((ingredient) => ({
                amount: ingredient.amount,
                resourceId: ingredient.id,
              })),
            },
          },
          instructions: input.instructions,
        },
      })
  ),

  delete: publicProcedure.input(z.number()).mutation(
    async ({ input, ctx }) =>
      await ctx.prisma.recipe.delete({
        where: {
          id: input,
        },
      })
  ),

  get: publicProcedure.input(z.number()).query(
    async ({ input, ctx }) =>
      await ctx.prisma.recipe.findUnique({
        where: {
          id: input,
        },
        include: { ingredients: true },
      })
  ),

  getAll: publicProcedure.query(
    async ({ ctx }) =>
      await ctx.prisma.recipe.findMany({
        include: { ingredients: true },
      })
  ),
});

export type RecipeRouter = typeof recipeRouter;
type RouterInputs = inferRouterInputs<RecipeRouter>;
type RouterOutputs = inferRouterOutputs<RecipeRouter>;

export type CreateRecipeDTO = RouterInputs["create"];
export type UpdateRecipeDTO = RouterInputs["update"];

export type RecipeDTO = RouterOutputs["get"];
