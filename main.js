const displayElementOne = document.querySelector('.display-1');
const displayElementTwo = document.querySelector('.display-2');
const tempResult = document.querySelector('.temp-result');
const numbersElement = document.querySelectorAll('.number');
const operationElement = document.querySelectorAll('.operation');
const equalElement = document.querySelector('.equal');
const clearAllElement = document.querySelector('.all-clear');
const clearLastEntityElement = document.querySelector('.last-entity-clear');


let display1Num = '';
let display2Num = '';
let result = null;
let lastOperation = '';
let haveDot = false;

numbersElement.forEach( number => {
    number.addEventListener('click', (event) => {
        if(event.target.innerText === '.' && !haveDot){
            haveDot = true;
        } else if(event.target.innerText === '.' && haveDot) {
            return;  
        }
        display2Num += event.target.innerText;
        displayElementTwo.innerText = display2Num;
    })
});

operationElement.forEach( operation => {
    operation.addEventListener('click', event => {
        if(!display2Num) return;
        haveDot= false;
        const operationName = event.target.innerText;
        if(display1Num && display2Num && lastOperation) {
            mathOperation(); 
        } else {
            result = parseFloat(display2Num)
        };
        clearVar(operationName);
        lastOperation = operationName;
        console.log(result)
    })
});

function clearVar(name = '') {
    display1Num += display2Num+ '' + name + "";
    displayElementOne.innerText = display1Num;
    displayElementTwo.innerText = " ";
    display2Num = '';
    tempResult.innerText = result;
};

function mathOperation(){
    if(lastOperation === '/'){
        result = parseFloat(result) / parseFloat(display2Num);

    } else if(lastOperation === 'X') {
        result = parseFloat(result) * parseFloat(display2Num);
    
    }  else if(lastOperation === '-') {
        result = parseFloat(result) - parseFloat(display2Num);
   
    } else if(lastOperation === '+') {
        result = parseFloat(result) + parseFloat(display2Num);
   
    } else if(lastOperation === '%') {
        result = parseFloat(result) % parseFloat(display2Num);
    }

};

equalElement.addEventListener('click', event => {
    if(!display1Num || !display2Num) return;
    haveDot = false;
    mathOperation();
    clearVar();
    displayElementTwo.innerText = result;
    tempResult.innerText = '';
    display2Num = result;
    display1Num = '';


});

clearAllElement.addEventListener('click', event => {
    displayElementOne.innerText = '0';
    displayElementTwo.innerText = '0';
    display1Num = '';
    display2Num = '';
    result = '';
    tempResult.innerText = '0';

});

clearLastEntityElement.addEventListener('click', event => {
    displayElementTwo.innerText = '';
    display2Num = '';

})

// KeyBoard Functionality

window.addEventListener('keydown', (event) => {
    if(
        event.key === '0' || 
        event.key === '1' ||
        event.key === '2' ||
        event.key === '3' ||
        event.key === '4' ||
        event.key === '5' ||
        event.key === '6' ||
        event.key === '7' ||
        event.key === '8' ||
        event.key === '9' ||
        event.key === '.' 

    ) {
        clickButtonElement1(event.key);
    } else if(
        event.key === '%' ||
        event.key === '/' ||
        event.key === '-' ||
        event.key === '+' 
         ) {
             clickOperation(event.key)
         } else if(event.key === '*') {
             clickOperation('X');
         } else if(event.key === '=' || event.key === 'Enter') {
            clickEqual();

         }
});

function clickButtonElement1(key){
    numbersElement.forEach(button => {
        if(button.innerText === key){
            button.click();

        }
    })
};

function clickOperation(key){
    operationElement.forEach(button => {
        if(button.innerText === key) {
            button.click();
        }
    })
}

function clickEqual() {
    equalElement.click();
    
}