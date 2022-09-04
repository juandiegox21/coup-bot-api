const defaultActions = {
    canTax: false,
    canAssassinate: false,
    canExchange: false,
    canSteal: false,
};

const createContessa = () => ({
    name: "Contessa",
    cardActionAttribute: {
        create: defaultActions
    }
});

const createAmbassador = () => ({
    name: "Ambassador",
    cardActionAttribute: {
        create: { ...defaultActions, canExchange: true }
    }
});

const createAssassin = () => ({
    name: "Assassin",
    cardActionAttribute: {
        create: { ...defaultActions, canAssassinate: true }
    }
});

const createDuke = () => ({
    name: "Duke",
    cardActionAttribute: {
        create: { ...defaultActions, canTax: true }
    }
});

const createCaptain = () => ({
    name: "Captain",
    cardActionAttribute: {
        create: { ...defaultActions, canSteal: true }
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
    ]
};

export default cardData;
