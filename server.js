const http = require('http');
const fs = require('fs');
const ejs = require('ejs');
const url = require('url');

const indexPage = fs.readFileSync('./public/index.ejs', 'utf8');
const styleCss = fs.readFileSync('./css/style.css', 'utf8');
const mainJs = fs.readFileSync('./js/main.js', 'utf8');

var server = http.createServer(getFromClient);

server.listen(3000);
console.log('Server Start! http://localhost:3000/');

function getFromClient(request, response) {
    var urlParts = new URL(request.url, 'http://localhost:3000');
    switch (urlParts.pathname) {

        case '/':
            var content = ejs.render(indexPage, {
                title: "ChatApp",
                content: "研",
            });
            response.writeHead(200, { 'Content-Type': 'text/html' });
            response.write(content);
            response.end();
            break;

        case '/style.css':
            response.writeHead(200, { 'Content-Type': 'text/css' });
            response.write(styleCss);
            response.end();
            break;

        case '/js/main.js':
            response.writeHead(200, { 'Content-Type': 'text/javascript' });
            response.write(mainJs);
            response.end();
            break;

        default:
            response.writeHead(200, { 'Content-Type': 'text/plain' });
            response.end();
            break; 
    }
}