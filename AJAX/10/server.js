const express = require("express");
const app = express();

app.use(express.json());
app.use(express.static(__dirname));

let tasks = [];

// GET all tasks
app.get("/tasks", (req, res) => {
    res.json(tasks);
});

// ADD task
app.post("/tasks", (req, res) => {
    tasks.push({ name: req.body.name, completed: false });
    res.send("Task added");
});

// UPDATE task
app.put("/tasks/:id", (req, res) => {
    let id = req.params.id;
    tasks[id].completed = true;
    res.send("Task updated");
});

// DELETE task
app.delete("/tasks/:id", (req, res) => {
    let id = req.params.id;
    tasks.splice(id, 1);
    res.send("Task deleted");
});

app.listen(3000, () => {
    console.log("Server running on http://localhost:3000");
});