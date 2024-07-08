const http = require('http')
const fs = require('fs')

const delay = (ms) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve()
        }, ms)
    })
}

const readFile = (path) => {
    return new Promise((resolve, reject) => {
        fs.readFile(path, (err, data) => {
            if (err) return reject(err)
            else resolve(data)
        })
    })
}

const server = http.createServer(async (req, res) => {
    switch (req.url) {
        case '/home':
            try {
                const data = await readFile('./ind3ex.html')
                res.write(data)
                res.end()
            } catch (err) {
                await res.write(`${err}`)
                res.end()
            }
            break
        case '/about':
            await delay(1500)
            res.write('About Page')
            res.end()
            break
        default:
            res.write('404 not found')
            res.end()
    }
})

server.listen(3003)