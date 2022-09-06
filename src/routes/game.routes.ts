import { Router } from 'express';
import gameController from "../controllers/game.controller";

const router = Router();

router.get('/', gameController.getActiveGames);
router.get('/:gameId', gameController.getGame);
router.post('/', gameController.createGame);
router.post('/:gameId/start', gameController.startGame);
router.patch('/:gameId', gameController.updateGame);
router.delete('/:gameId', gameController.deleteGame);

export default router;
