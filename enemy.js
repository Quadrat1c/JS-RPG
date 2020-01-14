let enemyTypes = [];

function enemy(I, ename, hp, minDmg, maxDmg, exp, lvl, desc) {
    I = I || {};
    I.name = ename;
    I.health = hp;
    I.minDamage = minDmg;
    I.maxDamage = maxDmg;
    I.experience = exp;
    I.level = lvl;
    I.description = desc;
    I.type = 1;
    return I;
}

enemyTypes.push(enemy(0, "Thief", 30, 3, 5, 9, 1, "Thief's description."));
enemyTypes.push(enemy(0, "Zombie", 15, 9, 14, 6, 1, "Zombie's description."));
