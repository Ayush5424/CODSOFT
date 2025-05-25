let output = document.getElementById("output");

function display(num) {
  output.value += num;
}

function isValidExpression(expr) {
  let stack = [];
  for (let char of expr) {
    if (char === '(') stack.push(char);
    else if (char === ')') {
      if (stack.length === 0) return false;
      stack.pop();
    }
  }
  return stack.length === 0;
}

function preprocessExpression(expr) {
  return expr
    .replace(/(\d)\(/g, '$1*(')
    .replace(/\)(\d)/g, ')*$1')
    .replace(/\)\(/g, ')*(')
    .replace(/(\d+)%/g, '($1/100)');
}

function Calculate() {
  try {
    let expression = output.value;

    if (!isValidExpression(expression)) {
      output.value = "Error";
      return;
    }

    expression = preprocessExpression(expression);
    const result = Function('"use strict"; return (' + expression + ')')();
    output.value = Number(result.toFixed(10));
  } catch (err) {
    output.value = "Error";
  }
}

function Clear() {
  output.value = "";
}

function del() {
  output.value = output.value.slice(0, -1);
}

document.addEventListener("keydown", function (event) {
  const key = event.key;

  if (!isNaN(key) || "+-*/().".includes(key)) {
    display(key);
  } else if (key === "Enter") {
    event.preventDefault();
    Calculate();
  } else if (key === "Backspace") {
    del();
  } else if (key === "Escape") {
    Clear();
  } else if (key === "%") {
    display("%");
  }
});
