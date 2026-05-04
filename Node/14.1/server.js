const http = require('http');
const fs = require('fs');

const server = http.createServer((req, res)=>{
    if(req.method === "GET" && req.url === '/users'){
        fs.readFile('users.json', 'utf-8', (err, data)=>{
            res.writeHead(200, {'Content-Type' : "application/json"});
            res.end(data);
        });
    }
    // POST API
    else if (req.method === "POST" && req.url === "/users") {

        let body = "";

        req.on("data", chunk => {
            body += chunk;
        });

        req.on("end", () => {
            let newUser = JSON.parse(body);

            fs.readFile("users.json", "utf-8", (err, data) => {
                let users = JSON.parse(data);

                users.push(newUser);

                fs.writeFile("users.json", JSON.stringify(users), () => {
                    res.writeHead(200);
                    res.end("User added");
                });
            });
        });
    }
    else if(req.url === '/'){
        fs.readFile('index.html', (err, data)=>{
            res.writeHead(200, {"Content-Type":"text/html"});
            res.end(data);
        });
    }
    else if (req.url === '/script.js') { // Handle the script request
        fs.readFile('script.js', (err, data) => {
            res.writeHead(200, { "Content-Type": "application/javascript" });
            res.end(data);
        });
    }
    else{
        res.writeHead(404);
        res.end("Not found");
    }
});

server.listen(3000, ()=>{
    console.log("Server running at http://localhost:3000");
});