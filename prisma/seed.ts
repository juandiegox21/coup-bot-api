import { PrismaClient, Prisma } from '@prisma/client'

const prisma = new PrismaClient()

const createCardName = (name: string) => ({
    name,
});

const cardData = () => {
    return [
        createCardName("Contessa"),
        createCardName("Ambassador"),
        createCardName("Assassin"),
        createCardName("Duke"),
        createCardName("Captain"),
    ]
};

const createCards = async () => {
    await prisma.card.createMany({
        data: cardData(),
    });

    console.log(`Created cards.`);
};

async function main() {
    console.log(`Start seeding ...`);

    createCards();

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
