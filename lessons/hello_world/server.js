const path = require('path');
const http = require('http')
const fs = require('fs');

const {isFaviconRequest} = require("./utils");


let requestsCounter = 0

const server = http.createServer((req, res) => {
    res.write(`requestsCounter: ${requestsCounter} \n`)

    // if (isFaviconRequest(req.url, req.method)) {
    //     // MIME type of your favicon.
    //     //
    //     // .ico = 'image/x-icon' or 'image/vnd.microsoft.icon'
    //     // .png = 'image/png'
    //     // .jpg = 'image/jpeg'
    //     // .jpeg = 'image/jpeg'
    //     res.setHeader('Content-Type', 'image/x-icon');
    //
    //     // Serve your favicon and finish response.
    //     //
    //     // You don't need to call `.end()` yourself because
    //     // `pipe` will do it automatically.
    //     fs.createReadStream(FAVICON_PATH).pipe(res);
    //
    //     return;
    // }

    if (!isFaviconRequest(req.url, req.method)) {
        requestsCounter++
    }

    switch (req.url) {
        case '/students':
            res.write(`Students`)
            break;
        case '/courses':
            res.write(`Courses`)
            break;
        default:
            res.write(`Not found 404`)
    }

    res.end()
})

server.listen(3003)