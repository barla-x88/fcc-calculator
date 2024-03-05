$(document).ready(function () {
  var expr = '';
  var currentNo = '';
  var operator = '';
  var display = $('#display');

  function updateDisplay() {
    display.text(expr + operator + currentNo.replace('-', ''));
    console.log(expr);
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
        if (currentNo.length === 0) currentNo.concat('0');
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
      if (currentNo) {
        //replace multiplication sign
        if (input === 'X') input = '*';
        operator = input;
        expr = expr.concat(currentNo);
        currentNo = '';
      }

      if (!currentNo && input === '-') {
        currentNo = currentNo.concat(input);
      }

      if (expr && currentNo) {
        operator = input;
      }

      updateDisplay();
    }
  });
});
