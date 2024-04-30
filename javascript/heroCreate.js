// Variable Definition
const heroName = document.getElementById('nameInput')
const heroImg = document.getElementById("heroImg")
var heroLife = document.getElementById("heroLife")
var heroStrength = document.getElementById("heroStrength")
var heroSkill = document.getElementById("heroSkill")
var heroMagicka = document.getElementById("heroMagicka")

function rngSelector (op0,op1,op2,op3,op4,op5,op6,op7,op8,op9){
    const selectorArr = []
    let nOpt = arguments.length
    for (let i = 0; i < nOpt; i++){
            switch(i){
                case 0:
                selectorArr.push(op0);
                break;
                case 1:
                selectorArr.push(op1);
                break;
                case 2:
                selectorArr.push(op2);
                break;
                case 3:
                selectorArr.push(op3);
                break;
                case 4:
                selectorArr.push(op4);
                break;
                case 5:
                selectorArr.push(op5);
                break;
                case 6:
                selectorArr.push(op6);
                break;
                case 7:
                selectorArr.push(op7);
                break;
                case 8:
                selectorArr.push(op8);
                break;
                case 9:
                selectorArr.push(op9);
            }
    }
    let selection = Math.floor(Math.random() * selectorArr.length)
    return selectorArr[selection]
}

function rangerHero(){
    heroLife.innerText = 60;
    heroStrength.innerText = 6;
    heroSkill.innerText = 4;
    heroMagicka.innerText = 2;
    heroImg.setAttribute('src',"./assets/Contestants/Hero/ranger/idle.gif")
}

function warriorHero(){
    heroLife.innerText = 80;
    heroStrength.innerText = 8;
    heroSkill.innerText = 2;
    heroMagicka.innerText = 0;
    heroImg.setAttribute('src',"./assets/Contestants/Hero/warrior/idle.gif")
}

function wizardHero(){
    heroLife.innerText = 50;
    heroStrength.innerText = 2;
    heroSkill.innerText = 8;
    heroMagicka.innerText = 3;
    heroImg.setAttribute('src',"./assets/Contestants/Hero/wizard/idle.gif")
}

function fighterHero(){
    heroLife.innerText = 70;
    heroStrength.innerText = 4;
    heroSkill.innerText = 6;
    heroMagicka.innerText = 1;
    heroImg.setAttribute('src',"./assets/Contestants/Hero/fighter/idle.gif")
}

function randomHero(){
    heroLife.innerText = rngSelector(50,60,70,80) ;
    let mgk = 0;
        switch(parseInt(heroLife.innerText)){
            case 50:
               mgk = 3
                break;
            case 60:
                mgk = 2
                break;
            case 70:
                mgk = 1
                break;
            case 80:
                mgk = 0
                break;
        }
    heroStrength.innerText = rngSelector(1,2,3,4,5,6,7,8,9,10);
        let skl = Math.abs(heroStrength.innerText - 10)
    heroSkill.innerText = skl;
    heroMagicka.innerText = mgk;
        let random = rngSelector("./assets/Contestants/Hero/ranger/idle.gif","./assets/Contestants/Hero/warrior/idle.gif","./assets/Contestants/Hero/wizard/idle.gif","./assets/Contestants/Hero/fighter/idle.gif")
    heroImg.setAttribute('src',random)
}

function towerStart(){

    const heroInfo = heroName.value + 
    "|" +heroLife.innerText + 
    "|" +heroStrength.innerText + 
    "|" +heroSkill.innerText + 
    "|" +heroMagicka.innerText +
    "|" +heroImg.src

    const targetURL = './tower.html?data=' + encodeURIComponent(heroInfo)

    window.location.href = targetURL

}