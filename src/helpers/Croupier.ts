import { Card } from "@prisma/client";
import { AssignedCards, NumberOfCardsPerCharacter } from "../types/coup.type";
import { randomIndexFromArray } from "./utils";
import colors from "colors";

export class Croupier {
    gameId: number;
    cards: Array<Card>;
    mutableNumberOfCardsPerCharacter: NumberOfCardsPerCharacter;

    constructor(
        gameId: number,
        cards: Array<Card>,
        mutableNumberOfCardsPerCharacter: NumberOfCardsPerCharacter
    ) {
        this.gameId = gameId,
        this.cards = cards;
        this.mutableNumberOfCardsPerCharacter = mutableNumberOfCardsPerCharacter;
    }

    assignCard(playerName: string): AssignedCards {
        const randomCard = this.cards[randomIndexFromArray(this.cards)];
        const key = randomCard.name as keyof NumberOfCardsPerCharacter;

        if (this.mutableNumberOfCardsPerCharacter[key] === 0) {
            return this.assignCard(playerName);
        }

        this.mutableNumberOfCardsPerCharacter[key] -= 1;

        this.logAssignedCard(playerName, randomCard.name);

        return {
            gameId: this.gameId,
            cardId: randomCard.id,
        };
    }

    dealCards(playerName: string) {
        const dealtCardsData = [
            this.assignCard(playerName),
            this.assignCard(playerName)
        ];

        return dealtCardsData;
    }

    logAssignedCard(playerName: string, cardName: string) {
        const title = colors.yellow(`[GAME ID: ${this.gameId}]`);
        const content = ` ${playerName} received `;
        const footer = colors.red(cardName);

        console.log(title + content + footer);
    }
}

export default Croupier;
