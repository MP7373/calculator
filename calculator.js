var currentScreen;
var currentValue = null;
var expressionInQueue = false;
var operator = null;
var decimalInCurrentScreen = false;
var screen = document.getElementById("screen");
var val = document.getElementById("val");

window.onload = function() {
  allClear();
};

function updateScreen() {
  if(currentScreen >= 100000000) {
    allClear();
    screen.innerHTML = "Overflow";
  } else if (currentScreen == null) {
    screen.innerHTML = "0";
  } else {
    screen.innerHTML = currentScreen;
  }
}

function displayValue() {
  if(currentValue >= 100000000) {
    allClear();
    screen.innerHTML = "Overflow";
  } else {
    screen.innerHTML = currentValue;
  }
}

function allClear() {
  currentScreen = null;
  decimalInCurrentScreen = false;
  currentValue = null;
  expressionInQueue = false;
  updateScreen();
}

function screenClear() {
  currentScreen = null;
  decimalInCurrentScreen = false;
  updateScreen();
}

function evaluateExpression() {
  switch(operator) {
    case "+":
      currentValue = Math.round((currentValue + parseFloat(currentScreen)) * 100) / 100;
      break;
    case "-":
      currentValue = Math.round((currentValue - parseFloat(currentScreen)) * 100) / 100;
      break;
    case "x":
      currentValue = Math.round((currentValue * parseFloat(currentScreen)) * 100) / 100;
      break;
    case "÷":
      currentValue = Math.round((currentValue / parseFloat(currentScreen)) * 100) / 100;
  }
  expressionInQueue = false;
}

function equals() {
  if (expressionInQueue && currentScreen != null) {
    evaluateExpression();
    currentScreen = currentValue.toString();
    updateScreen();
    currentScreen = null;
    decimalInCurrentScreen = false;
  } else if (expressionInQueue && currentScreen == null) {
    expressionInQueue = false;
    operator = null;
    currentScreen = null;
    decimalInCurrentScreen = false;
    displayValue();
  }
}

function operatorPress(op) {
  if (expressionInQueue && currentScreen != null) {
    evaluateExpression();
    operator = op;
    currentScreen = null;
    decimalInCurrentScreen = false;
    expressionInQueue = true;
  } else {
    if (currentValue == null && currentScreen != null) {
      currentValue = parseFloat(currentScreen);
      currentScreen = null;
      decimalInCurrentScreen = false;
      operator = op;
      expressionInQueue = true;
    } else if (currentValue != null && currentScreen == null) {
      operator = op;
      currentScreen = null;
      decimalInCurrentScreen = false;
      expressionInQueue = true;
    } else if (currentValue != null && currentScreen != null) {
      operator = op;
      currentValue = parseFloat(currentScreen);
      currentScreen = null;
      decimalInCurrentScreen = false;
      expressionInQueue = true;
    }
  }
  displayValue();
}

function numberPress(num) {
  if (currentScreen == null) {
    if (num != 0) {
      currentScreen = num.toString();
    }
  } else {
    currentScreen += num.toString();
  }
  updateScreen();
}

function dotPress() {
  if (decimalInCurrentScreen == false) {
    currentScreen += ".";
    updateScreen();
    decimalInCurrentScreen = true;
  }
}