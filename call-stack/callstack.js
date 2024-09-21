"use strict";

const funA = () => {
    const a = 10;
    console.info(`funA: ${this}`);
    const b = funB(a);
    const sum = a + b;
    return sum;
}

const funB = (a) => {
    const b = 20;
    console.info(`funB: ${this}`);
    console.info(`funB Global: ${globalThis}`);
    console.info(`funB Same: ${this === globalThis}`);

    return b;
}

const main = () => {
    console.info(this);
    funA();
}

// Q1. Scope? global
// Q2. Global this? 전역 객체, windows, global(nodejs)
console.info(this);
console.info(globalThis);
console.info(this === globalThis);
console.info();
main();
