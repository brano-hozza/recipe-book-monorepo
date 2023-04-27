import express from "express";
import cors from "cors";
import * as trpcExpress from "@trpc/server/adapters/express";
import appRouter from "./router";
import dotenv from "dotenv";
import { createContext } from "./prisma";

dotenv.config();

const app = express();

app.use(express.json());
app.use(
  cors({
    origin: ["http://localhost:8080"],
  })
);

app.use(
  "/trpc",
  trpcExpress.createExpressMiddleware({
    router: appRouter,
    createContext,
  })
);

export default app;
