// Load tasks on page load
window.onload = function () {
    loadTasks();
};

// GET tasks
function loadTasks() {
    var xhr = new XMLHttpRequest();

    xhr.open("GET", "/tasks", true);

    xhr.onload = function () {
        var tasks = JSON.parse(xhr.responseText);

        var list = document.getElementById("taskList");
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
    };

    xhr.send();
}

// ADD task
function addTask() {
    var task = document.getElementById("taskInput").value;

    var xhr = new XMLHttpRequest();

    xhr.open("POST", "/tasks", true);
    xhr.setRequestHeader("Content-Type", "application/json");

    xhr.onload = function () {
        loadTasks();
    };

    xhr.send(JSON.stringify({ name: task }));
}

// UPDATE task
function updateTask(index) {
    var xhr = new XMLHttpRequest();

    xhr.open("PUT", "/tasks/" + index, true);

    xhr.onload = function () {
        loadTasks();
    };

    xhr.send();
}

// DELETE task
function deleteTask(index) {
    var xhr = new XMLHttpRequest();

    xhr.open("DELETE", "/tasks/" + index, true);

    xhr.onload = function () {
        loadTasks();
    };

    xhr.send();
}



//fetch
// Load tasks when page loads
// window.onload = loadTasks;

// // GET tasks
// function loadTasks() {
//     fetch("/tasks")
//         .then(response => response.json())
//         .then(tasks => {
//             let list = document.getElementById("taskList");
//             list.innerHTML = "";

//             tasks.forEach((task, index) => {
//                 list.innerHTML += `
//                     <li>
//                         ${task.name} 
//                         [${task.completed ? "Done" : "Pending"}]
//                         <button onclick="updateTask(${index})">Done</button>
//                         <button onclick="deleteTask(${index})">Delete</button>
//                     </li>
//                 `;
//             });
//         });
// }

// // ADD task
// function addTask() {
//     let task = document.getElementById("taskInput").value;

//     fetch("/tasks", {
//         method: "POST",
//         headers: {
//             "Content-Type": "application/json"
//         },
//         body: JSON.stringify({ name: task })
//     })
//     .then(() => loadTasks());
// }

// // UPDATE task
// function updateTask(index) {
//     fetch("/tasks/" + index, {
//         method: "PUT"
//     })
//     .then(() => loadTasks());
// }

// // DELETE task
// function deleteTask(index) {
//     fetch("/tasks/" + index, {
//         method: "DELETE"
//     })
//     .then(() => loadTasks());
// }