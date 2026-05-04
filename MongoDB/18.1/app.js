const express = require('express');
const mongoose = require('mongoose');
const app = express();

app.use(express.urlencoded({extended:true}));
app.use(express.static("public"));

mongoose.connect("mongodb://127.0.0.1:27017/music")
    .then(() => console.log("DB Connected"))
    .catch((err) => console.log(err));

const songSchema = new mongoose.Schema({
    Songname: String,
    Film: String,
    Music_director: String,
    singer: String,
    Actor: String,
    Actress: String
});

const Song = new mongoose.model("song-details", songSchema);

function generateTable(data, title="Song Details"){
    let html = `
    <html>
    <head>
        <style>
            body{
                text-align:center;
                font-family:Arial;
                margin:auto;
            }
            table{
                border-collapse: collapse;
                text-align: center;
                margin:auto;
            }
            th, td{
                border: 1px solid black;
                padding: 10px;
            }
            th{
                color:white;
                background:black;
            }
        </style>
    </head>
    <body>
    <h2>${title}</h2>
    <table>
        <tr>
            <th>Song Name</th>
            <th>Film Name</th>
            <th>Music Director</th>
            <th>Singer</th>
            <th>Actor</th>
            <th>Actress</th>
        </tr>
    `;

    data.forEach(s=>{
        html += `
            <tr>
                <td>${s.Songname}</td>
                <td>${s.Film}</td>
                <td>${s.Music_director}</td>
                <td>${s.singer}</td>
                <td>${s.Actor || ""}</td>
                <td>${s.Actress || ""}</td>
            </tr>
        `;
    });

    html += "</table> <br><a href='/'>Go Back</a></body></html>";
    return html;
}

app.get("/insert", async(req, res)=>{
    await Song.deleteMany();
    await Song.insertMany([
        { Songname: "Tum Hi Ho", Film: "Aashiqui 2", Music_director: "Mithoon", singer: "Arijit Singh" },
        { Songname: "Kesariya", Film: "Brahmastra", Music_director: "Pritam", singer: "Arijit Singh" },
        { Songname: "Malang", Film: "Malang", Music_director: "Mithoon", singer: "Ved Sharma" },
        { Songname: "Ghungroo", Film: "War", Music_director: "Vishal-Shekhar", singer: "Arijit Singh" },
        { Songname: "Bekhayali", Film: "Kabir Singh", Music_director: "Sachet", singer: "Sachet Tandon" }
    ]);
    res.send("Inserted records<br><a href='/all'>View Table</a>")
});

app.get("/all", async(req, res)=>{
    const data = await Song.find();
    const count = await Song.countDocuments();
    res.send(`Total documents: ${count} <br>` + generateTable(data));
});

app.get("/director/:name", async(req, res)=>{
    const dirname = await req.params.name;
    const data = await Song.find({Music_director : dirname});
    res.send(generateTable(data));
});

app.get("/dir-sig/:directorname/:singername", async(req, res)=>{
    const dirname = await req.params.directorname;
    const singname = await req.params.singername;
    const data = await Song.find({Music_director:dirname, singer:singname});
    res.send(generateTable(data));
});

app.get("/del/:name", async(req, res)=>{
    await Song.deleteOne({Songname : req.params.name});
    res.send("Deleted song <br> <a href='/all'>View Table</a>")
});

app.post("/add", async(req, res)=>{
    const {Songname, Film, Music_director, singer} = await req.body;
    await Song.create({Songname, Film, Music_director, singer});
    res.send("Created the song list <br> <a href='/all'>View Table</a>");
});

app.post("/update", async(req, res)=>{
    const {Songname, Actor, Actress} = req.body;
    await Song.updateOne({Songname}, {$set:{Actor, Actress}});
    res.send("Updated the song list <br> <a href='/all'>View Table</a>");
});

app.get("/sigfil/:singername/:filmname", async(req, res)=>{
    const data = await Song.find({
        singer:req.params.singername,
        Film:req.params.filmname
    });
    res.send(generateTable(data));
});

app.listen(3000, ()=>{
    console.log("Server listening at http://localhost:3000");
});