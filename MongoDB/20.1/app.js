const express = require('express');
const mongoose = require('mongoose');
const app = express();

app.use(express.urlencoded({extended:true}));
app.use(express.static("public"));

mongoose.connect("mongodb://127.0.0.1:27017/employee")
.then(()=> console.log("DB Connected"))
.catch((err)=> console.log(err));

const employeeSchema = new mongoose.Schema({
    Name: String,
    Department: String,
    Designation: String,
    Salary: Number,
    joiningDate : String
});

const Emp = new mongoose.model("emp_details", employeeSchema);

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
        <td>${e.Name}</td>
        <td>${e.Department}</td>
        <td>${e.Designation}</td>
        <td>${e.Salary}</td>
        <td>${e.joiningDate}</td>
        </tr>`;
    });

    html += `</table><br><a href="/index.html">Go Back</a></body></html>`;
    return html;
}

app.get("/all", async(req, res)=>{
    const data = await Emp.find();
    const count = await Emp.countDocuments();
    res.send(`Total employees: ${count}`+generateTable(data));
});

app.post("/add", async(req, res)=>{
    await Emp.create(req.body);
    res.send("Inserted <br> <a href='/all'>View Table</a>")
});

app.post("/update", async(req, res)=>{
    const {oldname, Name, Department, Designation, Salary, joiningDate} = req.body;
    await Emp.updateOne(
        {Name: oldname},
        {$set: {Name, Department, Designation, Salary, joiningDate}}
    );
    res.send("Updated <br> <a href='/all'>View Table</a>")
});

app.get("/del/:name", async(req, res)=>{
    await Emp.deleteOne({
        Name: req.params.name
    });
    res.send("Deleted <br> <a href='/all'>View Table</a>")
});

app.listen(3000, ()=>{
    console.log("Listening");
});