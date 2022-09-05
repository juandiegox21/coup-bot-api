import { PrismaClient } from '@prisma/client'
import { NumberOfCardsPerCharacter } from "./types/coup.type";
import Croupier from './helpers/Croupier';

const prisma = new PrismaClient();

const IMMUTABLE_NUMBER_OF_CARDS_PER_CHARACTER: NumberOfCardsPerCharacter = {
    Duke: 3,
    Contessa: 3,
    Ambassador: 3,
    Assassin: 3,
    Captain: 3,
};

const MUTABLE_NUMBER_OF_CARDS_PER_CHARACTER = { ...IMMUTABLE_NUMBER_OF_CARDS_PER_CHARACTER };

assignCardsToPlayersWIP();

async function assignCardsToPlayersWIP() {
    const gamePlayers = await prisma.gamePlayer.findMany({
        where: { gameId: 1 },
        include: {
            gamePlayerCard: true,
        }
    });

    const gameId = 1;

    const cards = await prisma.card.findMany();

    const croupier = new Croupier(gameId, cards, MUTABLE_NUMBER_OF_CARDS_PER_CHARACTER);

    const updatePlayersPromises = gamePlayers.map(player => {
        const dealtCards = croupier.dealCards(player.name);

        return prisma.gamePlayer.update({
            where: {
                id: player.id
            },
            data: {
                gamePlayerCard: {
                    createMany: {
                        data: dealtCards,
                    },
                }
            },
        });
    });

    await Promise.all(updatePlayersPromises);

    const unassignedRemainingCards = croupier.unassignRemainingCards();

    await prisma.gamePlayerCard.createMany({
        data: unassignedRemainingCards
    });

    console.log("CARDS THAT WERE NOT DEALT:");
    console.log(MUTABLE_NUMBER_OF_CARDS_PER_CHARACTER);
}

export default assignCardsToPlayersWIP;
