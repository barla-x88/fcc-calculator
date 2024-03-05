$(document).ready(function () {
  var expr = '';
  var currentNo = '';
  var operator = '';
  var display = $('#display');

  function updateDisplay() {
    display.text(expr + operator + currentNo);
    console.log('current  No', currentNo);
    console.log('expr', expr);
  }

  $('button').on('click', function () {
    var input = $(this).text();

    //handle Number Input
    if (input == '.' || isFinite(input)) {
      //add operator to expr
      if (operator) {
        expr = expr.concat(operator);
        operator = '';
      }

      //handle zeros
      if (Number(input) === 0 && currentNo.length > 0) {
        currentNo = currentNo.concat(input);
        updateDisplay();
      }

      if (Number(input) >= 1) {
        currentNo = currentNo.concat(input);
        updateDisplay();
      }

      if (input === '.' && !currentNo.includes('.')) {
        if (currentNo.length === 0) currentNo = currentNo.concat('0');
        currentNo = currentNo.concat(input);
        updateDisplay();
      }
    }

    //handle clear button press
    if (input === 'AC') {
      expr = '';
      currentNo = '';
      operator = '';
      display.text('0');
    }

    //handle mathematical opeartions
    if (input === '+' || input === '-' || input === 'X' || input === '/') {
      if (
        (currentNo !== '' || expr !== '') &&
        (input === '+' || input === 'X' || input === '/')
      ) {
        expr = expr.concat(currentNo);

        currentNo = '';
        operator = input;
        updateDisplay();
      }

      if (currentNo !== '' && input === '-') {
        expr = expr.concat(currentNo);
        currentNo = '';
        operator = input;
        updateDisplay();
      }

      if (expr.endsWith('-') && input === '+') {
        expr = expr.concat(currentNo).slice(0, expr.length - 1);
        currentNo = '';
        operator = input;
        updateDisplay();
      }

      if (currentNo === '' && input === '-' && operator !== '-') {
        currentNo = currentNo.concat(input);
        updateDisplay();
      }
    }

    //handle equal button

    if (input === '=') {
      expr = expr.concat(currentNo).replace('X', '*');
      expr = String(eval(expr));
      currentNo = '';
      operator = '';
      updateDisplay();
    }
  });
});
