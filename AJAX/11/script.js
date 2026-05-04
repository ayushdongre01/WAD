// Get users from localStorage
function getUsers() {
    return JSON.parse(localStorage.getItem("users")) || [];
}

// Save users
function saveUsers(users) {
    localStorage.setItem("users", JSON.stringify(users));
}

// VALIDATION
function validate(user) {
    if (user.name === "" || user.email === "" || user.mobile === "" ||
        user.dob === "" || user.city === "" || user.address === "" ||
        user.username === "" || user.password === "") {
        return "All fields are required";
    }

    if (!user.email.includes("@")) return "Invalid email";

    if (user.mobile.length !== 10) return "Mobile must be 10 digits";

    if (user.password.length < 4) return "Password too short";

    return "valid";
}

// REGISTER (AJAX POST simulation)
function register() {

    let user = {
        name: document.getElementById("name").value,
        email: document.getElementById("email").value,
        mobile: document.getElementById("mobile").value,
        dob: document.getElementById("dob").value,
        city: document.getElementById("city").value,
        address: document.getElementById("address").value,
        username: document.getElementById("username").value,
        password: document.getElementById("password").value
    };

    let check = validate(user);

    if (check !== "valid") {
        document.getElementById("msg").innerHTML = check;
        return;
    }

    var xhr = new XMLHttpRequest();

    xhr.open("POST", "/register", true);

    xhr.onload = function () {
        let users = getUsers();
        users.push(user);
        saveUsers(users);

        document.getElementById("msg").innerHTML = "Registered Successfully";
    };

    xhr.send(JSON.stringify(user));
}

// LOGIN
function login() {

    let username = document.getElementById("loginUser").value;
    let password = document.getElementById("loginPass").value;

    let users = getUsers();

    let found = users.find(u => u.username === username && u.password === password);

    if (found) {
        window.location.href = "list.html";
    } else {
        document.getElementById("msg").innerHTML = "Invalid Credentials";
    }
}

// DISPLAY USERS (list.html)
if (window.location.pathname.includes("list.html")) {

    let users = getUsers();
    let list = document.getElementById("userList");

    users.forEach(user => {
        list.innerHTML += `<li>${user.name} - ${user.email}</li>`;
    });
}