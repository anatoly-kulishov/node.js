import request from 'supertest'

import {app, HTTP_STATUSES} from "../../src";

describe('/courses', () => {
    beforeAll(async () => {
        await request(app).delete('/__test__/data')
    })

    it('should return 200 and empty array', async () => {
        await request(app)
            .get('/courses')
            .expect(HTTP_STATUSES.OK_200, [])
    })

    it('should return 404 for not existing course', async () => {
        await request(app)
            .get('/courses/404')
            .expect(HTTP_STATUSES.NOT_FOUND_404)
    })

    it('should create course with incorrect input data', async () => {
        await request(app)
            .post('/courses')
            .send({title: ''})
            .expect(HTTP_STATUSES.BAD_REQUEST_400)
    })

    let createdCourse: any = null;
    it('should create course with correct input data', async () => {
        const createResponse = await request(app)
            .post('/courses')
            .send({title: 'Test title'})
            .expect(HTTP_STATUSES.CREATED_201)

        createdCourse = createResponse.body

        expect(createdCourse).toEqual({
            id: expect.any(Number),
            title: 'Test title'
        })

        await request(app)
            .get('/courses')
            .expect(HTTP_STATUSES.OK_200, [createdCourse])
    })

    it('should`nt update course that not exist', async () => {
        await request(app)
            .put('/courses/' + -404)
            .send({title: 'correct title'})
            .expect(HTTP_STATUSES.NOT_FOUND_404)
    })

    it('should update course with correct input data', async () => {
        await request(app)
            .put('/courses/' + createdCourse.id)
            .send({title: 'correct title'})
            .expect(HTTP_STATUSES.NO_CONTENT_204)

        await request(app)
            .get('/courses/' + createdCourse.id)
            .expect(HTTP_STATUSES.OK_200, {
                ...createdCourse,
                title: 'correct title'
            })
    })

    it('should delete course with correct data', async () => {
        await request(app)
            .delete('/courses/' + createdCourse.id)
            .expect(HTTP_STATUSES.NO_CONTENT_204)

        await request(app)
            .get('/courses')
            .expect(HTTP_STATUSES.OK_200, [])
    })
})