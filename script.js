// # developed by: Camilla Sarmento

const cuenta = document.getElementById('cuenta-text');
const buttons = document.querySelectorAll('.tip-buttons');
const custom = document.querySelector('.custom');
const nPeople = document.getElementById('people');
const PropinaPerPerson = document.getElementById('tip-amount');
const totalPerPerson = document.getElementById('total');
const reset = document.querySelector('.reset');

let cuentaValue = 0;
let percentageValue = 0;
let percentageNumber = 0;
let nPeopleValue = 0;
let PropinaPerPersonValue = 0;
let totalPerPersonValue = 0;
let btnClicked = false;

// event listeners
cuenta.addEventListener('input', function () {
    cuentaValue = parseFloat(cuenta.value);
    calculator();
    PropinaPerPerson.textContent = '$0.00';
    totalPerPerson.textContent = '$0.00';
});

buttons.forEach(button => {
    button.addEventListener('click', function () {
        percentageValue = this.textContent;
        btnClicked = true;
        calculator();
        PropinaPerPerson.textContent = '$0.00';
        totalPerPerson.textContent = '$0.00';
        if (btnClicked === true) {
            if (percentageValue === '5%') {
                percentageNumber = 5;
            } else if (percentageValue === '10%') {
                percentageNumber = 10;
            } else if (percentageValue === '15%') {
                percentageNumber = 15;
            } else if (percentageValue === '25%') {
                percentageNumber = 25;
            } else if (percentageValue === '50%') {
                percentageNumber = 50;
            }
        } else {
            btnClicked = false;
        }
    });
});

custom.addEventListener('input', function () {
    percentageNumber = parseFloat(custom.value);
    calculator();
    PropinaPerPerson.textContent = '$0.00';
    totalPerPerson.textContent = '$0.00';
});

nPeople.addEventListener('input', function () {
    nPeopleValue = parseInt(nPeople.value);
    calculator();
    if (nPeopleValue <= 0) {
        document.querySelectorAll('span').forEach(span => {
            span.style.display = 'block';
        });
        nPeople.classList.add('people-input');
        PropinaPerPerson.textContent = '$0.00';
        totalPerPerson.textContent = '$0.00';
    } else {
        document.querySelectorAll('span').forEach(span => {
            span.style.display = 'none';
        });
        nPeople.classList.remove('people-input');
    }
});

reset.addEventListener('click', function () {
    PropinaPerPerson.textContent = '$0.00';
    totalPerPerson.textContent = '$0.00';
    buttons.forEach(button => {
        if (button.classList.contains('active')) {
            button.classList.remove('active');
        }
    });
    percentageNumber = 0;
    cuenta.value = '';
    nPeople.value = '';
    custom.value = '';
});

function calculator() {
    PropinaPerPersonValue = (((cuentaValue * percentageNumber) / 100) / nPeopleValue).toFixed(2);
    totalPerPersonValue = ((cuentaValue / nPeopleValue) + (((cuentaValue * percentageNumber) / 100) / nPeopleValue)).toFixed(2);
    PropinaPerPerson.textContent = '$' + PropinaPerPersonValue;
    totalPerPerson.textContent = '$' + totalPerPersonValue;
}