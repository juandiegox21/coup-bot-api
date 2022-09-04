import { PrismaClient } from '@prisma/client'
import { cards } from "./seeders/index";

const prisma = new PrismaClient()


const createCards = async () => {
    const cardsCreated = cards().map(card => {
        return prisma.card.create({
            data: card,
        });
    })

    await Promise.all(cardsCreated);

    console.log(`-- Cards created --.`);
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
