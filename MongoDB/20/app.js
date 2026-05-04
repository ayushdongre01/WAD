const express = require("express");
const mongoose = require("mongoose");

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

// DB connection
mongoose.connect("mongodb://127.0.0.1:27017/company")
.then(() => console.log("DB Connected"))
.catch(err => console.log(err));

// Schema
const empSchema = new mongoose.Schema({
    name: String,
    department: String,
    designation: String,
    salary: Number,
    joiningDate: String
});

const Employee = mongoose.model("employees", empSchema);

// 🔹 TABLE VIEW
function generateTable(data) {
    let html = `
    <html><head>
    <style>
        body { text-align:center; font-family:Arial; }
        table { margin:auto; border-collapse: collapse; }
        th, td { padding:10px; border:1px solid black; }
        th { background:black; color:white; }
    </style>
    </head><body>

    <h2>Employee Records</h2>
    <table>
    <tr>
        <th>Name</th>
        <th>Department</th>
        <th>Designation</th>
        <th>Salary</th>
        <th>Joining Date</th>
    </tr>`;

    data.forEach(e => {
        html += `<tr>
        <td>${e.name}</td>
        <td>${e.department}</td>
        <td>${e.designation}</td>
        <td>${e.salary}</td>
        <td>${e.joiningDate}</td>
        </tr>`;
    });

    html += `</table><br><a href="/index.html">Go Back</a></body></html>`;
    return html;
}

// 🔹 ADD EMPLOYEE
app.post("/add", async (req, res) => {
    await Employee.create(req.body);
    res.send("Employee Added ✅ <br><a href='/all'>View All</a>");
});

// 🔹 VIEW ALL
app.get("/all", async (req, res) => {
    const data = await Employee.find();
    res.send(generateTable(data));
});

// 🔹 UPDATE EMPLOYEE (by name)
app.post("/update", async (req, res) => {
    const { oldName, name, department, designation, salary, joiningDate } = req.body;

    await Employee.updateOne(
        { name: oldName.trim() },   // 🔍 find old record
        {
            $set: {
                name,
                department,
                designation,
                salary,
                joiningDate
            }
        }
    );

    res.send("Updated Successfully ✅ <br><a href='/all'>View</a>");
});
// 🔹 DELETE EMPLOYEE
app.get("/delete/:name", async (req, res) => {
    await Employee.deleteOne({ name: req.params.name });
    res.send("Deleted ✅ <br><a href='/all'>View</a>");
});

// SERVER
app.listen(3000, () => console.log("Server running on port 3000"));