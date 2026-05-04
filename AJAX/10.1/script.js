// Load tasks on page load
window.onload = loadTasks;

// Get tasks from localStorage
function getTasks() {
    return JSON.parse(localStorage.getItem("tasks")) || [];
}

// Save tasks to localStorage
function saveTasks(tasks) {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Display tasks
function loadTasks() {
    let tasks = getTasks();
    let list = document.getElementById("taskList");
    list.innerHTML = "";

    tasks.forEach((task, index) => {
        list.innerHTML += `
            <li>
                ${task.name} 
                [${task.completed ? "Done" : "Pending"}]
                <button onclick="updateTask(${index})">Done</button>
                <button onclick="deleteTask(${index})">Delete</button>
            </li>
        `;
    });
}

// Add task
function addTask() {
    let input = document.getElementById("taskInput");
    let tasks = getTasks();

    tasks.push({ name: input.value, completed: false });

    saveTasks(tasks);
    input.value = "";
    loadTasks();
}

// Update task
function updateTask(index) {
    let tasks = getTasks();
    tasks[index].completed = true;

    saveTasks(tasks);
    loadTasks();
}

// Delete task
function deleteTask(index) {
    let tasks = getTasks();
    tasks.splice(index, 1);

    saveTasks(tasks);
    loadTasks();
}