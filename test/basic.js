'use strict';

const { test } = require('node:test');
const assert = require('node:assert');

const concolor = require('../concolor.js');

const EXAMPLES = [
  [
    'italic black on green',
    () => concolor`Hello ${'World'}(i,black/green) end`,
    'Hello \x1b[3;30;42mWorld\x1b[0m end',
  ],
  [
    'blue color',
    () => concolor`Hello ${'World'}(blue) blue`,
    'Hello \x1b[34mWorld\x1b[0m blue',
  ],
  [
    'on red background',
    () => concolor`Hello ${'World'}(/red) on red`,
    'Hello \x1b[41mWorld\x1b[0m on red',
  ],
  [
    'bold white on yellow',
    () => concolor`Hello ${'World'}(white/yellow,b)`,
    'Hello \x1b[37;43;1mWorld\x1b[0m',
  ],
  [
    'bold italic',
    () => concolor`Hello ${'World'}(b,i) bold italic`,
    'Hello \x1b[1;3mWorld\x1b[0m bold italic',
  ],
  [
    'bold on blue background',
    () => concolor`Hello ${'World'}(b,/blue)`,
    'Hello \x1b[1;44mWorld\x1b[0m',
  ],
  [
    'bold underline yellow',
    () => concolor`Hello ${'World'}(b,u,yellow)`,
    'Hello \x1b[1;4;33mWorld\x1b[0m',
  ],
  [
    'blue underline',
    () => concolor`Hello ${'World'}(blue,u) (x)`,
    'Hello \x1b[34;4mWorld\x1b[0m (x)',
  ],
  [
    'bold black on green',
    () => concolor`Hello ${'World'}(b,black/green)`,
    'Hello \x1b[1;30;42mWorld\x1b[0m',
  ],
];

test('basic styling examples', async (t) => {
  for (const [name, render, expected] of EXAMPLES) {
    await t.test(name, () => {
      assert.strictEqual(render(), expected);
    });
  }
});

test('style examples', async (t) => {
  await t.test('all ANSI styles', () => {
    const result = concolor`
      ${'b for bold'}(b),
      ${'f for faint'}(f),
      ${'i for italic'}(i),
      ${'u for underline'}(u),
      ${'l for blink slow'}(l),
      ${'h for blink rapid'}(h),
      ${'n for negative'}(n)
      ${'s for strikethrough'}(s)`;

    assert(typeof result === 'string');
    assert(result.includes('b for bold'));
    assert(result.includes('f for faint'));
    assert(result.includes('i for italic'));
    assert(result.includes('u for underline'));
    assert(result.includes('l for blink slow'));
    assert(result.includes('h for blink rapid'));
    assert(result.includes('n for negative'));
    assert(result.includes('s for strikethrough'));
  });
});

test('complex examples', async (t) => {
  await t.test('complex styling with variables', () => {
    const result = concolor`
      Client on ${'192.168.1.1'}(black/white)
      connected to ${'SERVER'}(n,b,red)
      at ${new Date().toUTCString()}(i,b,blue)
      and variable with no style: ${'abc'}
    `;

    assert(typeof result === 'string');
    assert(result.includes('Client on'));
    assert(result.includes('192.168.1.1'));
    assert(result.includes('connected to'));
    assert(result.includes('SERVER'));
    assert(result.includes('and variable with no style:'));
    assert(result.includes('abc'), 'unstyled interpolation should be included');
    assert(result.includes('\x1b[0m'));
  });

  await t.test('unstyled interpolations are preserved', () => {
    const result = concolor`plain ${'value'} end`;
    assert.strictEqual(result, 'plain value end');
  });
});

test('semantic template tags', async (t) => {
  await t.test('custom tag functions', () => {
    const warn = concolor('b,yellow');
    const err = concolor('b,yellow/red');
    const inf = concolor('i,white');

    const result1 = warn`test1 ${'text2'} text3`;
    const result2 = err`test4 ${'text5'} text6`;
    const result3 = inf`test7 ${'text8'} text9`;

    assert(typeof result1 === 'string');
    assert(typeof result2 === 'string');
    assert(typeof result3 === 'string');
    assert(result1.includes('test1 text2 text3'));
    assert(result2.includes('test4 text5 text6'));
    assert(result3.includes('test7 text8 text9'));
  });
});

test('tag as function', async (t) => {
  await t.test('direct function calls', () => {
    const warn = concolor('b,yellow');
    const err = concolor('b,yellow/red');
    const inf = concolor('i,white');

    const result1 = warn(`test1 ${'text2'} text3`);
    const result2 = err(`test4 ${'text5'} text6`);
    const result3 = inf(`test7 ${'text8'} text9`);

    assert(typeof result1 === 'string');
    assert(typeof result2 === 'string');
    assert(typeof result3 === 'string');
    assert(result1.includes('test1 text2 text3'));
    assert(result2.includes('test4 text5 text6'));
    assert(result3.includes('test7 text8 text9'));
  });
});

test('themes', async (t) => {
  await t.test('theme creation and usage', () => {
    const theme = concolor({
      caption: 'b,white',
      text: 'green',
      link: 'u,yellow',
    });

    const result = theme`  ${{ caption: 'Caption' }}
      ${{ text: 'Here is a text' }}
      ${{ link: 'http://metarhia.com' }}`;

    assert(typeof result === 'string');
    assert(result.includes('Caption'));
    assert(result.includes('Here is a text'));
    assert(result.includes('http://metarhia.com'));
  });

  await t.test('theme as functions', () => {
    const theme = concolor({
      caption: 'b,white',
      text: 'green',
      link: 'u,yellow',
    });

    const result = theme.caption('Caption example');
    assert(typeof result === 'string');
    assert(result.includes('Caption example'));
    assert(result.includes('\x1b[0m'));
  });
});
