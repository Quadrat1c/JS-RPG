let tickCount = 0;
let InBattle = false;

function spawnEnemy() {
    let index = enemyTypes.length - 1;
    let numGenerator = Math.round(Math.random()*index);
    console.log(enemyTypes[numGenerator].name);
    document.getElementById('btnSpawnEnemy').disabled = true;
    InBattle = true;
    update();
}

function attack() {
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
}

// Updates ever tick or when an action happens
const update = () => {
    console.log(tickCount);
    // Character Stats
    document.getElementById('pLevel').innerText = player.stats.level;
    document.getElementById('pExp').innerText = player.stats.experience;
    document.getElementById('pCurrentHp').innerText = player.stats.currentHp;
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