import { PrismaClient } from '@prisma/client'
import express from 'express'
import dealCards from '../helpers/dealCards';

const prisma = new PrismaClient()
const app = express()

app.use(express.json())

async function testing() {
    const gamePlayerResponse = await prisma.gamePlayer.findMany({
        where: { gameId: 1 },
        include: {
            gamePlayerCard: true,
        }
    });

    console.log(gamePlayerResponse[0].gamePlayerCard);

    // dealCards(gamePlayers, cardsResponse);
}

testing();

// ... your REST API routes will go here
// app.get('/users', async (req, res) => {
//     const users = [
//         {
//             id: 1,
//             email:"example@prisma.io",
//             name:"example",
//         }
//     ];

//     res.json(users);
// })

// app.listen(3000, () =>
//     console.log('REST API server ready at: http://localhost:3000'),
// )
