window.onload = function(){
    loadTasks();
}

function loadTasks(){
    var xhr = new XMLHttpRequest();
    xhr.open("GET", "/tasks", true);
    xhr.onload = function(){
        var tasks = JSON.parse(xhr.responseText);
        var list = document.getElementById('TaskList');

        list.innerHTML = "";
        tasks.forEach((task, index)=>{
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

function addTask(){
    var xhr = new XMLHttpRequest();
    xhr.open("POST", "/tasks", true);
    var task = document.getElementById('taskname').value;
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.onload = function(){
        loadTasks();
    }
    xhr.send(JSON.stringify({name: task}));
}

function updateTask(index){
    var xhr = new XMLHttpRequest();
    xhr.open("PUT", "/tasks/"+index, true);
    xhr.onload = function(){
        loadTasks();
    }
    xhr.send();
}

function deleteTask(index){
    var xhr = new XMLHttpRequest();
    xhr.open("DELETE", "/tasks/"+index, true);
    xhr.onload = function(){
        loadTasks();
    }
    xhr.send();
}