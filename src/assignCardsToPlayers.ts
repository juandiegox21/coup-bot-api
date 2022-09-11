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

async function assignCardsToPlayers(gameId: number) {
    const MUTABLE_NUMBER_OF_CARDS_PER_CHARACTER = { ...IMMUTABLE_NUMBER_OF_CARDS_PER_CHARACTER };

    let assignedCardsCount = 0;

    const gamePlayers = await prisma.gamePlayer.findMany({
        where: { gameId },
        include: {
            gamePlayerCard: true,
        }
    });

    const cards = await prisma.card.findMany();

    const croupier = new Croupier(gameId, cards, MUTABLE_NUMBER_OF_CARDS_PER_CHARACTER);

    const updatePlayersPromises = gamePlayers.map(player => {
        const dealtCards = croupier.dealCards(player.name);

        assignedCardsCount += dealtCards.length;

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
            include: {
                gamePlayerCard: true
            }
        });
    });

    await Promise.all(updatePlayersPromises);

    const unassignedRemainingCards = croupier.unassignRemainingCards();

    const unassigned = await prisma.gamePlayerCard.createMany({
        data: unassignedRemainingCards
    });

    return {
        remaining: MUTABLE_NUMBER_OF_CARDS_PER_CHARACTER,
        assigned: assignedCardsCount,
        unassigned: unassigned.count,
    };
}

export default assignCardsToPlayers;
