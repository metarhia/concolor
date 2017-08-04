'use strict';

const concolor = require('./concolor.js');

console.log(concolor`Hello ${'World'}(i,black/green) black on green`);
console.log(concolor`Hello ${'World'}(blue) blue`);
console.log(concolor`Hello ${'World'}(/red) on red`);
console.log(concolor`Hello ${'World'}(white/yellow,b) bold white on yellow`);
console.log(concolor`Hello ${'World'}(b,i) bold italic`);
console.log(concolor`Hello ${'World'}(b,/blue) bold on blue`);
console.log(concolor`Hello ${'World'}(b,u,yellow) bold underline yellow`);
console.log(concolor`Hello ${'World'}(blue,u) blue underline`);
console.log(concolor`Hello ${'World'}(b,black/green) bold black on green`);

console.log(concolor`
  ${'b for bold'}(b),
  ${'f for faint'}(f),
  ${'i for italic'}(i),
  ${'u for underline'}(u),
  ${'l for blink slow'}(l),
  ${'h for blink rapid'}(h),
  ${'n for negative'}(n)
  ${'s for strikethrough'}(s)`
);

console.log(concolor`
  Client on ${'192.168.1.1'}(black/white)
  connected to ${'SERVER'}(n,b,red)
  at ${new Date().toUTCString()}(i,b,blue)
`);
