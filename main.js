let tickCount = 0;      // ticks will be used for DoTs and HoTs (over time skills)
let InBattle = false;   // Are we in battle?
let killBonus = 0;      // each enemy you kill in a row you receive +1 killbonus, this increases exp and gold gained
let skillPoints = 0;    // on level up you can spend these points on skills
let statPoints = 0;     // on level up you can spend these points on stats

let currentEnemyIndex;  // enemies index in array (so we can pull data for that enemy easily)
let currentEnemyHp = 0; // keeps track of current enemies health

// Spawns a random enemy
function spawnEnemy() {
    let index = enemyTypes.length - 1;
    currentEnemyIndex = Math.round(Math.random()*index);
    console.log(enemyTypes[currentEnemyIndex].name);
    document.getElementById('btnSpawnEnemy').disabled = true;
    InBattle = true;
    currentEnemyHp = enemyTypes[currentEnemyIndex].health;
    document.getElementById('eCurrentHealth').innerText = currentEnemyHp;
    document.getElementById('eMaxHealth').innerText = currentEnemyHp;
    document.getElementById('eName').innerText = enemyTypes[currentEnemyIndex].name;
    document.getElementById('eLevel').innerText = enemyTypes[currentEnemyIndex].level;
    document.getElementById('eMinDmg').innerText = enemyTypes[currentEnemyIndex].minDamage;
    document.getElementById('eMaxDmg').innerText = enemyTypes[currentEnemyIndex].maxDamage;
    document.getElementById('eDesc').innerText = enemyTypes[currentEnemyIndex].description;
    update();
}

// Attack enemy and enemy attacks back
function attack() {
    document.getElementById('btnAttack').disabled = true;
    console.log('attacking');

    let baseDamage = Math.round(Math.random()*player.stats.maxDamage) + player.stats.minDamage;
    let meleeDamage = 0;
    let totalDamage = 0;
    console.log("Base Damage Dealt: " + baseDamage);
    for (let i = 0; i < player.skills.melee.lvl; i++) {
        meleeDamage += baseDamage * 0.10;
    }
    console.log("Melee Damage: " + meleeDamage);
    totalDamage = baseDamage + meleeDamage;
    currentEnemyHp -= totalDamage;

    // Calculate Enemy damage
    if (currentEnemyHp > 0) {
        player.stats.currentHp -= Math.round(Math.random() * enemyTypes[currentEnemyIndex].maxDamage) + enemyTypes[currentEnemyIndex].minDamage;
    }
    /*
    let selectedAbility;

    // lets get the current selected ability / radio button
    let radios = document.getElementsByName('radioBtnAbility');
    for (let i = 0, length = radios.length; i < length; i++) {
        if (radios[i].checked) {
            selectedAbility = radios[i].value;
            abilityIndex = i;
        }
    }
    console.log("Ability: " + selectedAbility);
    let dmgMin = abilities[selectedAbility].damageMin;
    let dmgMax = abilities[selectedAbility].damageMax;

    let playerAttack = Math.floor(Math.random() * (dmgMax - dmgMin)) + dmgMin;
    player2.health = player2.health - playerAttack;
    console.log(playerAttack);
    update();
     */
    update();
}

function levelUp() {
    skillPoints++;
    statPoints += 2;
    player.stats.level += 1;
}

// run this when an enemy is killed
function enemyDeath() {
    let kbMultiplier = killBonus + 1;
    let exp = enemyTypes[currentEnemyIndex].experience * kbMultiplier;
    console.log("You gained: " + exp + " experience.");
    // Calculate Experience

    player.stats.experience += exp;
    player.skills.melee.exp += exp;
    lootDrops(kbMultiplier);
    killBonus++;
    update();
}

function lootDrops(kbMultiplier) {
    console.log("Running Loot Drops");
    // 50% chance of gold drop
    if (Math.random()<0.5) {
        let enemyLvl = enemyTypes[currentEnemyIndex].level;
        let gold = 0;
        switch (enemyLvl) {
            case 1:
                gold = Math.random()*5 * kbMultiplier;
                player.economy.gold += gold;
                console.log("Gold: " + gold);
                break;
            case 2:
                gold = Math.random()*15 * kbMultiplier;
                player.economy.gold += gold;
                console.log("Gold: " + gold);
                break;
            case 3:
                gold = Math.random()*30 * kbMultiplier;
                player.economy.gold += gold;
                console.log("Gold: " + gold);
                break;
            default:
                gold = Math.random()*5 * kbMultiplier;
                player.economy.gold += gold;
                console.log("Gold: " + gold);
                break;
        }
    }
    // 1% chance of gem drop
    let gemChance = 0.01 * kbMultiplier;
    console.log("Gem Chance: " + gemChance);
    if (Math.random() < gemChance) {
        player.economy.ruby += 1;
        console.log("Found a Ruby!!");
    }
    if (Math.random() < gemChance) {
        player.economy.sapphire += 1;
        console.log("Found a Sapphire!!");
    }
    if (Math.random() < gemChance) {
        player.economy.emerald += 1;
        console.log("Found a Emerald!!");
    }
}

// go back to town to heal and other things
function town() {
    if (InBattle) {
        console.log("You are in Battle!");
        return;
    } else {
        // Do town thing
        console.log("Healed in Town.");
        player.stats.currentHp = player.stats.maxHp;
        killBonus = 0;
        update();
    }
}

// Updates every tick or when an action happens
const update = () => {
    console.log("Tick: " + tickCount);
    document.getElementById('killBonus').innerText = killBonus;
    // Character Stats
    document.getElementById('pLevel').innerText = player.stats.level;
    document.getElementById('pExp').innerText = player.stats.experience;
    document.getElementById('pCurrentHp').innerText = player.stats.currentHp.toFixed(0);
    //let healthFillAmount = player.stats.currentHp / player.stats.maxHp;
    //document.getElementById('playerHealthBar').style.fill = healthFillAmount + '%';
    document.getElementById('pMaxHp').innerText = player.stats.maxHp;
    document.getElementById('pCurrentMp').innerText = player.stats.currentMp;
    document.getElementById('pMaxMp').innerText = player.stats.maxMp;
    document.getElementById('pStrength').innerText = player.stats.strength;
    document.getElementById('pIntellect').innerText = player.stats.intellect;
    document.getElementById('pAgility').innerText = player.stats.agility;
    // Character Skills
    document.getElementById('pMelee').innerText = player.skills.melee.lvl;
    // Character Inventory
    document.getElementById('pGold').innerText = player.economy.gold.toFixed(2);
    document.getElementById('pRuby').innerText = player.economy.ruby;
    document.getElementById('pSapphire').innerText = player.economy.sapphire;
    document.getElementById('pEmerald').innerText = player.economy.emerald;

    if (skillPoints === 0) {
        document.getElementById('btnMeleeSkill').style.visibility = "hidden";
    } else {
        document.getElementById('btnMeleeSkill').style.visibility = "visible";
    }

    if (statPoints === 0) {
        document.getElementById('btnStrength').style.visibility = "hidden";
        document.getElementById('btnIntellect').style.visibility = "hidden";
        document.getElementById('btnAgility').style.visibility = "hidden";
    } else {
        document.getElementById('btnStrength').style.visibility = "visible";
        document.getElementById('btnIntellect').style.visibility = "visible";
        document.getElementById('btnAgility').style.visibility = "visible";
    }

    if (InBattle) {
        console.log('We are in battle.');
        document.getElementById('eCurrentHealth').innerText = currentEnemyHp.toFixed(0);
        document.getElementById('btnAttack').disabled = false;

        // Enemy had died (In javascript -0 exists so thats why so many ORs) lol
        if (currentEnemyHp < 0 || currentEnemyHp === 0 || currentEnemyHp === -0) {
            console.log("Enemy has been killed.");
            InBattle = false;
            //document.getElementById('btnAttack').disabled = true;
            document.getElementById('btnSpawnEnemy').disabled = false;
            // Run Death code.
            enemyDeath();
        }

        // Player has died
        if (player.stats.currentHp <= 0) {
            alert("You have Died! Your character is lost.");
            window.location.reload(false);
        }
    } else {
        document.getElementById('btnAttack').disabled = true;
    }
    levelCheck();
    tickCount++;
};

// run this when the main page is loaded for the first time
function init() {
    update();
}

function levelCheck() {
    let level = player.stats.level;
    let experience = player.stats.experience;
    switch(level) {
        case 1:
            if (experience > 50) { levelUp(); }
            break;
        case 2:
            if (experience > 100) { levelUp(); }
            break;
        case 3:
            if (experience > 150) { levelUp(); }
            break;
        case 4:
            if (experience > 200) { levelUp(); }
            break;
        case 5:
            if (experience > 250) { levelUp(); }
            break;
        default:
            break;
    }
}

function useStatPoint(stat) {
    switch (stat) {
        case "strength":
            if (statPoints > 0) {
                player.stats.strength += 1;
                statPoints--;
                update();
            }
            break;
        case "intellect":
            if (statPoints > 0) {
                player.stats.intellect += 1;
                statPoints--;
                update();
            }
            break;
        case "agility":
            if (statPoints > 0) {
                player.stats.agility += 1;
                statPoints--;
                update();
            }
            break;
        default:
            break;
    }
}

function useSkillPoint(skill) {
    switch (skill) {
        case "melee":
            if (skillPoints > 0) {
                player.skills.melee.lvl += 1;
                skillPoints--;
                update();
            }
            break;
        default:
            break;
    }
}

function save() {
    console.log("saving");
    let save = {
        player1: player,
    };
    console.log(JSON.stringify(save));
    localStorage.setItem("save", JSON.stringify(save));
}

function load() {
    let saveGame = JSON.parse(localStorage.getItem("save"));
    if (saveGame !== null && saveGame !== undefined) {
        player = saveGame.player1;
    }
}

Object.size = function(obj) {
    let size = 0, key;
    for (key in obj) {
        if (obj.hasOwnProperty(key)) size++;
    }
    return size;
};

function radioButtonChecked(value) {
    if (value === 1) { document.getElementById("rdBtn1").checked = true; }
    if (value === 2) { document.getElementById("rdBtn2").checked = true; }
    if (value === 3) { document.getElementById("rdBtn3").checked = true; }
    if (value === 4) { document.getElementById("rdBtn4").checked = true; }
    if (value === 5) { document.getElementById("rdBtn5").checked = true; }
}