const http = require('http');
const fs = require('fs');
const path = require('path');

const server = http.createServer((req, res)=>{
    let filePath = "." + (req.url === '/' ? "/index.html" : req.url);
    let contentType = "text/html";
    let ext = path.extname(filePath);
    if(ext === ".css") contentType = "text/css";
    if(ext === ".jpg") contentType = "image/jpeg";
    fs.readFile(filePath, (err, data)=>{
        if(err){
            res.writeHead(404);
            res.end("Error: Not Found!");
        }else{
            res.writeHead(200, {"Content-Type" : contentType});
            res.end(data);
        }
    });
});

server.listen(3000, ()=>{
    console.log("Server listening at http://localhost:3000");
});