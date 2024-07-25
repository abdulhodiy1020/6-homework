const express = require("express");
const app = express();
const path = require("./users.json");
app.use(express.json());
app.get("/tasks", (req, res) => {
  res.send({
    users: path,
  });
});
app.get("/tasks/:taskId", (req, res) => {
  const taskId = req.params.taskId;
  const foundedTask = path.find((t) => t.id == taskId);
  res.send({
    users: foundedTask,
  });
});

app.post("/tasks", (req, res) => {
  const newTask = req.body;
  path.push({
    ...newTask,
    id: path.at(-1)?.id + 1,
  });

  res.send(path);
});

app.put("/tasks/:taskId", (req, res) => {
  const updatePath = req.body;
  const taskId = req.params.taskId;
  const foundedTaskIndex = path.findIndex((t) => t.id == taskId);
  path.splice(foundedTaskIndex, 1, { id: taskId, ...updatePath });
  res.send(path);
});

app.patch("/tasks/:taskId", (req, res) => {
  const updatePath = req.body;
  const taskId = req.params.taskId;
  const foundedTaskIndex = path.findIndex((t) => t.id == taskId);
  if (updatePath?.name) {
    path[foundedTaskIndex].name = updatePath.name;
  }
  res.send(path);
});

app.delete("/tasks/:taskId", (req, res) => {
  const foundedTaskIndex = path.findIndex((t) => t.id == req.params.taskId);
  if (foundedTaskIndex !== -1) {
    const newPath = path.splice(foundedTaskIndex, 1);
    res.send(newPath);
    return;
  }
  res.send(path);
});

app.listen(3000, () => {
  console.log("listening on 3000");
});
