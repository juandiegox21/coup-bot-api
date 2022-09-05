import { Router } from 'express';
import gameController from "../controllers/gamePlayer.controller";

const router = Router();

router.get('/:gameId/players', gameController.getGameActivePlayers);
router.post('/:gameId/players', gameController.createGamePlayer);
router.patch('/:gameId/players/:discordId', gameController.updateGamePlayer);
router.delete('/:gameId/players/:discordId', gameController.deleteGamePlayer);

export default router;
