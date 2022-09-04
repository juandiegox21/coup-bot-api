import { PrismaClient } from '@prisma/client'
import express from 'express'

const prisma = new PrismaClient()
const app = express()

app.use(express.json())

// ... your REST API routes will go here
app.get('/users', async (req, res) => {
    const users = [
        {
            id: 1,
            email:"example@prisma.io",
            name:"example",
        }
    ];

    res.json(users);
})

app.listen(3000, () =>
    console.log('REST API server ready at: http://localhost:3000'),
)
