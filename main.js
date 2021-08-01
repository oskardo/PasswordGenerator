// DOM Elements
const resultEl = document.getElementById('result')
const lengthEl = document.getElementById('length')
const uppercaseEl = document.getElementById('uppercase')
const lowercaseEl = document.getElementById('lowercase')
const numbersEl = document.getElementById('numbers')
const symbolsEl = document.getElementById('symbols')
const generateEl = document.getElementById('generate')
const clipboardEl = document.getElementById('clipboard')

const randomFunc = {
    lower: getRandomLower,
    upper: getRandomUpper,
    number: getRandomNumber,
    symbol: getRandomSymbol
}
// Generate Event Listen
generateEl.addEventListener('click', () => {
    const length = +lengthEl.value
    const hasUpper = uppercaseEl.checked
    const hasLower = lowercaseEl.checked
    const hasNumber = numbersEl.checked
    const hasSymbol = symbolsEl.checked

    resultEl.innerText = generatePassword(hasLower, hasUpper, hasNumber, hasSymbol, length)
})

// Copy Password to Clipboard
clipboardEl.addEventListener('click', () => {
    const textarea = document.createElement('textarea')
    const password = resultEl.innerText

    if(!password) {
        return
    }

    textarea.value = password
    document.body.appendChild(textarea)
    textarea.select()
    document.execCommand('copy')
    textarea.remove()
    swal("Password Copied", "Password Length: " + password.length, "success");
})




// Generate Password Function
function generatePassword(lower, upper, number, symbol, length) {
    // 1. Init pw var
    // 2. Filter Out unchecked types
    // 3. Loop over length call generator func for each type
    // 4. Final pw to the pw var and return it

    let generatedPassword = ''
    const typesCount = lower + upper + number + symbol

    const typesArr = [{lower}, {upper}, {number}, {symbol}].filter(item => Object.values(item)[0])

    if(typesCount === 0) {
        return '';
    }

    for(let i = 0; i < length; i += typesCount) {
        typesArr.forEach(type => {
            const funcName = Object.keys(type)[0]

            generatedPassword += randomFunc[funcName]()
        })
    }

    const finalPassword = generatedPassword.slice(0, length)

    return finalPassword;
}


// Functions 
function getRandomLower() {
    return String.fromCharCode(Math.floor(Math.random() * 26) + 97)
}

function getRandomUpper() {
    return String.fromCharCode(Math.floor(Math.random() * 26) + 65)
}

function getRandomNumber() {
    return String.fromCharCode(Math.floor(Math.random() * 10) + 48)
}

function getRandomSymbol() {
    const symbols = '!@#$%^&*(){}[]=<>/,.'
    return symbols[Math.floor(Math.random() * symbols.length)]
}