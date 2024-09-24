// Assuming countryList is defined in codes.js
//import { countryList } from './codes.js'; // Ensure this is correct

const BASE_URL = "https://latest.currency-api.pages.dev/v1/currencies";

// A simple array of standard fiat currency codes for filtering
const fiatCurrencies = ["aed", "afn", "usd", "inr", "eur", "gbp", "jpy", "bam"]; // Add more fiat currency codes as needed

// Wait for the DOM to fully load
document.addEventListener("DOMContentLoaded", () => {
  const dropdowns = document.querySelectorAll(".dropdown select");
  const btn = document.querySelector("form button");
  const fromCurr = document.querySelector(".from select");
  const toCurr = document.querySelector(".to select");
  const msg = document.querySelector(".msg");

  // Populate the dropdowns with currency options
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

    // Add event listener to update flag when currency changes
    select.addEventListener("change", (evt) => {
      updateFlag(evt.target);
    });
  }

  // Function to update the exchange rate
  const updateExchangeRate = async () => {
    let amount = document.querySelector(".amount input");
    if (!amount) {
      console.error("Amount input field not found");
      return;
    }

    // Trim the amount value to remove extra spaces
    let amtVal = amount.value.trim();

    // Check if amtVal is empty or not a number
    if (amtVal === "" || isNaN(amtVal) || parseFloat(amtVal) < 1) {
      amtVal = 1; // Default value
      amount.value = "1";
    } else {
      amtVal = parseFloat(amtVal); // Parse to a float for calculations
    }

    const URL = `${BASE_URL}/${fromCurr.value.toLowerCase()}.json`;
    console.log("Fetching URL:", URL);

    try {
      let response = await fetch(URL);
      let data = await response.json();
      console.log("API Data:", data);

      // Extract the rates object for the base currency
      let rates = data[fromCurr.value.toLowerCase()];
      console.log("fron obj", rates);

      // Check if rates exist and if the currency is a fiat currency
      if (rates && fiatCurrencies.includes(toCurr.value.toLowerCase())) {
        let rate = rates[toCurr.value.toLowerCase()]; // Get the exchange rate for the target currency
        console.log("retrive value", rates);
        if (rate) {
          let finalAmount = amtVal * rate;
          msg.innerText = `${amtVal} ${fromCurr.value} = ${finalAmount.toFixed(
            2
          )} ${toCurr.value}`;
        } else {
          msg.innerText = `Exchange rate for ${toCurr.value} not found.`;
        }
      } else {
        msg.innerText = `Exchange rate data not available for ${toCurr.value}.`;
      }
    } catch (error) {
      console.error("Error fetching exchange rate:", error);
      msg.innerText = "Error fetching exchange rate.";
    }
  };

  const updateFlag = (element) => {
    let currCode = element.value;
    let countryCode = countryList[currCode];
    let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`;
    let img = element.parentElement.querySelector("img");
    if (img) {
      img.src = newSrc;
    }
  };

  btn.addEventListener("click", (evt) => {
    evt.preventDefault();
    updateExchangeRate();
  });

  // Optional: Automatically fetch exchange rates on page load
  updateExchangeRate();
});
