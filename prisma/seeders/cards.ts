const defaultActions = {
    canTax: false,
    canAssassinate: false,
    canExchange: false,
    canSteal: false,
};

const defaultCounterActions = {
    canBlockForeignAid: false,
    canBlockStealing: false,
    canBlockAssassination: false,
};

const createContessa = () => ({
    name: "Contessa",
    cardActionAttribute: {
        create: defaultActions
    },
    cardCounterActionAttribute: {
        create: { ...defaultCounterActions, canBlockAssassination: true },
    }
});

const createAmbassador = () => ({
    name: "Ambassador",
    cardActionAttribute: {
        create: { ...defaultActions, canExchange: true }
    },
    cardCounterActionAttribute: {
        create: { ...defaultCounterActions, canBlockStealing: true },
    }
});

const createAssassin = () => ({
    name: "Assassin",
    cardActionAttribute: {
        create: { ...defaultActions, canAssassinate: true }
    },
    cardCounterActionAttribute: {
        create: { ...defaultCounterActions },
    }
});

const createDuke = () => ({
    name: "Duke",
    cardActionAttribute: {
        create: { ...defaultActions, canTax: true }
    },
    cardCounterActionAttribute: {
        create: { ...defaultCounterActions, canBlockForeignAid: true },
    }
});

const createCaptain = () => ({
    name: "Captain",
    cardActionAttribute: {
        create: { ...defaultActions, canSteal: true }
    },
    cardCounterActionAttribute: {
        create: { ...defaultCounterActions, canBlockStealing: true },
    }
});

const cardData = () => {
    const contessa = createContessa();
    const ambassador = createAmbassador();
    const assassin = createAssassin();
    const duke = createDuke();
    const captain = createCaptain();

    return [
        contessa,
        ambassador,
        assassin,
        duke,
        captain,
    ];
};

export default cardData;
