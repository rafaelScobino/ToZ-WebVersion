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

//Creating request JSON
const battleInfo = {

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

function strAtk() {
    fetch('/battle', {
        method: 'POST',
        body: JSON.stringify(battleInfo)
    })
    .then(response => {
        return response.text()
    })
    .then(data=>{
        console.log(data)
    })
}

function sklAtk() {
    fetch('/battle', {
        method: 'POST'
    })
    .then(response => {
        return response.text()
    })
    .then(data=>{
        console.log(data)
    })
}

function mgkAtk() {
    fetch('/battle', {
        method: 'POST'
    })
    .then(response => {
        return response.text()
    })
    .then(data=>{
        console.log(data)
    })
}

function heal() {
    fetch('/battle', {
        method: 'POST'
    })
    .then(response => {
        return response.text()
    })
    .then(data=>{
        console.log(data)
    })
}