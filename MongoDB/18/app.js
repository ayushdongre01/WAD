const express = require("express");
const mongoose = require("mongoose");

const app = express();

// Middleware to read form data
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

// DB Connection
mongoose.connect("mongodb://127.0.0.1:27017/music")
.then(() => console.log("DB Connected"))
.catch(err => console.log(err));

// Schema
const songSchema = new mongoose.Schema({
    Songname: String,
    Film: String,
    Music_director: String,
    singer: String,
    Actor: String,
    Actress: String
});

const Song = mongoose.model("song_details", songSchema);

// 🔥 Table Generator
function generateTable(data, title = "Songs List") {
    let html = `
    <html>
    <head>
    <style>
        body { text-align: center; font-family: Arial; }
        table { margin: auto; border-collapse: collapse; }
        th, td { padding: 10px; border: 1px solid black; }
        th { background: black; color: white; }
    </style>
    </head>
    <body>
    <h2>${title}</h2>
    <table>
    <tr>
        <th>Song</th>
        <th>Film</th>
        <th>Director</th>
        <th>Singer</th>
        <th>Actor</th>
        <th>Actress</th>
    </tr>`;

    data.forEach(s => {
        html += `<tr>
        <td>${s.Songname}</td>
        <td>${s.Film}</td>
        <td>${s.Music_director}</td>
        <td>${s.singer}</td>
        <td>${s.Actor || ""}</td>
        <td>${s.Actress || ""}</td>
        </tr>`;
    });

    html += `</table><br><a href="/index.html">Go Back</a></body></html>`;
    return html;
}

// INSERT
app.get("/insert", async (req, res) => {
    await Song.deleteMany();
    await Song.insertMany([
        { Songname: "Tum Hi Ho", Film: "Aashiqui 2", Music_director: "Mithoon", singer: "Arijit Singh" },
        { Songname: "Kesariya", Film: "Brahmastra", Music_director: "Pritam", singer: "Arijit Singh" },
        { Songname: "Malang", Film: "Malang", Music_director: "Mithoon", singer: "Ved Sharma" },
        { Songname: "Ghungroo", Film: "War", Music_director: "Vishal-Shekhar", singer: "Arijit Singh" },
        { Songname: "Bekhayali", Film: "Kabir Singh", Music_director: "Sachet", singer: "Sachet Tandon" }
    ]);

    res.send("Inserted 5 Songs <br><a href='/all'>View Table</a>");
});

// SHOW ALL
app.get("/all", async (req, res) => {
    const data = await Song.find();
    const count = await Song.countDocuments();
    res.send(`<h3>Total Songs: ${count}</h3>` + generateTable(data));
});

// ADD SONG (FROM USER INPUT)
app.post("/add", async (req, res) => {
    const { Songname, Film, Music_director, singer } = req.body;

    await Song.create({ Songname, Film, Music_director, singer });

    res.send("Song Added ✅ <br><a href='/all'>View Table</a>");
});

// UPDATE ACTOR + ACTRESS (FROM USER INPUT)
app.post("/update", async (req, res) => {
    const { Songname, Actor, Actress } = req.body;

    await Song.updateOne(
        { Songname },
        { $set: { Actor, Actress } }
    );

    res.send("Updated ✅ <br><a href='/all'>View Table</a>");
});

// OTHER ROUTES SAME
app.get("/director/:name", async (req, res) => {
    const data = await Song.find({ Music_director: req.params.name });
    res.send(generateTable(data));
});

app.get("/director-singer/:director/:singer", async (req, res) => {
    const data = await Song.find({
        Music_director: req.params.director,
        singer: req.params.singer
    });
    res.send(generateTable(data));
});

app.get("/delete/:name", async (req, res) => {
    await Song.deleteOne({ Songname: req.params.name });
    res.send("Deleted <br><a href='/all'>View Table</a>");
});

app.get("/filter/:singer/:film", async (req, res) => {
    const data = await Song.find({
        singer: req.params.singer,
        Film: req.params.film
    });
    res.send(generateTable(data));
});

// SERVER
app.listen(3000, () => console.log("Server running on port 3000"));