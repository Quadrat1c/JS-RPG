let tickCount = 0;
let InBattle = false;
let killBonus = 0;
let skillPoints = 0;
let statPoints = 0;

let currentEnemyIndex;
let currentEnemyHp = 0;

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
}

function enemyDeath() {
    let xpMultiplier = killBonus + 1;
    let exp = enemyTypes[currentEnemyIndex].experience * xpMultiplier;
    console.log("You gained: " + exp + " experience.");
    // Calculate Experience

    player.stats.experience += exp;
    player.skills.melee.exp += exp;
    // Loot

    killBonus++;
    update();
}

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

// Updates ever tick or when an action happens
const update = () => {
    console.log("Tick: " + tickCount);
    document.getElementById('killBonus').innerText = killBonus;
    // Character Stats
    document.getElementById('pLevel').innerText = player.stats.level;
    document.getElementById('pExp').innerText = player.stats.experience;
    document.getElementById('pCurrentHp').innerText = player.stats.currentHp.toFixed(0);
    document.getElementById('pMaxHp').innerText = player.stats.maxHp;
    document.getElementById('pCurrentMp').innerText = player.stats.currentMp;
    document.getElementById('pMaxMp').innerText = player.stats.maxMp;
    document.getElementById('pStrength').innerText = player.stats.strength;
    document.getElementById('pIntellect').innerText = player.stats.intellect;
    document.getElementById('pAgility').innerText = player.stats.agility;
    // Character Skills
    document.getElementById('pMelee').innerText = player.skills.melee.lvl;
    // Character Inventory
    document.getElementById('pGold').innerText = player.economy.gold;
    document.getElementById('pRuby').innerText = player.economy.ruby;
    document.getElementById('pSapphire').innerText = player.economy.sapphire;
    document.getElementById('pEmerald').innerText = player.economy.emerald;

    if (InBattle) {
        console.log('We are in battle.');
        document.getElementById('eCurrentHealth').innerText = currentEnemyHp.toFixed(0);
        document.getElementById('btnAttack').disabled = false;

        // Enemy had died
        if (currentEnemyHp <= 0) {
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
    tickCount++;
};

Object.size = function(obj) {
    let size = 0, key;
    for (key in obj) {
        if (obj.hasOwnProperty(key)) size++;
    }
    return size;
};

function init() {
    update();
}

function radioButtonChecked(value) {
    if (value === 1) { document.getElementById("rdBtn1").checked = true; }
    if (value === 2) { document.getElementById("rdBtn2").checked = true; }
    if (value === 3) { document.getElementById("rdBtn3").checked = true; }
    if (value === 4) { document.getElementById("rdBtn4").checked = true; }
    if (value === 5) { document.getElementById("rdBtn5").checked = true; }
}