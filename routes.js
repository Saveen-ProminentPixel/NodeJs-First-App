const fs = require("fs");

const requestHandler = (req, res) => {
  const url = req.url;
  const method = req.method;
  if (url === "/") {
    res.write(`<html>
          <head><title>My First Page</title></head>
          <body><form action="/message" method="POST"><input type="text" name="message"><button type="submit">Submit</button></form></body>
          </html>`);
    return res.end();
  }

  if (url === "/message" && method === "POST") {
    const body = [];
    req.on("data", (chunk) => {
      console.log(chunk);
      body.push(chunk);
    });
    req.on("end", () => {
      const parsedBody = Buffer.concat(body).toString();
      const message = parsedBody.split("=")[1];
      fs.writeFileSync("message.txt", message);
      console.log(parsedBody);
    });

    // res.writeHead(302, { Location: "/" });
    res.statusCode = 302;
    res.setHeader("Location", "/");
    return res.end();
  }

  // console.log(req.url, req.method, req.headers);
  res.setHeader("Content-Type", "text/html");
  res.write(`<html>
        <head><title>My First Page</title></head>
        <body><h1>Welcome to nodejs server</h1></body>
        </html>`);
  //   res.end();
  // req.write();
};

module.exports = requestHandler;
