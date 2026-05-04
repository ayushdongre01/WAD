const http = require("http");
const fs = require("fs");

const server = http.createServer((req, res) => {

    // GET API
    if (req.method === "GET" && req.url === "/products") {
        fs.readFile("products.json", "utf-8", (err, data) => {
            res.writeHead(200, { "Content-Type": "application/json" });
            res.end(data);
        });
    }

    // POST API
    else if (req.method === "POST" && req.url === "/products") {

        let body = "";

        req.on("data", chunk => body += chunk);

        req.on("end", () => {

            let newProduct = JSON.parse(body);

            fs.readFile("products.json", (err, data) => {
                let products = JSON.parse(data || "[]");

                products.push(newProduct);

                fs.writeFile("products.json", JSON.stringify(products), () => {
                    res.end("Product added");
                });
            });
        });
    }

    // Serve image
    else if (req.url.endsWith(".jpg")) {
        fs.readFile(req.url.substring(1), (err, data) => {
            res.writeHead(200, { "Content-Type": "image/jpeg" });
            res.end(data);
        });
    }

    // Serve HTML
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