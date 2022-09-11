import { Game, PrismaClient } from '@prisma/client'
import { Request, Response } from 'express';
import moment from 'moment';
import assignCardsToPlayers from '../assignCardsToPlayers';

const prisma = new PrismaClient({
    errorFormat: 'minimal',
});

const latestUnfinishedGameCreated = async () => {
    const game = await prisma.game.findFirst({
        where: { dateEnded: null },
    });

    return game;
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

const getActiveGames = async (req: Request, res: Response) => {
    try {
        const latestUnfinishedGame = await latestUnfinishedGameCreated();

        if (!latestUnfinishedGame) {
            return res.status(400).json({ error: 'There are no games active' });
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

        if (latestUnfinishedGame) {
            return res.status(422).json({ error: `A game with id ${latestUnfinishedGame.id} has not been finished, please delete it before creating a new game` });
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

const startGame = async (req: Request, res: Response) => {
    try {
        const gameId: number = parseInt(req.params.gameId);
        const { dateStarted, dateEnded } = await retrieveGameById(gameId);

        if (dateEnded) {
            return res.status(400).json({ error: "This game has ended" });
        }

        if (dateStarted) {
            return res.status(400).json({ error: "This game has already started" });
        }

        const gamePlayersCount = await retrieveNumberOfGamePlayers(gameId);

        if (gamePlayersCount < 2) {
            return res.status(400).json({ error: `Not enough players to start a game (minimum 2), there are only ${gamePlayersCount} player(s) in this game` });
        }

        const response = await assignCardsToPlayers(gameId);

        await prisma.game.update({
            where: { id: gameId },
            data: {
                dateStarted: moment(new Date()).utc().format('YYYY-MM-DD H:mm:ss')
            }
        });

        return res.send(response);
    } catch (error: unknown) {
        res.status(422).json(error);
    }
};

export default {
    getActiveGames,
    getGame,
    createGame,
    updateGame,
    deleteGame,
    startGame,
}
