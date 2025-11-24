import express from "express";
const router = express.Router();

router.get("/heavyPayload", (req, res) => {
  const items = [];
  for (let i = 0; i < 50000; i++) {
    items.push({
      id: i,
      value: `Item number ${i}`,
      timestamp: Date.now(),
    });
  }

  res.json({ message: "Huge payload", items });
});

router.get("/heavyCPU", (req, res) => {
  let sum = 0;
  for (let i = 0; i < 2e8; i++) {
    sum += i;
  }
  res.json({ message: "CPU heavy task done", sum });
});

router.get("/heavyAsync", async (req, res) => {
  await new Promise((resolve) => setTimeout(resolve, 3000));
  res.json({ message: "Async heavy operation complete" });
});

router.get("/manyAsyncTasks", async (req, res) => {
  const tasks = Array.from({ length: 50000 }, (_, i) => Promise.resolve(i * 2));

  await Promise.all(tasks);
  res.json({ message: "Many tasks completed" });
});

router.get("/simulateQuery", (req, res) => {
  const data = Array.from({ length: 100000 }, (_, i) => ({
    id: i,
    name: "User " + i,
    score: Math.random(),
  }));
  const top = data
    .filter((x) => x.score > 0.95)
    .sort((a, b) => b.score - a.score);

  res.json({ top });
});

export default router;
