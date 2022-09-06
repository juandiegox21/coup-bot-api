import { GamePlayerCard, PrismaClient } from '@prisma/client'
import { Request, Response } from 'express';

const prisma = new PrismaClient({
    errorFormat: 'minimal',
});

const retrieveCardsOnGame =  async (req: Request, res: Response) => {
    try {
        const gameId: number = parseInt(req.params.gameId);

        const gamePlayerCards = await prisma.gamePlayerCard.findMany({
            where: { gameId },
            include: {
                card: true
            }
        });

        return res.send(gamePlayerCards);
    } catch (error) {
        console.log('error', error);
        res.status(500).json(error);
    }
};

const updateCard = async (req: Request, res: Response) => {
    try {
        const gameId: number = parseInt(req.params.gameId);
        const playerCardId: number = parseInt(req.params.playerCardId);

        const data: GamePlayerCard = { ...req.body, gameId};

        const cardUpdated = await prisma.gamePlayerCard.update({
            where: { id: playerCardId },
            data: data
        });

        return res.send(cardUpdated);
    } catch (error) {
        console.log('error', error);
        res.status(500).json(error);
    }
};

export default {
    retrieveCardsOnGame,
    updateCard
}
