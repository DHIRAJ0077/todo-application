// imports
import express from "express";
import cors from "cors";
import prisma from "./models/prisma.js";
import path from "path";
import { fileURLToPath } from "url";

const app = express();
const PORT = process.env.PORT || 5000;

// dirname (ESM fix)
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// middleware
app.use(cors());
app.use(express.json());

/* =========================
   API ROUTES (FIRST)
========================= */

// health check
app.get("/api/health", async (req, res) => {
  try {
    await prisma.$queryRaw`SELECT 1`;
    res.json({ status: "ok", db: "connected" });
  } catch (err) {
    res.status(500).json({ status: "fail", error: err.message });
  }
});

// get all todos
app.get("/api/todos", async (req, res) => {
  try {
    const todos = await prisma.todo.findMany({
      orderBy: { created_at: "desc" },
    });
    res.json(todos);
  } catch (err) {
    console.error("GET /api/todos error:", err);
    res.status(500).json({ error: err.message });
  }
});

// create todo
app.post("/api/todos", async (req, res) => {
  try {
    const { title } = req.body;

    const todo = await prisma.todo.create({
      data: { title },
    });

    res.status(201).json(todo);
  } catch (err) {
    console.error("POST /api/todos error:", err);
    res.status(500).json({ error: err.message });
  }
});

// update todo (toggle completed)
app.put("/api/todos/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { completed } = req.body;

    const todo = await prisma.todo.update({
      where: { id: Number(id) },
      data: { completed },
    });

    res.json(todo);
  } catch (err) {
    console.error("PUT /api/todos error:", err);
    res.status(500).json({ error: err.message });
  }
});

// delete todo
app.delete("/api/todos/:id", async (req, res) => {
  try {
    const { id } = req.params;

    await prisma.todo.delete({
      where: { id: Number(id) },
    });

    res.status(204).send();
  } catch (err) {
    console.error("DELETE /api/todos error:", err);
    res.status(500).json({ error: err.message });
  }
});



// serve frontend build
app.use(express.static(path.join(__dirname, "dist")));

// SPA fallback
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "dist", "index.html"));
});

// start server
const server = app.listen(PORT, () =>
  console.log(`🚀 Running on port ${PORT}`)
);

// graceful shutdown
process.on("SIGINT", async () => {
  console.log("\nShutting down gracefully...");
  await prisma.$disconnect();
  server.close(() => {
    console.log("Server closed");
    process.exit(0);
  });
});
