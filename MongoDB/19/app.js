const express = require("express");
const mongoose = require("mongoose");

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

// DB Connection
mongoose.connect("mongodb://127.0.0.1:27017/student")
.then(() => console.log("DB Connected"))
.catch(err => console.log(err));

// Schema
const studentSchema = new mongoose.Schema({
    Name: String,
    Roll_No: Number,
    WAD_Marks: Number,
    CC_Marks: Number,
    DSBDA_Marks: Number,
    CNS_Marks: Number,
    AI_marks: Number
});

const Student = mongoose.model("studentmarks", studentSchema);

// TABLE FUNCTION
function generateTable(data, title="Student Data") {
    let html = `
    <html><head>
    <style>
    body { text-align:center; font-family:Arial; }
    table { margin:auto; border-collapse: collapse; }
    th, td { border:1px solid black; padding:10px; }
    th { background:black; color:white; }
    </style></head><body>

    <h2>${title}</h2>
    <table>
    <tr>
    <th>Name</th><th>Roll</th><th>WAD</th><th>DSBDA</th><th>CNS</th><th>CC</th><th>AI</th>
    </tr>`;

    data.forEach(s => {
        html += `<tr>
        <td>${s.Name}</td>
        <td>${s.Roll_No}</td>
        <td>${s.WAD_Marks}</td>
        <td>${s.DSBDA_Marks}</td>
        <td>${s.CNS_Marks}</td>
        <td>${s.CC_Marks}</td>
        <td>${s.AI_marks}</td>
        </tr>`;
    });

    html += `</table><br><a href="/index.html">Go Back</a></body></html>`;
    return html;
}

// INSERT DATA
app.get("/insert", async (req, res) => {
    await Student.deleteMany();

    await Student.insertMany([
        { Name:"A", Roll_No:1, WAD_Marks:30, CC_Marks:25, DSBDA_Marks:28, CNS_Marks:26, AI_marks:29 },
        { Name:"B", Roll_No:2, WAD_Marks:20, CC_Marks:18, DSBDA_Marks:22, CNS_Marks:19, AI_marks:21 },
        { Name:"C", Roll_No:3, WAD_Marks:26, CC_Marks:27, DSBDA_Marks:29, CNS_Marks:28, AI_marks:30 },
        { Name:"D", Roll_No:4, WAD_Marks:15, CC_Marks:20, DSBDA_Marks:18, CNS_Marks:22, AI_marks:19 },
        { Name:"E", Roll_No:5, WAD_Marks:35, CC_Marks:30, DSBDA_Marks:32, CNS_Marks:31, AI_marks:33 }
    ]);

    res.send("Inserted <br><a href='/all'>View</a>");
});

// SHOW ALL + COUNT
app.get("/all", async (req, res) => {
    const data = await Student.find();
    const count = await Student.countDocuments();
    res.send(`<h3>Total: ${count}</h3>` + generateTable(data));
});

// e) DSBDA > 20
app.get("/dsbda", async (req, res) => {
    const data = await Student.find({ DSBDA_Marks: { $gt: 20 } });
    res.send(generateTable(data, "DSBDA > 20"));
});

// f) Update marks by 10
app.get("/update/:name", async (req, res) => {
    await Student.updateOne(
        { Name: req.params.name },
        { $inc: { WAD_Marks: 10 } }
    );
    res.send("Updated <br><a href='/all'>View</a>");
});

// g) >25 in all subjects
app.get("/above25", async (req, res) => {
    const data = await Student.find({
        WAD_Marks: { $gt: 25 },
        CC_Marks: { $gt: 25 },
        DSBDA_Marks: { $gt: 25 },
        CNS_Marks: { $gt: 25 },
        AI_marks: { $gt: 25 }
    });
    res.send(generateTable(data, "Above 25 in all"));
});

// h) <40 in Maths (WAD) & Science (CNS)
app.get("/less40", async (req, res) => {
    const data = await Student.find({
        WAD_Marks: { $lt: 40 },
        CNS_Marks: { $lt: 40 }
    });
    res.send(generateTable(data, "Less than 40"));
});

// i) Delete student
app.get("/delete/:name", async (req, res) => {
    await Student.deleteOne({ Name: req.params.name });
    res.send("Deleted <br><a href='/all'>View</a>");
});

app.listen(3000, () => console.log("Server running"));