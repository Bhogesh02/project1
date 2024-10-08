const calculator = {
  displayValue: '0',
  firstOperand: null,
  waitingForSecondOperand: false,
  operator: null,
};
function updateDisplay() {
  const display = document.querySelector('.scr');
  display.value = calculator.displayValue;
}

updateDisplay();

//keys
const keys = document.querySelector('.keypad')
keys.addEventListener('click', (event)=>{
	const {target} = event;
	if(!target.matches('button'))
		{
			return;
		}
	if(target.classList.contains('decimal'))
	{
		inputDecimal(target.value);
		updateDisplay();
		return;
	}
	if (target.classList.contains('operator'))
	{
	 	handleOperator(target.value);
	 	updateDisplay();
		return;
	}
	if (target.classList.contains('all-clear'))
	{
		resetCalculator();
		updateDisplay();
		return;
	}
	inputDigit(target.value);
	updateDisplay();	
})

function inputDigit(digit) {
	const {displayValue, waitingForSecondOperand} = calculator;
	if(waitingForSecondOperand === true)
	{
		calculator.displayValue = digit;
		calculator.waitingForSecondOperand= false;
	}

	else
	{
		calculator.displayValue = displayValue === '0'? digit : displayValue + digit;
	}
	console.log(calculator);
}

function inputDecimal(dot){
	if (calculator.waitingForSecondOperand === true) return;

	if(!calculator.displayValue.includes(dot))
	{
		const {displayValue} = calculator;
		calculator.displayValue += dot;
	} 
}

//operator
function handleOperator(nextOperator)
{
	const {displayValue, firstOperand, operator} = calculator;
	const inputValue = parseFloat(displayValue);
	
	if(firstOperand === null)
	{
		calculator.firstOperand = inputValue;
	}

	else if (operator !== '**')
	{
		const result = performCalculation[operator](firstOperand,inputValue);
		calculator.displayValue = String(result);
		calculator.firstOperand = result;
	}
	else if (operator === '**'){
		const result = performSquare[operator](firstOperand);

		calculator.displayValue = String(result);
		calculator.firstOperand = result;
		
	}


	calculator.waitingForSecondOperand  = true;
	calculator.operator = nextOperator;

}
const performCalculation = {

	'/': (firstOperand, secondOperand)=> firstOperand/secondOperand,
	'*': (firstOperand, secondOperand)=> firstOperand*secondOperand,
	'+': (firstOperand, secondOperand)=> firstOperand+secondOperand,
	'-': (firstOperand, secondOperand)=> firstOperand-secondOperand,
	'=': (firstOperand, secondOperand)=> secondOperand,
	'x*y':(firstOperand,secondOperand)=>{
		let sol = 1;
		for (let i=1; i<= secondOperand; i++){
			sol = sol*firstOperand;
		}
		return sol;
	} 
};
//reset calculator
const performSquare = {
	'**':(firstOperand)=> firstOperand*firstOperand
};

function resetCalculator(){
	calculator.displayValue = '0';
	calculator.firstOperand = null;
	calculator.waitingForSecondOperand = false;
	calculator.operator = null;
}