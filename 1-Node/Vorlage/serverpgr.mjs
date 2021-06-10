import http from 'http';
import fs from 'fs';

import {Zahlen} from './Zahlen.mjs';
import {FileHandle} from './File.mjs';
import querystring from "querystring";

function Ausgeben(res, content, contentType){
    res.writeHead(200, { "Content-Type": contentType });
    res.write(content);
    res.end();
}

http.createServer(function (req, res) {
    console.log("Create Server wird ausgeführt...");
    console.log("Einkommender Request = " + req.url);

    let queryObject = querystring.parse(req.url.split("?")[1])
    console.log(queryObject);

        if(req.url === '/'){
            Ausgeben(res, data, 'text/html');
        }else if(req.url === '/Test5105'){
            Ausgeben(res, 'You requested /Test5105', 'text/plain');
        }else if(req.url.indexOf("/Zahlen") === 0){
            console.log("Zahlenbereich");
            Zahlen(Number(queryObject["von"]),Number(queryObject["bis"]),res);
            //res.end();
        }else if(req.url === '/File'){
            FileHandle((x) => {
                res.write(x + "\n");
                res.end()
            });
        }





}).listen(3002);

console.log('Server gestartet http://localhost:3002/');
