// imports
import express from "express";
import cors from "cors";
import prisma from "./models/prisma.js";
import path from "path";
import { fileURLToPath } from "url";

const app = express();
const PORT = process.env.PORT || 5000;

// dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// middleware
app.use(cors());
app.use(express.json());

// API routes
app.get("/api/health", async (req, res) => {
  await prisma.$queryRaw`SELECT 1`;
  res.json({ status: "ok" });
});

app.get("/api/todos", async (req, res) => {
  const todos = await prisma.todo.findMany({
    orderBy: { created_at: "desc" },
  });
  res.json(todos);
});

app.post("/api/todos", async (req, res) => {
  const todo = await prisma.todo.create({
    data: { title: req.body.title },
  });
  res.status(201).json(todo);
});

// serve frontend LAST
app.use(express.static(path.join(__dirname, "dist")));
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "dist", "index.html"));
});

const server = app.listen(PORT, () =>
  console.log(`Running on port ${PORT}`)
);
