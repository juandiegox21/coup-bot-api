import { GamePlayer, PrismaClient } from '@prisma/client'
import { Request, Response } from 'express';

const prisma = new PrismaClient({
    errorFormat: 'minimal',
});

const playerExistsInGame = async (gameId: number, discordId: string) => {
    const gamePlayer = await prisma.gamePlayer.count({
        where: { gameId, discordId }
    });

    return gamePlayer > 0;
};

const getGameActivePlayers = async (req: Request, res: Response) => {
    try {
        const gameId: number = parseInt(req.params.gameId);

        const gamePlayers = await prisma.gamePlayer.findMany({
            where: { gameId }
        });

        return res.send(gamePlayers);
    } catch (error) {
        console.log('error', error);
        res.status(500).json(error);
    }
};

const createGamePlayer = async (req: Request, res: Response) => {
    try {
        const gameId: number = parseInt(req.params.gameId);
        const discordId: string = req.body.discordId;

        const hasPlayerJoinedToGame = await playerExistsInGame(gameId, discordId);

        if (hasPlayerJoinedToGame) {
            return res.status(400).json({ error: `This player has already joined Game ID ${gameId}` });
        }

        const data: GamePlayer = { ...req.body, gameId};

        const gamePlayer = await prisma.gamePlayer.create({
            data
        });

        return res.send(gamePlayer);
    } catch (error: unknown) {
        if (error instanceof Error) {
            const message: string = error.message;

            res.status(422).json({ error: message });
        }
    }
};

const updateGamePlayer = async (req: Request, res: Response) => {
    try {
        const gameId: number = parseInt(req.params.gameId);
        const discordId: string = req.params.discordId;

        const data: GamePlayer = { ...req.body, gameId};

        const updated = await prisma.gamePlayer.updateMany({
            where: { gameId, discordId },
            data: data
        });

        return res.send({ success: (updated.count > 0) });
    } catch (error) {
        console.log('error', error);
        res.status(500).json(error);
    }
};

const deleteGamePlayer = async (req: Request, res: Response) => {
    try {
        const gameId: number = parseInt(req.params.gameId);
        const discordId: string = req.params.discordId;

        const updated = await prisma.gamePlayer.deleteMany({
            where: { gameId, discordId },
        });

        return res.send({ success: (updated.count > 0) });
    } catch (error) {
        console.log('error', error);
        res.status(500).json(error);
    }
};

export default {
    getGameActivePlayers,
    createGamePlayer,
    updateGamePlayer,
    deleteGamePlayer,
}
