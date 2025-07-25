// src/app/server.ts

import express from "express";

const app = express();

app.get("/", (_req, res) => {
  res.json({ message: "Hello from TypeScript Express Server" });
});

export default app;
