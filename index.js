const http = require('http');
const fs = require('fs');
const url = require('url');
const mime = require('mime-types');

const hostname = 'localhost';
var port = 3000;

if (process.env.PORT != null && process.env.PORT != "")
    port = process.env.PORT;

// Note: notFound.html will actually not be found!
const allowed = [
    '/js/',
    '/css/',
    '/img/',
    '/index.html'
];

const root = '/index.html';
const notFound = '/notFound.html';

const server = http.createServer(function (req, res) {
    let q = url.parse(req.url, true);
    let allow = false;

    if (q.pathname == '/' || q.pathname == '')
        q.pathname = '/index.html';

    for (dir in allowed) {
        if (q.pathname.startsWith(allowed[dir])) {
            allow = true;
            break;
        }
    }

    if (!allow) {
        console.debug(`Denied ${q.pathname}`);
        q.pathname = notFound;
    }

    serve(res, q.pathname);
});

function serve(res, path, redirectNotFound = true) {
    let file = '.' + path;
    fs.readFile(file, function (err, data) {
        if (err) {
            if (redirectNotFound) {
                serve(notFound, false);
                return;
            }
            else throw err;
        }

        let type = mime.lookup(file);
        if (!type)
            type = 'text/plain';

        let statusCode = 200;
        if (path == notFound)
            statusCode = 404;

        console.debug(`Serving ${path}...`);

        res.setHeader('Location', path);
        res.setHeader('Content-Type', type);
        res.writeHead(statusCode);
        res.write(data);
        res.end();
    });
}

server.on('error', function (err) {
    console.log("**SERVER ERROR** " + err.message);
});

server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});