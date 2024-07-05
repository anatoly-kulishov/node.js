const http = require('http')

let requestsCounter = 0;

const server = http.createServer((req, res) => {
    requestsCounter++
    res.write(`Hello world - ${requestsCounter}`)
    res.end()
})

server.listen(3003)