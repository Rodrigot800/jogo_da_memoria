const grid = document.querySelector('.grid')
const player = document.querySelector('.player')
const tempo = document.querySelector('.temp')
const playerName = localStorage.getItem('player')


const frontCards = [
    'jujursuKaisen',
    'berserk',
    'bokuNoHero',
    'chawman',
    'goku',
    'ichigo',
    'kimetsunoyaba',
    'naruto',
    'saitama',
    'snk',
]

const createElement = (tag, className) => {
    const element = document.createElement(tag)
    element.className = className
    return element;
}

let firstCard = ''
let secondCard = ''

const checkEndGame = () =>{
    const disabledCards = document.querySelectorAll('.disabled')

    if (disabledCards.length == 2) {
        setTimeout(() => {
            clearInterval(this.loop)
            alert("Parabéns "+playerName+", seu tempo foi de "+tempo.innerHTML+" seg")
        }, 500)
    }
}

const checkCards = () => {
    const firstFrontCard = firstCard.getAttribute('data-frontCard')
    const secondFrontCard = secondCard.getAttribute('data-frontCard')

    if (firstFrontCard === secondFrontCard) {

        firstCard.classList.add('disabled')
        secondCard.classList.add('disabled')
        
        firstCard = ''
        secondCard = ''

        checkEndGame()
    } else {
        setTimeout(() => {
            firstCard.classList.remove('revealcard')
            secondCard.classList.remove('revealcard')

            firstCard = ''
            secondCard = ''
        }, 400)
    }
}

const revealcard = ({ target }) => {

    if (target.parentNode.className.includes('revealcard')) {
        return
    }

    if (firstCard === '') {
        target.parentNode.classList.add('revealCard')
        firstCard = target.parentNode
    } else if (secondCard === ''){
        target.parentNode.classList.add('revealCard')
        secondCard = target.parentNode

        checkCards()
    }

    target.parentNode.classList.add('revealcard')
}

const creatCard = (frontCard) => {

    const card = createElement('div', 'card')
    const front = createElement('div', 'face front')
    const back = createElement('div', 'face back')

    front.style.backgroundImage = `url('../imagens/${frontCard}.png')`

    card.appendChild(front)
    card.appendChild(back)

    card.addEventListener('click', revealcard)
    card.setAttribute('data-frontCard', frontCard)
    
    return card
}

const loadGame = () => {

    const duplicateFrontcards = [...frontCards, ...frontCards]
    
    const shuffledArray = duplicateFrontcards.sort( () => Math.random() -0.5 )

    shuffledArray.forEach((frontCard) => {
        const card = creatCard(frontCard)
        grid.appendChild(card)
    })
}

const time =() => {
   this.loop = setInterval(() => {

        const tempcorrido = Number(tempo.innerHTML)
        tempo.innerHTML = tempcorrido + 1

    }, 1000)
} 

window.onload = () => {

    const playerName = localStorage.getItem('player')

    player.innerHTML = playerName

    time()

    loadGame()

}