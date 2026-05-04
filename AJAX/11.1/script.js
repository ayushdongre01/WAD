function saveUser(users){
    localStorage.setItem("users", JSON.stringify(users));
}

function getUsers(){
    return JSON.parse(localStorage.getItem("users")) || [];
}

function validate(user){
    if(user.name === "" || user.email === "" || user.mobile === "" || user.dob === "" || user.dob === "" 
        || user.city === "" || user.add === "" || user.username === "" || user.password === ""
    ){
        return "All fields are required";
    }

    if(!user.email.includes("@")) return "Incorrect email id";
    if(user.mobile.length !== 10) return "Mobile length should be 10";
    if(user.password.length < 4) return "Password is too short";

    return "valid";
}

function register(){
    let user = {
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        mobile: document.getElementById('mobile').value,
        dob: document.getElementById('dob').value,
        city: document.getElementById('city').value,
        add: document.getElementById('add').value,
        username: document.getElementById('username').value,
        password: document.getElementById('password').value
    };

    let check = validate(user);

    if(check !== 'valid'){
        document.getElementById('msg').innerHTML = check;
        return;
    }

    var xhr = new XMLHttpRequest();
    xhr.open("POST", "/register", true);
    xhr.onload = function(){
        let users = getUsers();
        users.push(user);
        saveUser(users);
        document.getElementById('msg').innerHTML = "Registered successfully";
    }
    xhr.send(JSON.stringify(user));
}

function login(){
    let users = getUsers();
    let username = document.getElementById('username').value;
    let password = document.getElementById('password').value;
    let check = users.find(u => u.username == username && u.password === password);
    if(check){
        window.location.href = 'list.html';
    }else{
        document.getElementById('msg').innerHTML = "User not found";
    }
}

if(window.location.pathname.includes('list.html')){
    let users = getUsers();
    let list = document.getElementById('Userlist');

    users.forEach(user=>{
        list.innerHTML += `
        <li>
            ${user.name} - ${user.email}
        </li>
        `;
    });
}
