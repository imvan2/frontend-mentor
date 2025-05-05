// Cache DOM elements
const form = document.getElementById("calculator");
const resetBtn = document.getElementById("reset");
const tipBtns = document
  .getElementById("tip-percentage")
  .querySelectorAll("button");

const tipTotal = document.getElementById("tip-amount");
const total = document.getElementById("total-amount");
const error = document.getElementById("error");
const billInput = document.getElementById("bill");
const tipInput = document.getElementById("tip");
const peopleInput = document.getElementById("people");

// Global variables to hold state
let tip = 0;
let bill = 0;
let numPeople = 0;
let tipPerPerson = 0;
let billPerPerson = 0;
let activeTipButton = null;

const resetBtnFocus = (btn) => {
  if (btn) {
    btn.classList.remove("selected");
    btn = null;
  }

  return;
};

// Calculate the bill
const calculateBill = (billAmount, tipAmount, totalPeople) => {
  if (billAmount >= 0 && tipAmount >= 0 && totalPeople) {
    tipPerPerson = (billAmount * tipAmount) / totalPeople;
    billPerPerson = (billAmount + tipPerPerson) / totalPeople;

    renderAmounts(tipPerPerson, billPerPerson);
  }
  return;
};

const handleTipBtn = (e) => {
  tip = e.target.value;
  resetBtnFocus(activeTipButton);

  // Add focus to selected button
  activeTipButton = Array.from(tipBtns).filter((btn) => btn.value === tip)[0];
  activeTipButton.classList.add("selected");

  calculateBill(bill, tip, numPeople, tipPerPerson, billPerPerson);
};

tipBtns.forEach((button) => {
  button.addEventListener("click", handleTipBtn);
});

// Handle custom tip input
const handleTipInput = (e) => {
  tip = e.target.value;

  resetBtnFocus(activeTipButton);
};

tipInput.addEventListener("input", handleTipInput);

// Add $ to totals and round up
const renderAmounts = (tipAmount, totalAmount) => {
  tipTotal.innerText = "$" + tipAmount.toFixed(2);
  total.innerText = "$" + totalAmount.toFixed(2);
};

const assignInputs = {
  bill: (value) => (bill = Number(value)),
  tip: (value) => (tip = Number(value) / 100),
  people: (value) => {
    if (value !== "" && Number(value) === 0) {
      error.style.display = "block";
      return console.error("Can't be zero");
    }
    error.style.display = "none";
    numPeople = Number(value);
  },
};

const handleSubmit = (e) => {
  e.preventDefault();
  console.log("e.", e.target.value);

  let value = e.target.value;

  assignInputs[e.target.name](value);

  calculateBill(bill, tip, numPeople, tipPerPerson, billPerPerson);
};

form.addEventListener("input", handleSubmit);

const handleReset = (e) => {
  // Reset form values and totals
  e.preventDefault();

  tip = null;
  bill = null;
  numPeople = null;
  tipPerPerson = 0;
  billPerPerson = 0;

  resetBtnFocus(activeTipButton);
  renderAmounts(tipPerPerson, billPerPerson);

  billInput.value = "";
  tipInput.value = "";
  peopleInput.value = "";
};

resetBtn.addEventListener("click", handleReset);
