'use strict';

const concolor = require('./concolor.js');
const color = concolor.color;

console.log(color`Hello ${'World'}(black/green) black on green`);
console.log(color`Hello ${'World'}(blue) blue`);
console.log(color`Hello ${'World'}(/red) on red`);
console.log(color`Hello ${'World'}(white/yellow,b) bold white on yellow`);
console.log(color`Hello ${'World'}(b) bold`);
console.log(color`Hello ${'World'}(b,/blue) bold on blue`);
console.log(color`Hello ${'World'}(b,u,yellow) bold underline yellow`);
console.log(color`Hello ${'World'}(blue,u) blue underline`);
console.log(color`Hello ${'World'}(b,black/green) bold black on green`);

console.log(color`
  Client on ${'192.168.1.1'}(black/green)
  connected to ${'SERVER'}(b,red)
  at ${new Date().toUTCString()}(b,blue)
`);
