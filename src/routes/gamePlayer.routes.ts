import { Router } from 'express';
import gamePlayerController from "../controllers/gamePlayer.controller";

const router = Router();

router.get('/:gameId/players', gamePlayerController.getGameActivePlayers);
router.post('/:gameId/players', gamePlayerController.createGamePlayer);
router.patch('/:gameId/players/:discordId', gamePlayerController.updateGamePlayer);
router.delete('/:gameId/players/:discordId', gamePlayerController.deleteGamePlayer);

export default router;
