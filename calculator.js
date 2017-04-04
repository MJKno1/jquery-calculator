var nums = document.getElementsByClassName('nums'),
  display = document.getElementById('total'),
  calcs = document.getElementById('calculation'),
  clear = document.getElementsByClassName('clear'),
  dot = document.getElementById('dot'),
  equals = document.getElementById('equals'),
  ops = document.getElementsByClassName('ops');

var hasDot = false,
  hasOp = false;
var first = '',
  second = '',
  operator = '';
var firstArr = [],
  secondArr = [];
var res = '';

//clear all inputs
function clearInput() {
  firstArr = [];
  secondArr = [];
  hasDot = false;
  hasOp = false;
  operator = '';
  first = '';
  second = '';
  res = '';
}

//check if there is an operator
function checkOp() {
  var checker = hasOp ? true : false;
  return checker;
}

function checkArr(arr) {
  if (arr.length >= 15) {
    arr.shift();
  }
  hasDot = arr.indexOf('.') === -1 ? false : true;
}

//check if there is a decimal pont
function checkDot(arr) {
  // if hasDot = true  
  if (!hasDot) {
    checkArr(arr);
    arr.push(".");
    hasDot = true;
    if (arr.length === 1) {
      arr.unshift("0");
    }
    displayNum();
  }
  return true;
}

//display numbers
function displayNum() {
  first = firstArr.join("");
  second = secondArr.join("");
  if (firstArr.length === 0) {
    display.innerHTML = '0';
    calcs.innerHTML = '0';
    return true;
  }
  if (checkOp() && secondArr.length !== 0) {
    display.innerHTML = second;
  } else {
    display.innerHTML = first;
  }
  calculation.innerHTML = first + operator + second;
}

//calculation
function compute() {
  if (secondArr.length === 0) {
    return true;
  }
  first = firstArr.indexOf('.') === -1 ? parseInt(first) : parseFloat(first);
  second = secondArr.indexOf('.') === -1 ? parseInt(second) : parseFloat(second);
  switch (operator) {
    case '+':
      res = first + second;
      break;
    case '-':
      res = (first - second);
      break;
    case '*':
      res = (first * second);
      break;
    case '/':
      if (second === 0) {
        display.innerHTML = "&infin;";
        clearInput();
        return true;
      }
      res = (first / second);
      break;
  }
  if (res % 1 > 0) {
    res = parseFloat(res.toFixed(3));
  }
  var temp = res;
  clearInput();
  res = temp;
  firstArr = res.toString().split('');
  displayNum();
}

//get numeric value from button pressed by user
var getNum = function () {
  var num = this.getAttribute("data-nums");
  if (res !== "" && hasOp === false) {
    res = "";
    firstArr = [];
  }
  if (!checkOp()) {
    checkArr(firstArr);
    if (num === '0' && firstArr.length === 0) {
      return true;
    }
    firstArr.push(num);
  } else {
    checkArr(secondArr);
    if (num === '0' && secondArr[0] === '0' && secondArr.length === 1) {
      return true;
    }
    secondArr.push(num);
  }
  displayNum();
}

var clearNum = function () {
  var clr = this.getAttribute("data-clear");
  if (clr === "deleteAll") {
    clearInput();
    displayNum();
  } else {
    if (checkOp()) {
      if (secondArr.length === 0) {
        operator = "";
        hasOp = false;
      } else {
        secondArr.pop();
        hasDot = secondArr.indexOf('.') === -1 ? false : true;
      }
      displayNum();
    } else {
      firstArr.pop();
      hasDot = firstArr.indexOf('.') === -1 ? false : true;
      displayNum();
    }
  }
};

function addOp() {
  if (firstArr.length === 0) {
    firstArr.push(0);
  }
  //chained operation
  if (secondArr.length !== 0 && parseInt(secondArr.join(""))) {
    compute();
  }
  operator = this.getAttribute("data-ops");
  hasOp = true;
  displayNum();
}

//start calculation
(function start() {
  //for number inputs
  for (var i = 0; i < nums.length; i++) {
    nums[i].onclick = getNum;
  }

  //for delete button
  for (var i = 0; i < clear.length; i++) {
    clear[i].onclick = clearNum;
  }

  //for operator inputs
  for (var i = 0; i < ops.length; i++) {
    ops[i].onclick = addOp;
  }

  //for equals sign
  equals.addEventListener("click", function () {
    compute();
  });

  //decimal point
  dot.addEventListener("click", function () {
    if (checkOp()) {
      checkDot(secondArr);
    } else {
      checkDot(firstArr);
    }
  });
})()