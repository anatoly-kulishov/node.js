import express from 'express'

const app = express()
const port = 3003

const HTTP_STATUSES = {
    OK_200: 200,
    CREATED_201: 201,
    NO_CONTENT_204: 204,

    BAD_REQUEST_400: 400,
    NOT_FOUND_404: 404
}

const jsonBodyMiddleware = express.json()
app.use(jsonBodyMiddleware)

app.get('/', (req, res) => {
    res.sendStatus(404)
})


app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})