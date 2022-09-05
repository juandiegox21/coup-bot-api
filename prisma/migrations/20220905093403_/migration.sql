-- CreateTable
CREATE TABLE "Game" (
    "id" SERIAL NOT NULL,
    "dateCreated" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "dateStarted" TEXT,
    "dateEnded" TEXT,

    CONSTRAINT "Game_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "GamePlayer" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "discordId" TEXT NOT NULL,
    "coins" INTEGER NOT NULL,
    "isWinner" BOOLEAN NOT NULL DEFAULT false,
    "dateJoined" TIMESTAMP(3),
    "gameId" INTEGER NOT NULL,

    CONSTRAINT "GamePlayer_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Card" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Card_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CardActionAttribute" (
    "id" SERIAL NOT NULL,
    "canTax" BOOLEAN NOT NULL DEFAULT false,
    "canAssassinate" BOOLEAN NOT NULL DEFAULT false,
    "canExchange" BOOLEAN NOT NULL DEFAULT false,
    "canSteal" BOOLEAN NOT NULL DEFAULT false,
    "cardId" INTEGER NOT NULL,

    CONSTRAINT "CardActionAttribute_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CardCounterActionAttribute" (
    "id" SERIAL NOT NULL,
    "canBlockForeignAid" BOOLEAN NOT NULL DEFAULT false,
    "canBlockStealing" BOOLEAN NOT NULL DEFAULT false,
    "canBlockAssassination" BOOLEAN NOT NULL DEFAULT false,
    "cardId" INTEGER NOT NULL,

    CONSTRAINT "CardCounterActionAttribute_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "GamePlayerCard" (
    "id" SERIAL NOT NULL,
    "cardId" INTEGER NOT NULL,
    "gameId" INTEGER NOT NULL,
    "gamePlayerId" INTEGER NOT NULL,
    "isCardRevealed" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "GamePlayerCard_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "CardActionAttribute_cardId_key" ON "CardActionAttribute"("cardId");

-- CreateIndex
CREATE UNIQUE INDEX "CardCounterActionAttribute_cardId_key" ON "CardCounterActionAttribute"("cardId");

-- AddForeignKey
ALTER TABLE "GamePlayer" ADD CONSTRAINT "GamePlayer_gameId_fkey" FOREIGN KEY ("gameId") REFERENCES "Game"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CardActionAttribute" ADD CONSTRAINT "CardActionAttribute_cardId_fkey" FOREIGN KEY ("cardId") REFERENCES "Card"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CardCounterActionAttribute" ADD CONSTRAINT "CardCounterActionAttribute_cardId_fkey" FOREIGN KEY ("cardId") REFERENCES "Card"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GamePlayerCard" ADD CONSTRAINT "GamePlayerCard_cardId_fkey" FOREIGN KEY ("cardId") REFERENCES "Card"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GamePlayerCard" ADD CONSTRAINT "GamePlayerCard_gameId_fkey" FOREIGN KEY ("gameId") REFERENCES "Game"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GamePlayerCard" ADD CONSTRAINT "GamePlayerCard_gamePlayerId_fkey" FOREIGN KEY ("gamePlayerId") REFERENCES "GamePlayer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
