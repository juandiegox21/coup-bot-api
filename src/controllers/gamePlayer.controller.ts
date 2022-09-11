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

const retrieveGameById = async (gameId: number) => {
    const game = await prisma.game.findFirstOrThrow({
        where: { id: gameId }
    });

    return game;
};

const retrieveNumberOfGamePlayers = async (gameId: number) => {
    const game = await prisma.gamePlayer.count({
        where: { gameId }
    });

    return game;
};

const getGamePlayerIdByDiscordId = async (gameId: number, discordId: string) => {
    const gamePlayer = await prisma.gamePlayer.findFirst({
        where: { gameId, discordId }
    });

    return gamePlayer?.id;
};

const getGameActivePlayers = async (req: Request, res: Response) => {
    try {
        const gameId: number = parseInt(req.params.gameId);

        const gamePlayers = await prisma.gamePlayer.findMany({
            where: { gameId },
            include: {
                gamePlayerCard: {
                    include: {
                        card: true
                    }
                }
            }
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

        const { dateStarted, dateEnded } = await retrieveGameById(gameId);

        if (dateStarted || dateEnded) {
            return res.status(422).json({ error: `Cannot join game id: ${gameId}, this game has already started or ended` });
        }

        const hasPlayerJoinedToGame = await playerExistsInGame(gameId, discordId);

        if (hasPlayerJoinedToGame) {
            return res.status(422).json({ error: `You have already joined Game ID ${gameId}` });
        }

        const gamePlayersCount = await retrieveNumberOfGamePlayers(gameId);

        if (gamePlayersCount >= 6) {
            return res.status(422).json({ error: "You can't join this game, it's full (maximum 6 players)" });
        }

        const data: GamePlayer = { ...req.body, gameId };

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

        const data: GamePlayer = { ...req.body, gameId };

        const gamePlayerId = await getGamePlayerIdByDiscordId(gameId, discordId);

        if (!gamePlayerId) {
            return res.status(422).json({ error: `Could not update player id ${gamePlayerId}.` });
        }

        const updated = await prisma.gamePlayer.update({
            where: { id: gamePlayerId },
            data: data
        });

        return res.send(updated);
    } catch (error) {
        console.log('error', error);
        res.status(500).json(error);
    }
};

const deleteGamePlayer = async (req: Request, res: Response) => {
    try {
        const gameId: number = parseInt(req.params.gameId);
        const discordId: string = req.params.discordId;

        const gamePlayerId = await getGamePlayerIdByDiscordId(gameId, discordId);

        if (!gamePlayerId) {
            return res.status(422).json({ error: "You are not in an active game." });
        }

        await prisma.gamePlayer.delete({
            where: { id: gamePlayerId },
        });

        return res.send({ success: true });
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
