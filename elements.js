let elements = {
    fire: {

    },

    water: {

    },

    earth: {

    },

    air: {

    },
};

let abilities = {
    flameThrower: {
        name: "Flamethrower",
        damageMin: 4,
        damageMax: 9,
        cost: 5,
        speed: 100,
        attributes: {
            0: elements.fire,
        },
        description: "A stream of controlled fire is " +
        "released intent on enveloping the users opponent.",
        envrionment_effect: "The air temperature went up " +
        "a substantial amount of degrees.",
        side_effect: null,
    },

    waterBurst: {
        name: "Water Burst",
        damageMin: 4,
        damageMax: 9,
        cost: 5,
        speed: 100,
        attributes: {
            0: elements.water,
        },
        description: "A burst of water explodes from the " +
        "users hand,the water stream is strong enough to " +
        "cut steel.", 
        envrionment_effect: "Water pools into large " +
        "puddles  all over the landscape.",
        side_effect: null,
    },

    earthHail: {
        name: "Earth Hail",
        damageMin: 4,
        damageMax: 9,
        cost: 5,
        speed: 100,
        attributes: {
            0: elements.earth,
        },
        description: "A multitude of rocks are flung at " +
        "the users opponent at high velocity.", 
        envrionment_effect: "There's dust in the air and " +
        "a plentiful amount of rocks on the battlefield.",
        side_effect: null,
    },

    airCutter: {
        name: "Air Cutter",
        damageMin: 4,
        damageMax: 9,
        cost: 5,
        speed: 100,
        attributes: {
            0: elements.air,
        },
        description: "Multiple high pressure jets of air " +
        "are launched at the opponent, they'll cut " +
        "anything they come in contact with.",
        envrionment_effect: "The air is stirred and " +
        "there's now a heavy wind on the battlefield.",
        side_effect: null,
    },

    mist: {
        name: "Mist",
        damageMin: 0,
        damageMax: 0,
        cost: 5,
        speed: 100,
        attributes: {
            0: elements.water,
            1: elements.fire,
        },
        description: "The user shrouds himself in a cloak " +
        "of mist making it difficult to hit the user, " +
        "increases agility by base * .5, lasts (3) turns.",
        envrionment_effect: null,
        side_effect: 0.5,
    },
};
