import { GamePlayer, GamePlayerCard } from "@prisma/client";

export interface GamePlayerWithCard extends GamePlayer {
    gamePlayerCard: Array<GamePlayerCard>
}

export type NumberOfCardsPerCharacter = {
    Duke: number,
    Contessa: number,
    Ambassador: number,
    Assassin: number,
    Captain: number,
}

export type AssignedCards = {
    gameId: number,
    cardId: number,
    gamePlayerId?: number | null,
    isCardRevealed?: boolean,
    gamePlayerDiscordId?: string | null,
};
