//Getting html elements

    //Hero Elements
const hName = document.getElementById('heroName')
const hImg = document.getElementById("heroImg")
const hLife = document.getElementById("heroLife")
const hStrength = document.getElementById("heroStrength")
const hSkill = document.getElementById("heroSkill")
const hMagicka = document.getElementById("heroMagicka")
const hDice = document.getElementById('heroAction')

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
const eDice = document.getElementById('enemyAction')

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

async function damageVC(value, cLife) {
    for (let i = 0; i <= value - 1; i++) {
        await new Promise(resolve => {
            setTimeout(() => {
                cLife.innerText = parseInt(cLife.innerText) - 1;
                resolve();
            }, 250);
        });
    }
}
function updateBattle(data){ 
    gameOver(data)

    hLife.innerText = parseInt(hLife.innerText) + data['hHeal']
    eLife.innerText = parseInt(eLife.innerText) + data['eHeal']

    eNextAtk.innerText =  data['nextRoll']

    if(data['nextRoll'] == 'MAGICKA' || data['nextRoll'] == 'HEAL'){
        eMagicka.innerText = parseInt(eMagicka.innerText) - 1
    }
    
    turn.innerText = parseInt(turn.innerText) + 1

    if(data['loser'] == 'h'){
        damageVC(data['damageValue'],hLife)
    }else{
        damageVC(data['damageValue'],eLife)
    }
}

function updateDice(hOpt,data){

    if(data['damageValue'] == 0 && hOpt != 'h' && eNextAtk.innerText != 'HEAL' ){
        hDice.setAttribute('src','./assets/ActionsDices/block.gif');
        eDice.setAttribute('src','./assets/ActionsDices/block.gif')
    }else{
        switch (hOpt){
            case 'h':
                hDice.setAttribute('src','./assets/ActionsDices/heal.gif');
                break;
            case 'm':
                hDice.setAttribute('src','./assets/ActionsDices/mgk.gif');
                break;
            default:
                hDice.setAttribute('src',`./assets/ActionsDices/dice${data['hRoll']}.png`)
                break;}

            switch (data['eRoll']){
                case 'h':
                    eDice.setAttribute('src','./assets/ActionsDices/heal.gif');
                    break;
                case 'm':
                    eDice.setAttribute('src','./assets/ActionsDices/emgk.gif');
                    break;
                default:
                    eDice.setAttribute('src',`./assets/ActionsDices/dice${data['eRoll']}.png`)
                    break;}}


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
        updateDice('n',data)
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
        updateDice('n',data)
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
            updateDice('m',data)
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
        updateDice('h',data)
        console.log(data);
    });
    hMagicka.innerText = parseInt(hMagicka.innerText) - 1
    }else{
        alert('Your Magicka Is Over!')
    }
}