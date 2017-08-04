## Concolor

Concolor is a simple library for Node.js for coloring templated strings using
tags with annotations

## Usage

- Install: `npm install concolor`
- Require: `const concolor = require('concolor');`
- Place tag `concolor` before templated string to apply coloring on that string,
example:
```javascript
console.log(concolor`Hello ${'World'}(black/green) black on green`);
```

## Examples:

Use anotations in brackets after templated string to add bold or underlined
style to string or to change foreground or background color of a templated
string, like in examples:

```javascript
console.log(concolor`Hello ${'World'}(blue) blue`);
console.log(concolor`Hello ${'World'}(/red) on red`);
console.log(concolor`Hello ${'World'}(white/yellow,b) bold white on yellow`);
console.log(concolor`Hello ${'World'}(b) bold`);
console.log(concolor`Hello ${'World'}(b,/blue) bold on blue`);
console.log(concolor`Hello ${'World'}(b,u,yellow) bold underline yellow`);
console.log(concolor`Hello ${'World'}(blue,u) blue underline`);
console.log(concolor`Hello ${'World'}(b,black/green) bold black on green`);
```

```javascript
console.log(concolor`
  Client on ${'192.168.1.1'}(black/green)
  connected to ${'SERVER'}(b,red)
  at ${new Date().toUTCString()}(b,blue)
`);
```
