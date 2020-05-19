'use strict';

let money = prompt("Ваш бюджет на месяц?");
let time = prompt("Введите дату в формате YYYY-MM-DD");
let expensesField = prompt("Введите обязательную статью расходов в этом месяце");
let expenses = prompt("Во сколько обойдется?");

let appData = {
    budget: money,
    timeData: time,
    expenses:{
        [expensesField]: expenses
    },
    optionalExpenses:{

    },
    income:[],
    savings: false
};

alert(money/30);

console.log(appData)
