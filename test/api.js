'use strict';

const { test } = require('node:test');
const assert = require('node:assert');

const concolor = require('../concolor.js');

const CODES = {
  b: '1',
  i: '3',
  u: '4',
  em: '1',
  error: '1;31',
  info: '1;32',
  warn: '1;33',
  debug: '1;34',
  success: '1;32',
  fail: '1;31',
  black: '30',
  red: '31',
  green: '32',
  yellow: '33',
  blue: '34',
  magenta: '35',
  cyan: '36',
  white: '37',
};

const METHODS = Object.keys(CODES);

test('API consistency', async (t) => {
  await t.test('all predefined methods exist and are functions', () => {
    METHODS.forEach((method) => {
      assert(
        typeof concolor[method] === 'function',
        `${method} should be a function`,
      );
    });
  });

  await t.test('all methods apply their SGR codes', () => {
    for (const [method, codes] of Object.entries(CODES)) {
      const expected = `\x1b[${codes}mtest\x1b[0m`;
      assert.strictEqual(concolor[method]('test'), expected, method);
      assert.strictEqual(concolor[method]`test`, expected, method);
    }
  });

  await t.test('all methods return strings', () => {
    METHODS.forEach((method) => {
      const result = concolor[method]('test');
      assert(typeof result === 'string', `${method} should return a string`);
      assert(
        result.includes('test'),
        `${method} should include the input text`,
      );
      assert(result.includes('\x1b[0m'), `${method} should include reset code`);
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
