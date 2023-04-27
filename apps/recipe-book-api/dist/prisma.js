"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createContext = void 0;
const client_1 = require("@prisma/client");
async function createContext(opts) {
    const prisma = new client_1.PrismaClient();
    return { prisma };
}
exports.createContext = createContext;
