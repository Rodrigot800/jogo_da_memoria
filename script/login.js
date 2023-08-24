const input = document.querySelector('.loginInput')
const button = document.querySelector('.buttonLogin')
const form = document.querySelector('.loginForm')

function validateinput({target}) {

    if ( target.value.length > 2) {
        
        button.removeAttribute('disabled')
    }else {
        button.setAttribute('disabled', '')
    }
} 

function handleSubmit(event) {
    event.preventDefault();
    
    localStorage.setItem('player', input.value)

    window.location = 'pages/game.html'
}

input.addEventListener('input', validateinput)
form.addEventListener('submit', handleSubmit)