//Getting html elements

//Hero Elements
const hName = document.getElementById('heroName')
const hImg = document.getElementById("heroImg")
const hLife = document.getElementById("heroLife")
const hStrength = document.getElementById("heroStrength")
const hSkill = document.getElementById("heroSkill")
const hMagicka = document.getElementById("heroMagicka")

//Tower Elements
const eNextAtk = document.getElementById("enemyRoll")
const turn = document.getElementById("turnCounter")
const tLevel = document.getElementById("tLevel")

//Enemy elements
const eName = document.getElementById('enemyName')
const eImg = document.getElementById("enemyImg")
const eLife = document.getElementById("enemyLife")
const eStrength = document.getElementById("enemyStrength")
const eSkill = document.getElementById("enemySkill")
const eMagicka = document.getElementById("enemyMagicka")

//Setting Action Type
// 0-> Strength | 1-> Skill | 2->Magicka | 3-> Heal | 4-> Inventory
var aType

//Creating request JSON
function createJson(aType){
return battleInfo = {

        action: aType,

        hLife: parseInt(hLife.innerText),
        hStrength: parseInt(hStrength.innerText),
        hSkill: parseInt(hSkill.innerText),
        hMagicka:parseInt(hMagicka.innerText),

        eLife: parseInt(eLife.innerText),
        eStrength: parseInt(eStrength.innerText),
        eSkill: parseInt(eSkill.innerText),
        eMagicka:parseInt(eMagicka.innerText),

        eNextAtk: eNextAtk.innerText,
        turn: parseInt(turn.innerText),
        tLevel: parseInt(tLevel.innerText)
}
}

function updateBattle(data){

    eNextAtk.innerText =  data['nextRoll']

}


function strAtk() {
    var aType = 0;
    var jsonData = createJson(aType);
    fetch('/battle', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(jsonData)
    })
    .then(response => {
        return response.json();
    })
    .then(data => {
        updateBattle(data)
        console.log(data);
    });
}

function sklAtk() {
    aType = 1;
    var jsonData = createJson(aType);
    fetch('/battle', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(jsonData)
    })
    .then(response => {
        return response.text();
    })
    .then(data => {
        console.log(data);
    });
}

function mgkAtk() {
    aType = 2;
    var jsonData = createJson(aType);
    fetch('/battle', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(jsonData)
    })
    .then(response => {
        return response.text();
    })
    .then(data => {
        console.log(data);
    });
}

function heal() {
    aType = 3;
    var jsonData = createJson(aType);
    fetch('/battle', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(jsonData)
    })
    .then(response => {
        return response.text();
    })
    .then(data => {
        console.log(data);
    });
}