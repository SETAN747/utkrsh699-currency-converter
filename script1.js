const BASE_URL = "https://api.exchangerate-api.com/v4/latest";



// For selecting different controls
const dropdowns = document.querySelectorAll(".selection-menu");
const btn = document.querySelector(".exchangebtn");
const fromCurr = document.querySelector(".from select");
const toCurr = document.querySelector(".to select");
const amountInput = document.querySelector(".amount input");
const msg = document.querySelector(".msg");

// Populate dropdowns with currency options
for (let select of dropdowns) {
  for (let currCode in countryList) {
    let newOption = document.createElement("option");
    newOption.innerText = currCode;
    newOption.value = currCode;
    if (select.name === "from" && currCode === "USD") {
      newOption.selected = "selected";
    } else if (select.name === "to" && currCode === "INR") {
      newOption.selected = "selected";
    }
    select.append(newOption);
  }

  select.addEventListener("change", (evt) => {
    updateFlag(evt.target);
  });
}

// Function to update exchange rate
const updateExchangeRate = async () => {
  let amtVal = amountInput.value;
  if (amtVal === "" || amtVal < 1) {
    amtVal = 1;
    amountInput.value = "1";
  }
  const URL = `${BASE_URL}/${fromCurr.value}`;
  let response = await fetch(URL);
  let data = await response.json();
  let rate = data.rates[toCurr.value];

  let finalAmount = amtVal * rate;
  msg.innerText = `${amtVal} ${fromCurr.value} = ${finalAmount.toFixed(2)} ${toCurr.value}`;
};

// Function to update the flag icon
const updateFlag = (element) => {
  let currCode = element.value;
  let countryCode = countryList[currCode];
  let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`;
  let img = element.parentElement.querySelector("img");
  if (img) {
    img.src = newSrc;
  }

  // Update the text above the dropdown
  let textElem = element.parentElement.querySelector("p");
  if (textElem) {
    textElem.innerText = currCode;
  }
};

// Event listener for the button
btn.addEventListener("click", (evt) => {
  evt.preventDefault();
  updateExchangeRate();
});

// Update exchange rate on page load
window.addEventListener("load", () => {
  updateExchangeRate();
});

// Include event listeners for amount input
amountInput.addEventListener("input", () => {
  if (amountInput.value === "" || amountInput.value < 1) {
    amountInput.value = "1";
  }
});
