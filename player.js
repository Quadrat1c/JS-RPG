let player = {
    stats: {
        level: 1,
        experience: 0,
        maxHp: 100,
        currentHp: 100,
        maxMp: 50,
        currentMp: 50,
        minDamage: 3,
        maxDamage: 7,
        strength: 0,
        intellect: 0,
        agility: 0,
    },
    economy: {
        gold: 0,
        ruby: 0,
        sapphire: 0,
        emerald: 0,
    },
    skills: {
        melee: {
            lvl: 1,
            exp: 0,
            cost: 0,
            description: "Passive skill that increases melee damage by (0.10 * lvl)",
            passive: true,
        },
    },
};

// Player Inventory


const playerExp = {
    1: 0,
    2: 250,
    3: 4000,
    4: 16000,
    5: 64000,
};

const skillExp = {
    1: 0,
    2: 500,
    3: 1100,
    4: 2000,
    5: 3500,
    6: 5500,
    7: 8500,
    8: 13000,
    9: 19000,
    10: 27000,
    11: 37000,
};