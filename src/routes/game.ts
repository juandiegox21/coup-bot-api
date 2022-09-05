import { Game, PrismaClient } from '@prisma/client'
import { Request, Response, Router } from 'express';

const prisma = new PrismaClient({
    errorFormat: 'minimal',
});

const router = Router();

const latestUnfinishedGameCreated = async () => {
    const game = await prisma.game.findFirst({
        where: { dateEnded: null },
    });

    return game;
};

router.post('/', async (req: Request, res: Response) => {
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
});

router.patch('/:gameId', async (req: Request, res: Response) => {
    const gameId: number = parseInt(req.params.gameId);
    const data: Game = req.body;


    try {
        const response = await prisma.game.update({
            where: { id: gameId },
            data
        })

        res.send(response);
    } catch (error: any) {
        const message: string = error.message.trim();

        res.status(422).json({ error: message });
    }
});

router.delete('/:gameId', async (req: Request, res: Response) => {
    const gameId: number = parseInt(req.params.gameId);

    try {
        await prisma.game.delete({
            where: { id: gameId }
        })

        res.send({
            success: true
        });
    } catch (error: any) {
        const message: string = error.message.trim();

        res.status(422).json({ error: message });
    }

});

export default router;
