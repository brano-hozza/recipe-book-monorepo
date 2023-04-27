"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.resourceRouter = void 0;
const zod_1 = require("zod");
const trpc_1 = require("../trpc");
var UNIT;
(function (UNIT) {
    UNIT["G"] = "G";
    UNIT["ML"] = "ML";
    UNIT["PCS"] = "PCS";
})(UNIT || (UNIT = {}));
const resourceSchema = zod_1.z.object({
    id: zod_1.z.number().optional(),
    name: zod_1.z.string(),
    img: zod_1.z.string().optional(),
    description: zod_1.z.string().optional(),
    unit: zod_1.z.enum(["G", "ML", "PCS"]),
    amount: zod_1.z.number(),
});
exports.resourceRouter = (0, trpc_1.router)({
    create: trpc_1.publicProcedure.input(resourceSchema).mutation(async ({ input, ctx }) => (await ctx.prisma.resource.create({
        data: {
            name: input.name,
            description: input.description,
            img: input.img,
            unit: input.unit,
            amount: input.amount,
        },
    }))),
    update: trpc_1.publicProcedure.input(resourceSchema).mutation(async ({ input, ctx }) => (await ctx.prisma.resource.update({
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
    }))),
    delete: trpc_1.publicProcedure.input(zod_1.z.number()).mutation(async ({ input, ctx }) => (await ctx.prisma.resource.delete({
        where: {
            id: input,
        },
    }))),
    get: trpc_1.publicProcedure.input(zod_1.z.number()).query(async ({ input, ctx }) => (await ctx.prisma.resource.findUnique({
        where: {
            id: input,
        },
    }))),
    getAll: trpc_1.publicProcedure.query(async ({ ctx }) => (await ctx.prisma.resource.findMany())),
});
