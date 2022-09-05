import { Game, PrismaClient } from '@prisma/client'
import { Request, Response } from 'express';

const prisma = new PrismaClient({
    errorFormat: 'minimal',
});

const latestUnfinishedGameCreated = async () => {
    const game = await prisma.game.findFirst({
        where: { dateEnded: null },
    });

    return game;
};

const getActiveGames = async (req: Request, res: Response) => {
    try {
        const latestUnfinishedGame = await latestUnfinishedGameCreated();

        if (!latestUnfinishedGame) {
            return res.status(400).json({error: 'There are no games active'});
        }

        return res.send(latestUnfinishedGame);
    } catch (error) {
        console.log('error', error);
        res.status(500).json(error);
    }
};

const getGame = async (req: Request, res: Response) => {
    try {
        const gameId = parseInt(req.params.gameId);

        const game = await prisma.game.findFirstOrThrow({
            where: { id: gameId }
        });

        return res.send(game);
    } catch (error) {
        res.status(500).json(error);
    }
};

const createGame = async (req: Request, res: Response) => {
    try {
        const latestUnfinishedGame = await latestUnfinishedGameCreated();

        if(latestUnfinishedGame) {
            return res.status(422).json({error: `A game with id ${latestUnfinishedGame.id} has not been finished, please delete it before creating a new game`});
        }

        const game = await prisma.game.create({
            data: {
                dateCreated: new Date()
            }
        });

        return res.send(game);
    } catch (error) {
        console.log('error', error);
        res.status(500).json(error);
    }
};

const updateGame = async (req: Request, res: Response) => {
    const gameId: number = parseInt(req.params.gameId);
    const data: Game = req.body;

    try {
        const response = await prisma.game.update({
            where: { id: gameId },
            data
        })

        res.send(response);
    } catch (error: unknown) {
        if (error instanceof Error) {
            const message: string = error.message.trim();

            res.status(422).json({ error: message });
        }
    }
};

const deleteGame = async (req: Request, res: Response) => {
    const gameId: number = parseInt(req.params.gameId);

    try {
        await prisma.game.delete({
            where: { id: gameId }
        })

        res.send({
            success: true
        });
    } catch (error: unknown) {
        if (error instanceof Error) {
            const message: string = error.message.trim();

            res.status(422).json({ error: message });
        }
    }
};

export default {
    getActiveGames,
    getGame,
    createGame,
    updateGame,
    deleteGame,
}
