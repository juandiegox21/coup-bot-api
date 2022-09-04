import { faker } from '@faker-js/faker';

const COINS_PER_PLAYER = 2;

const createGamePlayer = () => ({
    name: faker.name.fullName(),
    discordId: faker.random.numeric(10),
    coins: COINS_PER_PLAYER,
    dateJoined: new Date(),
});

const gamePlayerData = (numberOfRecords = 1) => {
    const gamePlayers = [];

    for (let i = 0; i < numberOfRecords; i ++) {
        gamePlayers.push(createGamePlayer());
    }

    return gamePlayers;
};


export default gamePlayerData;

