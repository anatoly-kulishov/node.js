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

let db = {
    courses: [
        {id: 1, title: 'Front-end'},
        {id: 2, title: 'Back-end'},
        {id: 3, title: 'DevOps'},
        {id: 4, title: 'QA'}
    ]
}

app.get('/courses', (req, res) => {
    let foundCoursesQuery = db.courses;

    if (req.query.title) {
        const titleQuery = req.query.title as string
        foundCoursesQuery = foundCoursesQuery
            .filter(c => c.title.toLowerCase().includes(titleQuery.toLowerCase()))
    }

    if (!foundCoursesQuery.length) {
        res.sendStatus(HTTP_STATUSES.NOT_FOUND_404)
        return;
    }

    res.json(foundCoursesQuery)
})

app.get('/courses/:id', (req, res) => {
    const foundCourse = db.courses.find(c => c.id === Number(req.params.id))

    if (!foundCourse) {
        res.sendStatus(HTTP_STATUSES.NOT_FOUND_404)
        return;
    }

    res.json(foundCourse)
})

app.post('/courses', (req, res) => {
    const titleBodyParam = req.body?.title.trim()

    if (!titleBodyParam) {
        res.sendStatus(HTTP_STATUSES.BAD_REQUEST_400)
        return;
    }

    let createdCourse = {
        id: Number(new Date()),
        title: titleBodyParam
    };
    db.courses.push(createdCourse)
    res.status(HTTP_STATUSES.CREATED_201).send(createdCourse)
})

app.delete('/courses/:id', (req, res) => {
    const filteredCourses = db.courses.filter(c => c.id !== Number(req.params.id))

    if (db.courses.length === filteredCourses.length) {
        res.sendStatus(HTTP_STATUSES.NOT_FOUND_404)
    }

    db.courses = filteredCourses

    res.sendStatus(HTTP_STATUSES.NO_CONTENT_204)
})

app.put('/courses/:id', (req, res) => {
    const titleBodyParam = req.body?.title.trim()

    if (!titleBodyParam) {
        res.sendStatus(HTTP_STATUSES.BAD_REQUEST_400)
        return;
    }

    const foundCourse = db.courses.find(c => c.id === Number(req.params.id))

    if (!foundCourse) {
        res.sendStatus(HTTP_STATUSES.NOT_FOUND_404)
        return;
    }

    foundCourse.title = titleBodyParam

    res.sendStatus(HTTP_STATUSES.NO_CONTENT_204)
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})