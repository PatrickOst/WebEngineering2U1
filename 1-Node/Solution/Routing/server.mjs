import http from 'http';
import fs from 'fs';
import querystring from 'querystring'


import { handleNumbers } from './number.mjs'
import { handleFile } from './file.mjs'


function sendFile(res, fileName, contentType) {
    fs.readFile(fileName, function (err, data) {
        if (err) {
            throw err;
        }
        res.writeHeader(200, { "Content-Type": contentType });
        res.write(data);
        res.end();
    });
}

http.createServer(function (req, res) {
    if (req.url.indexOf("/numbers") === 0) {
        let queryObject = querystring.parse(req.url.split("?")[1])
        res.writeHead(200, { 'Content-Type': 'text/plain' });
        handleNumbers(Number(queryObject["min"]), Number(queryObject["max"]), (x) => res.write(x + "\n"));
        res.end();
    }
    else if (req.url === "/file") {
        handleFile((x) => {
            res.write(x + "\n");
            res.end()
        });
    }
    else if (req.url === "/to-send-html.html") {
        sendFile(res, "to-send-html.html", "text/html");
    }
    else if (req.url === "/to-send-js.js") {
        sendFile(res, "to-send-js.js", "text/javascript");
    }
    else {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('You requested ' + req.url);
    }
}).listen(3001);

console.log('Server running at http://localhost:3002/');
