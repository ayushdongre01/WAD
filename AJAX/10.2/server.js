const express = require('express');
const app = express();
app.use(express.json());
app.use(express.static(__dirname));

let tasks = [];

app.get("/tasks", (req, res)=>{
    res.json(tasks);
});

app.post("/tasks", (req, res)=>{
    tasks.push({name: req.body.name, completed: false});
    res.send('Task sent successfully');
});

app.put('/tasks/:id', (req, res)=>{
    let id = req.params.id;
    tasks[id].completed = true;
    res.send("Task updated");
});

app.delete('/tasks/:id', (req, res)=>{
    let id = req.params.id;
    tasks.splice(id,1);
    res.send("Task deleted");
})

app.listen(3000, ()=>{
    console.log("Serving running at http://localhost:3000");
});