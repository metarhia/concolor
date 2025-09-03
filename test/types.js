'use strict';

const { test } = require('node:test');
const assert = require('node:assert');
const concolor = require('../concolor.js');

test('TypeScript type validation', async (t) => {
  await t.test('TagFunction type validation', () => {
    const tagFunction = concolor('red');
    assert(typeof tagFunction === 'function');

    const result = tagFunction`Hello ${'World'}`;
    assert(typeof result === 'string');
    assert(result.includes('Hello World'));
    assert(result.includes('\x1b[0m'));
  });

  await t.test('Concolor interface validation', () => {
    const interfaceMethods = [
      'b',
      'i',
      'u',
      'em',
      'error',
      'info',
      'warn',
      'debug',
      'success',
      'fail',
      'red',
      'green',
      'yellow',
      'blue',
      'magenta',
      'cyan',
      'white',
    ];

    interfaceMethods.forEach((method) => {
      assert(
        typeof concolor[method] === 'function',
        `${method} should be a function`,
      );

      const result = concolor[method]('test');
      assert(typeof result === 'string', `${method} should return a string`);
    });
  });

  await t.test('function overload validation', () => {
    const result1 = concolor`Hello ${'World'}(red)`;
    assert(typeof result1 === 'string');
    assert(result1.includes('Hello \x1B[31mWorld\x1B[0m'));

    const result2 = concolor('red');
    assert(typeof result2 === 'function');

    const result3 = concolor({ test: 'red' });
    assert(typeof result3 === 'function');
    assert(typeof result3.test === 'function');

    const result4 = concolor('red', 'test');
    assert(typeof result4 === 'function');
  });

  await t.test('theme object type validation', () => {
    const theme = concolor({
      title: 'b,blue',
      body: 'white',
      link: 'u,cyan',
    });

    assert(typeof theme === 'function');
    assert(theme !== null);

    assert(typeof theme.title === 'function');
    assert(typeof theme.body === 'function');
    assert(typeof theme.link === 'function');

    const titleResult = theme.title('Title');
    const bodyResult = theme.body('Body');
    const linkResult = theme.link('Link');

    assert(typeof titleResult === 'string');
    assert(typeof bodyResult === 'string');
    assert(typeof linkResult === 'string');
  });

  await t.test('Record type validation', () => {
    const themeConfig = {
      style1: 'red',
      style2: 'blue',
      style3: 'green',
    };

    const theme = concolor(themeConfig);
    assert(typeof theme === 'function');

    Object.keys(themeConfig).forEach((key) => {
      assert(typeof theme[key] === 'function');
      const result = theme[key]('test');
      assert(typeof result === 'string');
      assert(result.includes('test'));
    });
  });

  await t.test('unknown type validation', () => {
    const testValues = [
      'string',
      123,
      true,
      false,
      null,
      undefined,
      { key: 'value' },
      [1, 2, 3],
      () => 'function',
    ];

    testValues.forEach((value) => {
      const result = concolor`Value: ${value}(red)`;
      assert(typeof result === 'string');
      assert(result.includes('Value:'));
      assert(result.includes('\x1b[0m'));
    });
  });
});
