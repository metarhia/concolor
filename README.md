# Concolor

[![TravisCI](https://travis-ci.org/metarhia/concolor.svg?branch=master)](https://travis-ci.org/metarhia/concolor)
[![bitHound](https://www.bithound.io/github/metarhia/concolor/badges/score.svg)](https://www.bithound.io/github/metarhia/concolor)
[![Codacy Badge](https://api.codacy.com/project/badge/Grade/6f4f133090d64f178d099f86521ec117)](https://www.codacy.com/app/metarhia/concolor)
[![NPM Version](https://badge.fury.io/js/concolor.svg)](https://badge.fury.io/js/concolor)
[![NPM Downloads/Month](https://img.shields.io/npm/dm/concolor.svg)](https://www.npmjs.com/package/concolor)
[![NPM Downloads](https://img.shields.io/npm/dt/concolor.svg)](https://www.npmjs.com/package/concolor)

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

## Create semantic template tags

```javascript
const warn = concolor('b,yellow');
const err = concolor('b,yellow/red');
const inf = concolor('i,white');

console.log(warn`test1 ${'text2'} text3`);
console.log(err`test4 ${'text5'} text6`);
console.log(inf`test7 ${'text8'} text9`);
```

## Contributors

Copyright (c) 2017 [concolor contributors](https://github.com/metarhia/concolor/graphs/contributors)
