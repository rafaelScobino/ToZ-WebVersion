// Retrieving URL query params
const urlParams = new URLSearchParams(window.location.search)
const encodedData = urlParams.get('data')

const data = encodedData.split('|')

// Defining hero info and stats
const heroNameData = data[0]
const heroLifeData = data[1]
const heroStrengthData = data[2]
const heroSkillData = data[3]
const heroMagickaData = data[4]
const heroImgData = data[5]


//Getting html elements
const heroName = document.getElementById('heroName')
const heroImg = document.getElementById("heroImg")
const heroLife = document.getElementById("heroLife")
const heroStrength = document.getElementById("heroStrength")
const heroSkill = document.getElementById("heroSkill")
const heroMagicka = document.getElementById("heroMagicka")

const levelBg = document.getElementById('levelDisplay')
var bgSelect = document.getElementById('bgSelector')

function loadHero(){ 
    heroName.innerText = heroNameData
    heroLife.innerText = heroLifeData
    heroStrength.innerText = heroStrengthData
    heroSkill.innerText = heroSkillData
    heroMagicka.innerText = heroMagickaData
    heroImg.setAttribute('src',heroImgData)
}

document.addEventListener(window.onload = loadHero(),"")

function changeLevelBg(){
    let bg = ''
    switch(parseInt(bgSelect.value)){
        case 1:
            bg = 'bg1'
            break;
        case 2:
            bg = 'bg2'
            break;
        case 3:
            bg = 'bg3'
            break;
        case 4:
            bg = 'bg4'
            break;
        default:
            bg=''
            break;
    }

    levelBg.setAttribute('class',`levelBg ${bg}`)

}
