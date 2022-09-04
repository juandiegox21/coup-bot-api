import { PrismaClient } from '@prisma/client'
import { cards, game, gamePlayers } from "./seeders/index";

const prisma = new PrismaClient()

const createGame = () => {
    return prisma.game.create({
        data: {
            ...game(),
            gamePlayer: {
                create: gamePlayers(6)
            },
        }
    });
};

const createCards = () => {
    const cardsCreated = cards().map(card => {
        return prisma.card.create({
            data: card,
        });
    })

    return Promise.all(cardsCreated);
};

async function main() {
    console.log(`Start seeding ...`);

    await createGame();
    console.log(`-- Game created with players --.`);

    await createCards();
    console.log(`-- Cards created --.`);

    console.log(`Seeding finished.`);
}

main()
    .then(async () => {
        await prisma.$disconnect()
    })
    .catch(async (e) => {
        console.error(e)
        await prisma.$disconnect()
        process.exit(1)
    })
