'use strict';

const { test } = require('node:test');
const assert = require('node:assert');
const concolor = require('../concolor.js');

test('API consistency', async (t) => {
  await t.test('all predefined methods exist and are functions', () => {
    const methods = [
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

    methods.forEach((method) => {
      assert(
        typeof concolor[method] === 'function',
        `${method} should be a function`,
      );
    });
  });

  await t.test('all methods return strings', () => {
    const methods = [
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

    methods.forEach((method) => {
      const result = concolor[method]('test');
      assert(typeof result === 'string', `${method} should return a string`);
      assert(
        result.includes('test'),
        `${method} should include the input text`,
      );
      assert(result.includes('\x1b[0m'), `${method} should include reset code`);
    });
  });

  await t.test('style methods apply correct styles', () => {
    const boldResult = concolor.b('test');
    const italicResult = concolor.i('test');
    const underlineResult = concolor.u('test');
    const emphasisResult = concolor.em('test');

    assert(boldResult.includes('\x1b[0m'));
    assert(italicResult.includes('\x1b[0m'));
    assert(underlineResult.includes('\x1b[0m'));
    assert(emphasisResult.includes('\x1b[0m'));
  });

  await t.test('semantic methods apply correct styles', () => {
    const errorResult = concolor.error('test');
    const infoResult = concolor.info('test');
    const warnResult = concolor.warn('test');
    const debugResult = concolor.debug('test');
    const successResult = concolor.success('test');
    const failResult = concolor.fail('test');

    assert(errorResult.includes('\x1b[0m'));
    assert(infoResult.includes('\x1b[0m'));
    assert(warnResult.includes('\x1b[0m'));
    assert(debugResult.includes('\x1b[0m'));
    assert(successResult.includes('\x1b[0m'));
    assert(failResult.includes('\x1b[0m'));
  });

  await t.test('color methods apply correct colors', () => {
    const colorMethods = [
      'red',
      'green',
      'yellow',
      'blue',
      'magenta',
      'cyan',
      'white',
    ];

    colorMethods.forEach((color) => {
      const result = concolor[color]('test');
      assert(typeof result === 'string');
      assert(result.includes('test'));
      assert(result.includes('\x1b[0m'));
    });
  });
});

test('theme object structure', async (t) => {
  await t.test('theme creation returns object with methods', () => {
    const theme = concolor({
      title: 'b,blue',
      body: 'white',
      link: 'u,cyan',
    });

    assert(typeof theme === 'function');
    assert(typeof theme.title === 'function');
    assert(typeof theme.body === 'function');
    assert(typeof theme.link === 'function');
  });

  await t.test('theme methods work correctly', () => {
    const theme = concolor({
      title: 'b,blue',
      body: 'white',
    });

    const titleResult = theme.title('Title');
    const bodyResult = theme.body('Body text');

    assert(typeof titleResult === 'string');
    assert(typeof bodyResult === 'string');
    assert(titleResult.includes('Title'));
    assert(bodyResult.includes('Body text'));
    assert(titleResult.includes('\x1b[0m'));
    assert(bodyResult.includes('\x1b[0m'));
  });

  await t.test('theme with complex styles', () => {
    const theme = concolor({
      error: 'b,red/white',
      warning: 'b,yellow',
      info: 'i,blue',
    });

    const errorResult = theme.error('Error message');
    const warningResult = theme.warning('Warning message');
    const infoResult = theme.info('Info message');

    assert(typeof errorResult === 'string');
    assert(typeof warningResult === 'string');
    assert(typeof infoResult === 'string');
    assert(errorResult.includes('Error message'));
    assert(warningResult.includes('Warning message'));
    assert(infoResult.includes('Info message'));
  });
});

test('function signature consistency', async (t) => {
  await t.test('main function accepts template literals', () => {
    const result = concolor`Hello ${'World'}(red)`;
    assert(typeof result === 'string');
    assert(result.includes('Hello'));
    assert(result.includes('World'));
    assert(result.includes('\x1b[31m'));
    assert(result.includes('\x1b[0m'));
  });

  await t.test('main function accepts string parameter', () => {
    const result = concolor('red');
    assert(typeof result === 'function');
  });

  await t.test('main function accepts object parameter', () => {
    const result = concolor({ test: 'red' });
    assert(typeof result === 'function');
  });

  await t.test('main function accepts two string parameters', () => {
    const result = concolor('red', 'test');
    assert(typeof result === 'function');
  });
});
