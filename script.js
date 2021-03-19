let calculateButton = document.getElementById('calculate-button');
let bmiResult = document.getElementById('bmi-result');
let heightInput = document.getElementById('height-input');
let weightInput = document.getElementById('weight-input');

function getBMI(height, weight) {
  let bmi = weight / (height / 100) ** 2;

  let type =
    bmi < 18.5
      ? 'underweight'
      : bmi < 25
      ? 'normal'
      : bmi < 30
      ? 'overweight'
      : bmi >= 30
      ? 'obese'
      : null;

  return { bmi, type };
}

function setColor(color) {
  bmiResult.style.borderColor = `rgba(${color}, 1)`;
  bmiResult.style.backgroundColor = `rgba(${color}, 0.3)`;
}

function calculateBMI() {
  let height = parseFloat(heightInput.value);
  let weight = parseFloat(weightInput.value);
  let { bmi, type } = getBMI(height, weight);
  let color, emoji;
  let error = false;

  // console.log("height: ", height);
  // console.log("weight: ", weight);
  // console.log("bmi: ", bmi);

  if (!isFinite(bmi)) {
    error = true;
  }

  switch (type) {
    case 'underweight':
      color = '1, 176, 241'; // rgb(1, 176, 241)
      emoji = '🍴';
      break;
    case 'normal':
      color = '146, 209, 79'; //rgb(146, 209, 79)
      emoji = '💪';
      break;
    case 'overweight':
      color = '155, 135, 12'; // rgb(155, 135, 12)
      emoji = '❗';
      break;
    case 'obese':
      color = '255, 0, 0'; // rgb(255, 0, 0)
      emoji = '❗❗❗';
      break;
    default:
      error = true;
      color = '222, 226, 230'; // rgb(222, 226, 230)
      console.log('Sorry. There is an error.');
  }

  bmiResult.innerHTML = error
    ? `
      <span id="bmi-value">Something's wrong</span>
      <span id="bmi-value">...</span>
      <span id="bmi-emoji">🤔</span>
      `
    : `
      <span id="bmi-value">${bmi.toFixed(2)}</span>
      <span id="bmi-type" style="color: rgba(${color}, 1)">${type}</span>
      <span id="bmi-emoji">${emoji}</span>
      `;

  setColor(color);
}

let form = document.getElementById('calculator-form');

function validateThenCalculate() {
  if (!heightInput.value) {
    bmiResult.innerHTML = `
    <span id="bmi-value">You forgot to enter your height</span>
    `;
    return;
  }

  if (!weightInput.value) {
    bmiResult.innerHTML = `
    <span id="bmi-value">You forgot to enter your weight</span>
    `;
    return;
  }

  if (!form.checkValidity()) {
    form.classList.add('was-validated');
    bmiResult.innerHTML = `
    <span id="bmi-value">Something's wrong with your height/weight</span>
    <span id="bmi-value">...</span>
    <span id="bmi-emoji">🤔</span>
    `;
    setColor('222, 226, 230');
    return;
  }

  form.classList.remove('was-validated');
  calculateBMI();
}

heightInput.addEventListener('keyup', (event) => {
  if (event.key === 'Enter') {
    validateThenCalculate();
  }
});

weightInput.addEventListener('keyup', (event) => {
  if (event.key === 'Enter') {
    validateThenCalculate();
  }
});

form.onsubmit = validateThenCalculate;
calculateButton.onclick = validateThenCalculate;
heightInput.focus();
