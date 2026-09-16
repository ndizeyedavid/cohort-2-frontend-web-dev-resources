const input = require("sync-input");
const currencies = {
  USD: 1,
  JPY: 113.5,
  EURO: 0.89,
  RUB: 74.36,
  GBP: 0.75,
};

function currencyConvertor(amount, fromCurrency, toCurrency) {
  return (amount * currencies[fromCurrency]) / currencies[toCurrency];
}

console.log("Welcome to Mellow Currency Converter");
console.log(
  `Currencies we convert: \nUSD : ${currencies.USD}\nJPY : ${currencies.JPY}\nEURO : ${currencies.EURO}\nGBP : ${currencies.GBP}\nRUB : ${currencies.RUB}\n`,
);

let fromCurr = input("Currency From: ").toUpperCase();
let toCurr = input("Currency To: ").toUpperCase();

let myAmount = Number(input("My Ammount: "));

// console.log(typeof myAmount);
// console.log(currencyConvertor(myAmount, 1, 2.3));

console.log(
  `Converted Amount of ${myAmount} ${fromCurr} is: ${currencyConvertor(myAmount, fromCurr, toCurr)} ${toCurr}`,
);
