import express from 'express'

const app = express()
const port = 3003

type UserType = {
    id: number,
    name: string
}

const USERS: UserType[] = [
    {
        id: 1,
        name: 'Kulishov Anatoly'
    },
    {
        id: 2,
        name: 'Kulishov Sergey'
    },
    {
        id: 3,
        name: 'Shabanov Pavel'
    },
]

app.get('/', (req: any, res: any) => {
    let reqUsers: UserType[] = USERS

    if (req.query.hasOwnProperty('term')) {
        reqUsers = USERS.filter((user: UserType) => user.name.toLowerCase().includes(req.query.term.toLowerCase()))
    }

    res.send(reqUsers)
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})