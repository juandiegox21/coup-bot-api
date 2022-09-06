import { Router } from 'express';
import gamePlayerCardController from "../controllers/gamePlayerCard.controller";

const router = Router();

router.get('/:gameId/gameplayercards', gamePlayerCardController.retrieveCardsOnGame);
router.patch('/:gameId/gameplayercards/:playerCardId', gamePlayerCardController.updateCard);

export default router;
