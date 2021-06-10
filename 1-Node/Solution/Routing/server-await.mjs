import http from 'http';
import fs from 'fs/promises';

import { handleNumbers } from './number.mjs'
import querystring from "querystring";


async function handleFile(res) {
    await fs.writeFile('datum.txt', new Date().toLocaleString());
    const content = await fs.readFile('datum.txt');
    await fs.unlink('datum.txt');
    res.end(content);
}

async function sendFile(res, fileName, contentType) {
    const data = await fs.readFile(fileName);
    res.writeHeader(200, {"Content-Type": contentType});
    res.write(data);
    res.end();
}

http.createServer(async function (req, res) {
    if (req.url.indexOf("/numbers") === 0) {
        let queryObject = querystring.parse(req.url.split("?")[1])
        res.writeHead(200, { 'Content-Type': 'text/plain' });
        handleNumbers(Number(queryObject["min"]), Number(queryObject["max"]), (x) => res.write(x + "\n"));
        res.end();
    }
    else if (req.url === "/file") {
        await handleFile(res);
    }
    else if (req.url === "/to-send-html.html") {
        await sendFile(res, "to-send-html.html", "text/html");
    }
    else if (req.url === "/to-send-js.js") {
        await sendFile(res, "to-send-js.js", "text/javascript");
    }
    else {
        res.writeHead(404, {'Content-Type': 'text/plain'});
        res.end('You requested ' + req.url);
    }
}).listen(3002);

console.log('Server running at http://localhost:3002/');
