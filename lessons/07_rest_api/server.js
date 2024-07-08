const http = require('http')
const fs = require('fs')

const server = http.createServer(async (req, res) => {
    switch (req.url) {
        case '/home':
            break
        case '/about':
            break
        default:
            res.write('404 not found')
            res.end()
    }
})

server.listen(3003)