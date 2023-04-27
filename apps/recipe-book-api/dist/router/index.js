"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const resource_1 = require("./resource");
const trpc_1 = require("../trpc");
const recipe_1 = require("./recipe");
const appRouter = (0, trpc_1.router)({
    resource: resource_1.resourceRouter,
    recipe: recipe_1.recipeRouter,
});
exports.default = appRouter;
