const add = (a, b) => a + b;
const sub = (a, b) => a - b;
const alter = (ftn, param) => param ? sub : add;

const sum = alter(add, 1)(5,3);
sum
