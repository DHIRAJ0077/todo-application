import express from "express";
import cors from "cors";
import pool from "./models/db.js";

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Todo Backend is running ✅ Try /api/health");
});

app.get("/api/health", async (req, res) => {
  try {
    await pool.query("SELECT 1");
    res.json({ status: "ok", db: "connected" });
  } catch (err) {
    console.error("Health DB error:", err);
    res.status(500).json({ status: "fail", error: err.message });
  }
});

app.get("/api/todos", async (req, res) => {
  try {
    const { rows } = await pool.query(
      "SELECT * FROM todos ORDER BY created_at DESC"
    );
    res.json(rows);
  } catch (err) {
    console.error("GET /api/todos error:", err);
    res.status(500).json({ error: err.message });
  }
});

app.post("/api/todos", async (req, res) => {
  try {
    const { title } = req.body;

    const { rows } = await pool.query(
      "INSERT INTO todos (title) VALUES ($1) RETURNING *",
      [title]
    );

    res.status(201).json(rows[0]);
  } catch (err) {
    console.error("POST /api/todos error:", err);
    res.status(500).json({ error: err.message });
  }
});

app.put("/api/todos/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { completed } = req.body;

    const { rows } = await pool.query(
      "UPDATE todos SET completed=$1 WHERE id=$2 RETURNING *",
      [completed, id]
    );

    res.json(rows[0]);
  } catch (err) {
    console.error("PUT /api/todos error:", err);
    res.status(500).json({ error: err.message });
  }
});

app.delete("/api/todos/:id", async (req, res) => {
  try {
    await pool.query("DELETE FROM todos WHERE id=$1", [req.params.id]);
    res.status(204).send();
  } catch (err) {
    console.error("DELETE /api/todos error:", err);
    res.status(500).json({ error: err.message });
  }
});

app.listen(PORT, () => console.log(`Running on port ${PORT}`));
