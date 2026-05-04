function loadUsers(){
    var xhr = new XMLHttpRequest();
    xhr.open("GET", "/users", true);
    xhr.onreadystatechange = function(){
        if(xhr.readyState === 4 && xhr.status === 200){
            var users = JSON.parse(xhr.responseText);
            var list = document.getElementById('Userlist');
            list.innerHTML = "";
            users.forEach(user=>{
                list.innerHTML += `<li>${user.name} - ${user.email} </li>`
            });
        }
    };
    xhr.send();
}


function addUser() {
    var name = document.getElementById("name").value;
    var email = document.getElementById("email").value;

    var xhr = new XMLHttpRequest();

    xhr.open("POST", "/users", true);
    xhr.setRequestHeader("Content-Type", "application/json");

    xhr.onload = function () {
        alert("User added successfully");
    };

    xhr.send(JSON.stringify({ name: name, email: email }));
}