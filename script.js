// ---------- GENERATE BUTTON
function getRandomUpper() {
    return String.fromCharCode(Math.floor(Math.random() * 26) + 65);
}

function getRandomLower() {
    return String.fromCharCode(Math.floor(Math.random() * 26) + 97);
}

function getRandomNumber() {
    return +String.fromCharCode(Math.floor(Math.random() * 10) + 48);
}

function getRandomSymbol() {
    return String.fromCharCode(Math.floor(Math.random() * 15) + 33);
}

const randomFunction = {
    lower: getRandomLower,
    upper: getRandomUpper,
    number: getRandomNumber,
    symbol: getRandomSymbol,
}

const generate = document.getElementById('generate');

generate.addEventListener('click', () => {
    const length = document.getElementById('length').value;
    const hasUpper = document.getElementById('uppercase').checked;
    const hasLower = document.getElementById('lowercase').checked;
    const hasNumber = document.getElementById('numbers').checked;
    const hasSymbol = document.getElementById('symbols').checked;

    const results = document.getElementById('result-password');

    const newStyle = `
        font-size: 80%;
        font-weight: 400;
        padding: 10px;
        color: red;
    `;

    if (!hasLower && !hasUpper && !hasNumber && !hasSymbol) {
        results.style.cssText = newStyle;
        results.innerText = 'you have to select one of the options';

    } else if (length > 20 || length < 3) {
        results.style.cssText = newStyle;
        results.innerText = 'invalid size (try between 3 and 20)';

    } else {
        const oldStyle = `
            font-size: 100%;
            font-weight: 700;
            padding: 10px;
            color: #202224;
        `;

        results.style.cssText = oldStyle;
        results.innerText = generatePassword(hasUpper, hasLower, hasNumber, hasSymbol, length);
    }
})

function generatePassword(upper, lower, number, symbol, length) {
    let generatedPassword = '';
    const typesCount = lower + upper + number + symbol;

    const typesArr = [{upper}, {lower}, {number}, {symbol}].filter(
        (item) => Object.values(item)[0]
    );

    for (let i = 0; i < length; i += typesCount) {
        typesArr.forEach((type) => {
            const checkedOption = Object.keys(type)[0];
            generatedPassword += randomFunction[checkedOption]();
        });
    }

    const finalPassword = generatedPassword.slice(0, length);
    return finalPassword;
}

// ---------- COPY BUTTON
let copyBtn = document.getElementById('copy-btn');

copyBtn.addEventListener('click', (e) => {
    const results = document.getElementById('result-password').innerHTML;
    navigator.clipboard.writeText(results);

    const originalText = copyBtn.innerHTML;
    copyBtn.innerText = 'Copied :)';
    setTimeout(() => {
        copyBtn.innerHTML = originalText
    }, 1500)
});

// ---------- LIGHT THEME
const light = document.getElementById('light');
light.addEventListener('click', () => {
    const config = document.getElementById('config');
    const lightBack = `
        background: white;
        color: #040D12;  
    `
    config.style.cssText = lightBack;

    const box = document.getElementById('password-generator');
    const lightBox = `
        background-color: #93B1A6;
        box-shadow: rgba(147, 177, 177, 0.5) 5px 5px, rgba(147, 177, 177, 0.4) 10px 10px, rgba(147, 177, 177, 0.3) 15px 15px, rgba(147, 177, 177, 0.2) 20px 20px, rgba(147, 177, 177, 0.1) 25px 25px;
    `
    box.style.cssText = lightBox;

    const lightBtn = document.querySelectorAll('.btn-light');
    lightBtn.forEach(el => {
        el.classList.remove('btn-light');
        el.classList.add('btn-dark');
    })
});

// ---------- DARK THEME
const dark = document.getElementById('dark');
dark.addEventListener('click', () => {
    const config = document.getElementById('config');
    const darkBack = `
        background: #040D12;
        color: white;
    `
    config.style.cssText = darkBack;

    const box = document.getElementById('password-generator');
    const darkBox = `
        background-color: #134648;
        box-shadow: rgba(24, 70, 70, 0.5) 5px 5px, rgba(24, 70, 70, 0.4) 10px 10px, rgba(24, 70, 70, 0.3) 15px 15px, rgba(24, 70, 70, 0.2) 20px 20px, rgba(24, 70, 70, 0.1) 25px 25px;
    `
    box.style.cssText = darkBox;

    const darkBtn = document.querySelectorAll('.btn-dark');
    darkBtn.forEach(el => {
        el.classList.remove('btn-dark');
        el.classList.add('btn-light');
    })
});