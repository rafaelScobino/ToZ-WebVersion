// Retrieving heroClass URL query param
const urlParamsBattle = new URLSearchParams(window.location.search)
const encodedDataBattle = urlParamsBattle.get('data')
const dataBattle = encodedDataBattle.split('|')

//Server DNS
const server = '/battle'

const hClass = dataBattle[6] 
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
const nextEnBt = document.getElementById("nextEnBt")
const levelUpDiv = document.getElementById("level-up-container")

    //Enemy elements
const eName = document.getElementById('enemyName')
const eImg = document.getElementById("enemyImg")
const eLife = document.getElementById("enemyLife")
const eStrength = document.getElementById("enemyStrength")
const eSkill = document.getElementById("enemySkill")
const eMagicka = document.getElementById("enemyMagicka")
const eDice = document.getElementById('enemyAction')

//Retrieving console HTML element
const gameConLog = document.getElementById('gameLog')

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
    fetch(server, {
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

document.addEventListener(window.onload = setFirstAtk() ,"")

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
            heroImgPath('die')
            alert('You Died!')
            window.location.reload
            break;
        case 'oe':
            heroImgPath('jump')
            alert('You Won!')
            nextEnBt.style.display = 'block'
            //window.location.href = './../interLevel.html'
            //window.location.reload
            break;
        case 'ot':
            heroImgPath('idle')
            alert('Time Out - Too Slow!')
            window.location.reload
            break;
    }
}

//Function to update char's life
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

    if(data['damageValue'] == 0 && hOpt != 3 && eNextAtk.innerText != 'HEAL' ){
        hDice.setAttribute('src','./assets/ActionsDices/block.gif');
        eDice.setAttribute('src','./assets/ActionsDices/block.gif')
    }else{
        switch (hOpt){
            case 3:
                hDice.setAttribute('src','./assets/ActionsDices/heal.gif');
                break;
            case 2:
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

function heroImgPath(value){
    hImg.setAttribute('src',`./assets/Contestants/Hero/${hClass}/${value}.gif`)
}

function updateHeroImg(data){
    switch (data['loser']){
        case 'h':
            heroImgPath('hit')
            break;
        case 'e':
            if(data['damageValue'] > 10){
                heroImgPath('atk1')
            }else{
                heroImgPath('atk2')
            }
            break;};
        setTimeout(() => {
            heroImgPath('run')
            resolve();
        }, 2500)
}

function mgkCheck(){
    let isEmpty = false;
    if(parseInt(hMagicka.innerText) <= 0){isEmpty = true};
    return isEmpty;
}

function scrollToBottom() {
    gameConLog.scrollTop = gameConLog.scrollHeight;
}

function battleLog(data){
let skipP = document.createElement('p')
    skipP.innerText = '.'
let logLine = document.createElement('p')
    logLine.innerText = '----------------------------------------------'
let logLine2 = document.createElement('p')
    logLine2.innerText = '----------------------------------------------'
let turnP = document.createElement('p')
let hDisplayRoll = document.createElement('p')
let hTotalRoll = document.createElement('p')
let eDisplayRoll = document.createElement('p')
let eTotalRoll = document.createElement('p')
    console.log('battleLogWorks')
    gameConLog.appendChild(turnP);
        turnP.innerText = `Current Turn: ${turn.innerText}`;
    gameConLog.appendChild(logLine);
    gameConLog.appendChild(hDisplayRoll);
        hDisplayRoll.innerText = `Your Dice Roll: ${data['hRoll']}`;
    gameConLog.appendChild(skipP);
    gameConLog.appendChild(eDisplayRoll);
        eDisplayRoll.innerText = `Enemy Dice Roll: ${data['eRoll']}`
    gameConLog.appendChild(logLine2);
    scrollToBottom()    
}

function actionRequest(value) {
    var aType = value;
    var jsonData = createJson(aType);
    fetch(server, {
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
        battleLog(data);
        updateBattle(data);
        updateDice(value,data);
        updateHeroImg(data);
        console.log(data);
    });
}

function action(value) {
    if(value > 1){
        if(!mgkCheck()){
            actionRequest(value);
            hMagicka.innerText = parseInt(hMagicka.innerText) - 1;
        }else{alert('Your Magicka Is Over!')}
    }else{actionRequest(value)};
}

//Function to define and return next enemy based on tower level
function nextEnemy(){
    let value =  parseInt(tLevel.innerText)
    tLevel.innerText =  value + 1;
    let data = {t_level: value}
    fetch('/next',{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    .then(response => {
        return response.json()
    })
    .then(data => {
        eLife.innerText = data['e_life'];
        eStrength.innerText = data['e_str'];
        eSkill.innerText = data['e_skl'];
        eMagicka.innerText = data['e_mgk'];
        setFirstAtk()
        nextEnBt.style.display = 'none'
        levelUpDiv.style.display = 'flex'
        turn.innerText = 0
    })
}

function levelUp(choice){
    switch (choice){
        case 0:
            hLife.innerText = parseInt(hLife.innerText) + 25;
            break;
        case 1:
            hStrength.innerText = parseInt(hStrength.innerText) + 2;
            break;
        case 2:
            hSkill.innerText = parseInt(hSkill.innerText) + 2;
            break;
        case 3:
            hMagicka.innerText = parseInt(hMagicka.innerText) + 3;
            break;
    }
    levelUpDiv.style.display = 'none'

}
