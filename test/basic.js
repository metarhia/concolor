'use strict';

const { test } = require('node:test');
const assert = require('node:assert');

const concolor = require('../concolor.js');

const hasSgrCode = (str, code) => {
  // eslint-disable-next-line no-control-regex -- ANSI escape detection
  const match = str.match(/\x1b\[([\d;]+)m/);
  return match ? match[1].split(';').includes(String(code)) : false;
};

test('basic styling examples', async (t) => {
  await t.test('italic black on green', () => {
    const s = concolor`  Hello ${'World'}(i,black/green) `;
    const result = `${s}italic black on green`;
    assert(typeof result === 'string');
    assert(result.includes('Hello'));
    assert(result.includes('World'));
    assert(result.includes('\x1b[0m'));
    assert(hasSgrCode(result, '3'));
  });

  await t.test('blue color', () => {
    const result = concolor`  Hello ${'World'}(blue) blue`;
    assert(typeof result === 'string');
    assert(result.includes('Hello'));
    assert(result.includes('World'));
    assert(result.includes('\x1b[0m'));
    assert(hasSgrCode(result, '34'));
  });

  await t.test('on red background', () => {
    const result = concolor`  Hello ${'World'}(/red) on red`;
    assert(typeof result === 'string');
    assert(result.includes('Hello'));
    assert(result.includes('World'));
    assert(result.includes('\x1b[0m'));
    assert(hasSgrCode(result, '41'));
  });

  await t.test('bold white on yellow', () => {
    const s = concolor`  Hello ${'World'}(white/yellow,b) `;
    const result = `${s}bold white on yellow`;
    assert(typeof result === 'string');
    assert(result.includes('Hello'));
    assert(result.includes('World'));
    assert(result.includes('\x1b[0m'));
    assert(hasSgrCode(result, '1'));
    assert(hasSgrCode(result, '37'));
    assert(hasSgrCode(result, '43'));
  });

  await t.test('bold italic', () => {
    const result = concolor`  Hello ${'World'}(b,i) bold italic`;
    assert(typeof result === 'string');
    assert(result.includes('Hello'));
    assert(result.includes('World'));
    assert(result.includes('\x1b[0m'));
    assert(hasSgrCode(result, '1'));
    assert(hasSgrCode(result, '3'));
  });

  await t.test('bold on blue background', () => {
    const result = concolor`  Hello ${'World'}(b,/blue) bold on blue`;
    assert(typeof result === 'string');
    assert(result.includes('Hello'));
    assert(result.includes('World'));
    assert(result.includes('\x1b[0m'));
    assert(hasSgrCode(result, '1'));
    assert(hasSgrCode(result, '44'));
  });

  await t.test('bold underline yellow', () => {
    const s = concolor`  Hello ${'World'}(b,u,yellow) `;
    const result = `${s}bold underline yellow`;
    assert(typeof result === 'string');
    assert(result.includes('Hello'));
    assert(result.includes('World'));
    assert(result.includes('\x1b[0m'));
    assert(hasSgrCode(result, '1'));
    assert(hasSgrCode(result, '4'));
    assert(hasSgrCode(result, '33'));
  });

  await t.test('blue underline', () => {
    const result = concolor`  Hello ${'World'}(blue,u) blue underline`;
    assert(typeof result === 'string');
    assert(result.includes('Hello'));
    assert(result.includes('World'));
    assert(result.includes('\x1b[0m'));
    assert(hasSgrCode(result, '34'));
    assert(hasSgrCode(result, '4'));
  });

  await t.test('bold black on green', () => {
    const s = concolor`  Hello ${'World'}(b,black/green) `;
    const result = `${s}bold black on green`;
    assert(typeof result === 'string');
    assert(result.includes('Hello'));
    assert(result.includes('World'));
    assert(result.includes('\x1b[0m'));
    assert(hasSgrCode(result, '1'));
    assert(hasSgrCode(result, '30'));
    assert(hasSgrCode(result, '42'));
  });
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

test('shorthand methods', async (t) => {
  await t.test('style shorthand methods', () => {
    const results = [
      concolor.b('concolor.b'),
      concolor.i('concolor.i'),
      concolor.u('concolor.u'),
      concolor.em('concolor.em'),
    ];

    results.forEach((result) => {
      assert(typeof result === 'string');
      assert(result.includes('\x1b[0m'));
    });
  });

  await t.test('semantic shorthand methods', () => {
    const results = [
      concolor.error('concolor.error'),
      concolor.info('concolor.info'),
      concolor.warn('concolor.warn'),
      concolor.debug('concolor.debug'),
      concolor.success('concolor.success'),
      concolor.fail('concolor.fail'),
    ];

    results.forEach((result) => {
      assert(typeof result === 'string');
      assert(result.includes('\x1b[0m'));
    });
  });

  await t.test('color shorthand methods', () => {
    const results = [
      concolor.black('concolor.black'),
      concolor.red('concolor.red'),
      concolor.green('concolor.green'),
      concolor.yellow('concolor.yellow'),
      concolor.blue('concolor.blue'),
      concolor.white('concolor.white'),
    ];

    results.forEach((result) => {
      assert(typeof result === 'string');
      assert(result.includes('\x1b[0m'));
    });
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
