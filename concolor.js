'use strict';

const { split, between } = require('metautil');

const COLORS = [
  /* 0 */ 'black',
  /* 1 */ 'red',
  /* 2 */ 'green',
  /* 3 */ 'yellow',
  /* 4 */ 'blue',
  /* 5 */ 'magenta',
  /* 6 */ 'cyan',
  /* 7 */ 'white',
];

const COLOR_INDEX = new Map(COLORS.map((c, i) => [c, i]));

const ANSI = [
  /* 1 */ 'b', // bold (increased intensity)
  /* 2 */ 'f', // faint (decreased intensity)
  /* 3 */ 'i', // italic
  /* 4 */ 'u', // underline
  /* 5 */ 'l', // blink slow
  /* 6 */ 'h', // blink rapid
  /* 7 */ 'n', // negative
  /* 8 */ 'c', // conceal
  /* 9 */ 's', // strikethrough
];

const ANSI_INDEX = new Map(ANSI.map((a, i) => [a, i + 1]));

const esc = (codes, s) => `\x1b[${codes}m${s}\x1b[0m`;

const stylize = (styles, s) => {
  const list = styles.split(',');
  const codes = [];
  for (const style of list) {
    if (style.length === 1) {
      const code = ANSI_INDEX.get(style);
      if (code !== undefined) codes.push(code);
      continue;
    }
    const [foreground, background] = split(style, '/');
    const fgIndex = COLOR_INDEX.get(foreground);
    if (fgIndex !== undefined) codes.push(`3${fgIndex}`);
    if (!background) continue;
    const bgIndex = COLOR_INDEX.get(background);
    if (bgIndex !== undefined) codes.push(`4${bgIndex}`);
  }
  return codes.length > 0 ? esc(codes.join(';'), s) : s;
};

const render = (strings, values, push) => {
  const result = [strings[0]];
  for (let i = 0; i < values.length; i++) {
    push(result, values[i], strings[i + 1]);
  }
  return result.join('');
};

const tag =
  (styles) =>
  (strings, ...values) => {
    if (typeof strings === 'string') {
      return stylize(styles, strings);
    }
    const text = render(strings, values, (result, val, str) => {
      result.push(val, str);
    });
    return stylize(styles, text);
  };

const theme = (tags) => {
  const styles = (strings, ...values) => {
    const result = [strings[0]];
    let i = 1;
    for (const val of values) {
      const str = strings[i++];
      for (const name in val) {
        const style = styles[name];
        const value = val[name];
        const res = style(value);
        result.push(res);
      }
      result.push(str);
    }
    return result.join('');
  };
  for (const name in tags) {
    styles[name] = tag(tags[name]);
  }
  return styles;
};

const concolor = (strings, ...values) => {
  if (typeof strings === 'string') {
    return tag(strings);
  }
  if (!Array.isArray(strings)) {
    return theme(strings);
  }
  return render(strings, values, (result, val, str) => {
    if (!str.startsWith('(') || !str.includes(')')) {
      result.push(val, str);
      return;
    }
    const styleList = between(str, '(', ')');
    const [, rest] = split(str, ')');
    result.push(stylize(styleList, val), rest);
  });
};

concolor.b = concolor('b');
concolor.i = concolor('i');
concolor.u = concolor('u');

concolor.em = concolor('b');

concolor.error = concolor('b,red');
concolor.info = concolor('b,green');
concolor.warn = concolor('b,yellow');
concolor.debug = concolor('b,blue');

concolor.success = concolor.info;
concolor.fail = concolor.error;

concolor.black = concolor('black');
concolor.red = concolor('red');
concolor.green = concolor('green');
concolor.yellow = concolor('yellow');
concolor.blue = concolor('blue');
concolor.magenta = concolor('magenta');
concolor.cyan = concolor('cyan');
concolor.white = concolor('white');

module.exports = concolor;
