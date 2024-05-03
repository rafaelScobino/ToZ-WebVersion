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

//Setting Enemy first Attack Type
function updateFirstAtk(data){ 
    eNextAtk.innerText =  data['nextRoll'] 
    if(data['nextRoll'] == 'MAGICKA' || data['nextRoll'] == 'HEAL'){
        eMagicka.innerText = parseInt(eMagicka.innerText) - 1
    }
}

function setFirstAtk() {
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
        updateFirstAtk(data)
        console.log(data);
    });}

document.addEventListener(window.onload = setFirstAtk(),"")

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

function gameOver(data){
    switch(data['loser']){
        case 'oh':
            alert('You Died!')
            window.location.reload
            break;
        case 'oe':
            alert('You Won!')
            window.location.reload
            break;
        case 'ot':
            alert('Time Out - Too Slow!')
            window.location.reload
            break;
    }
}

function updateBattle(data){ 
    gameOver(data)

    hLife.innerText = parseInt(hLife.innerText) + data['hHeal']
    eLife.innerText = parseInt(eLife.innerText) + data['eHeal']

    if(data['loser'] == 'h'){
        hLife.innerText = parseInt(hLife.innerText) - data['damageValue']
    }else{
        eLife.innerText = parseInt(eLife.innerText) - data['damageValue']
    }

    eNextAtk.innerText =  data['nextRoll']

    if(data['nextRoll'] == 'MAGICKA' || data['nextRoll'] == 'HEAL'){
        eMagicka.innerText = parseInt(eMagicka.innerText) - 1
    }
    
    turn.innerText = parseInt(turn.innerText) + 1
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
        return response.json();
    })
    .then(data => {
        updateBattle(data)
        console.log(data);
    });
}

function mgkCheck(){
    let isEmpty = false;
    if(parseInt(hMagicka.innerText) <= 0){isEmpty = true};
    return isEmpty;
}

function mgkAtk() {
    if(!mgkCheck()){
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
            return response.json();
        })
        .then(data => {
            updateBattle(data)
            console.log(data);
        });
        hMagicka.innerText = parseInt(hMagicka.innerText) - 1
    }else{
        alert('Your Magicka Is Over!')
    }
  
}

function heal() {
    if(!mgkCheck()){
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
        return response.json();
    })
    .then(data => {
        updateBattle(data)
        console.log(data);
    });
    hMagicka.innerText = parseInt(hMagicka.innerText) - 1
    }else{
        alert('Your Magicka Is Over!')
    }
}