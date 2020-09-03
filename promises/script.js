"use strict";

let drink = 1;
const shoot = (arrow) => {
    console.log("You've shout");

    let promise = new Promise((resolve, reject) => {
        setTimeout(() => {
            Math.random() > 0.5 ? resolve({}) : reject("You промахнулись");
        }, 1000);
    });
    return promise;
};

const win = () => {
    console.log("win");
    drink === 1 ? buyBear() : giveMoney();
};
const lose = () => {
    console.log("lose");
};

shoot({})
    .then((mark) => {
        console.log("Попали в цель");
    })
    .then(win)
    .catch((err) => {
        console.log(err);
        lose();
    });

const buyBear = () => {
    console.log("Вам купили пиво");
};
const giveMoney = () => {
    console.log("Just money");
};
