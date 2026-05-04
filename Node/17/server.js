const http = require("http");
const fs = require("fs");

const server = http.createServer((req, res) => {

    // API to get employees
    if (req.url === "/employees") {
        fs.readFile("employees.json", "utf-8", (err, data) => {
            res.writeHead(200, { "Content-Type": "application/json" });
            res.end(data);
        });
    }

    // Serve frontend page
    else if (req.url === "/") {
        fs.readFile("index.html", (err, data) => {
            res.writeHead(200, { "Content-Type": "text/html" });
            res.end(data);
        });
    }

    else {
        res.writeHead(404);
        res.end("Not Found");
    }
});

server.listen(3000, () => {
    console.log("Server running at http://localhost:3000");
});