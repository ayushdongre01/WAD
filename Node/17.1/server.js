const http = require('http');
const fs = require('fs');

const server = http.createServer((req, res)=>{
    if(req.url === '/employees'){
        fs.readFile('employees.json', 'utf-8', (err, data)=>{
            res.writeHead(200, {"Content-Type": "application/json"});
            res.end(data);
        });
    }
    else if(req.url === '/'){
        fs.readFile('index.html', (err, data)=>{
            res.writeHead(200, {"Content-Type": "text/html"});
            res.end(data);
        });
    }
    else if(req.url.endsWith(".jpg")){
        fs.readFile(req.url.substring(1), (err, data)=>{
            res.writeHead(200, {"Content-Type": "image/jpeg"});
            res.end(data);
        });
    }
    else{
        res.writeHead(404);
        res.end("Not Found.");
    }
});

server.listen(3000, ()=>{
    console.log("Server listening at http://localhost:3000");
});