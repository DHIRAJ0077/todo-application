import express from "express";
import cors from "cors";
import prisma from "./models/prisma.js";

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Todo Backend is running ✅ Try /api/health");
});

app.get("/api/health", async (req, res) => {
  try {
    await prisma.$queryRaw`SELECT 1`;
    res.json({ status: "ok", db: "connected" });
  } catch (err) {
    console.error("Health DB error:", err);
    res.status(500).json({ status: "fail", error: err.message });
  }
});

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

app.put("/api/todos/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { completed } = req.body;

    const todo = await prisma.todo.update({
      where: { id: parseInt(id) },
      data: { completed },
    });

    res.json(todo);
  } catch (err) {
    console.error("PUT /api/todos error:", err);
    res.status(500).json({ error: err.message });
  }
});

app.delete("/api/todos/:id", async (req, res) => {
  try {
    await prisma.todo.delete({
      where: { id: parseInt(req.params.id) },
    });
    res.status(204).send();
  } catch (err) {
    console.error("DELETE /api/todos error:", err);
    res.status(500).json({ error: err.message });
  }
});

const server = app.listen(PORT, () => console.log(`Running on port ${PORT}`));

// Graceful shutdown
process.on("SIGINT", async () => {
  console.log("\nShutting down gracefully...");
  await prisma.$disconnect();
  server.close(() => {
    console.log("Server closed");
    process.exit(0);
  });
});

process.on("SIGTERM", async () => {
  console.log("\nShutting down gracefully...");
  await prisma.$disconnect();
  server.close(() => {
    console.log("Server closed");
    process.exit(0);
  });
});
