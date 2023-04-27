"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.recipeRouter = void 0;
const zod_1 = require("zod");
const trpc_1 = require("../trpc");
const recipeSchema = zod_1.z.object({
    id: zod_1.z.number().optional(),
    name: zod_1.z.string(),
    description: zod_1.z.string().optional(),
    ingredients: zod_1.z.array(zod_1.z.object({
        id: zod_1.z.number(),
        amount: zod_1.z.number(),
    })),
    instructions: zod_1.z.array(zod_1.z.string()),
});
exports.recipeRouter = (0, trpc_1.router)({
    create: trpc_1.publicProcedure.input(recipeSchema).mutation(async ({ input, ctx }) => await ctx.prisma.recipe.create({
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
    })),
    update: trpc_1.publicProcedure.input(recipeSchema).mutation(async ({ input, ctx }) => await ctx.prisma.recipe.update({
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
    })),
    delete: trpc_1.publicProcedure.input(zod_1.z.number()).mutation(async ({ input, ctx }) => await ctx.prisma.recipe.delete({
        where: {
            id: input,
        },
    })),
    get: trpc_1.publicProcedure.input(zod_1.z.number()).query(async ({ input, ctx }) => await ctx.prisma.recipe.findUnique({
        where: {
            id: input,
        },
        include: { ingredients: true },
    })),
    getAll: trpc_1.publicProcedure.query(async ({ ctx }) => await ctx.prisma.recipe.findMany({
        include: { ingredients: true },
    })),
});
