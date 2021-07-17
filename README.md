# Concolor

[![ci status](https://github.com/metarhia/concolor/workflows/Testing%20CI/badge.svg)](https://github.com/metarhia/concolor/actions?query=workflow%3A%22Testing+CI%22+branch%3Amaster)
[![codacy](https://api.codacy.com/project/badge/Grade/6f4f133090d64f178d099f86521ec117)](https://www.codacy.com/app/metarhia/concolor)
[![snyk](https://snyk.io/test/github/metarhia/impress/badge.svg)](https://snyk.io/test/github/metarhia/impress)
[![npm version](https://badge.fury.io/js/concolor.svg)](https://badge.fury.io/js/concolor)
[![npm downloads/month](https://img.shields.io/npm/dm/concolor.svg)](https://www.npmjs.com/package/concolor)
[![npm downloads](https://img.shields.io/npm/dt/concolor.svg)](https://www.npmjs.com/package/concolor)

Concolor is a simple library for Node.js for coloring templated strings using
tags with annotations

## Usage

- Install: `npm install concolor`
- Require: `const concolor = require('concolor');`
- Now you have 4 use cases:
  - [string template tag](#string-tag)
  - [tag factory](#tag-factory)
  - [style function](#style-function)
  - [themes](#themes)

## String tag

```js
console.log(concolor`text ${expression}(styles)`);
```

Examples:

```javascript
console.log(concolor`Ave ${'World'}(blue) blue`);
console.log(concolor`Ave ${'World'}(/red) on red`);
console.log(concolor`Ave ${'World'}(white/yellow,b) bold white on yellow`);
console.log(concolor`Ave ${'World'}(b) bold`);
console.log(concolor`Ave ${'World'}(b,/blue) bold on blue`);
console.log(concolor`Ave ${'World'}(b,u,yellow) bold underline yellow`);
console.log(concolor`Ave ${'World'}(blue,u) blue underline`);
console.log(concolor`Ave ${'World'}(b,black/green) bold black on green`);

console.log(concolor`
  Client on ${'192.168.1.1'}(black/green)
  connected to ${'SERVER'}(b,red)
  at ${new Date().toUTCString()}(b,blue)
`);
```

## Tag factory

```js
const tag = concolor(styles);
console.log(tag`text`);
```

Examples:

```javascript
const warn = concolor('b,yellow');
const err = concolor('b,yellow/red');
const inf = concolor('i,white');

console.log(warn`test1 ${'text2'} text3`);
console.log(err`test4 ${'text5'} text6`);
console.log(inf`test7 ${'text8'} text9`);
```

## Style function

```js
const style = concolor(styles);
console.log(style('text'));
```

Examples:

```javascript
const warn = concolor('b,yellow');
const err = concolor('b,yellow/red');
const inf = concolor('i,white');

console.log(warn(`test1 ${'text2'} text3`));
console.log(err(`test4 ${'text5'} text6`));
console.log(inf(`test7 ${'text8'} text9`));
```

## Themes

```js
const theme = concolor({
  caption: 'b,white',
  text: 'green',
  link: 'u,yellow',
});

const caption = 'Caption';
const text = 'Here is a text';
const link = 'http://metarhia.com';

console.log(theme`  ${{ caption }}
  ${{ text }}
  ${{ link }}`);
```

## Themes as functions

```js
const theme = concolor({
  caption: 'b,white',
  text: 'green',
  link: 'u,yellow',
});

console.log(theme.caption('Caption example'));
```

## License & Contributors

Copyright (c) 2017-2021 [Metarhia contributors](https://github.com/metarhia/concolor/graphs/contributors).
Concolor is [MIT licensed](./LICENSE).\
Concolor is a part of [Metarhia](https://github.com/metarhia) technology stack.
