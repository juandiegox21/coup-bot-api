import { Router } from 'express';
import gameController from "../controllers/gamePlayer.controller";

const router = Router();

router.get('/:gameId/players', gameController.getGameActivePlayers);
router.post('/:gameId/players', gameController.createGamePlayer);
// router.patch('/:gameId/players/:playerId', gameController.updateGame);
// router.delete('/:gameId/players/:playerId', gameController.deleteGame);

export default router;
