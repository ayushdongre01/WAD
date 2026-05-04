const express = require("express");
const mongoose = require("mongoose");

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

// DB Connection
mongoose.connect("mongodb://127.0.0.1:27017/bookstore")
.then(() => console.log("DB Connected"))
.catch(err => console.log(err));

// Schema
const bookSchema = new mongoose.Schema({
    title: String,
    author: String,
    price: Number,
    genre: String
});

const Book = mongoose.model("books", bookSchema);

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

    <h2>Book List</h2>
    <table>
    <tr>
        <th>Title</th>
        <th>Author</th>
        <th>Price</th>
        <th>Genre</th>
    </tr>`;

    data.forEach(b => {
        html += `<tr>
        <td>${b.title}</td>
        <td>${b.author}</td>
        <td>${b.price}</td>
        <td>${b.genre}</td>
        </tr>`;
    });

    html += `</table><br><a href="/index.html">Go Back</a></body></html>`;
    return html;
}

// ✅ ADD BOOK
app.post("/add", async (req, res) => {
    await Book.create(req.body);
    res.send("Book Added ✅ <br><a href='/all'>View All</a>");
});

// ✅ VIEW ALL BOOKS
app.get("/all", async (req, res) => {
    const data = await Book.find();
    res.send(generateTable(data));
});

// ✅ UPDATE BOOK (using old title)
app.post("/update", async (req, res) => {
    const { oldTitle, title, author, price, genre } = req.body;

    await Book.updateOne(
        { title: oldTitle.trim() },
        { $set: { title, author, price, genre } }
    );

    res.send("Updated ✅ <br><a href='/all'>View</a>");
});

// ✅ DELETE BOOK
app.get("/delete/:title", async (req, res) => {
    await Book.deleteOne({ title: req.params.title });
    res.send("Deleted ✅ <br><a href='/all'>View</a>");
});

// SERVER
app.listen(3000, () => console.log("Server running on port 3000"));