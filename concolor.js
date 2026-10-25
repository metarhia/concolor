'use strict';

const { split } = require('metautil');

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

const FG_CODES = new Map(COLORS.map((c, i) => [c, 30 + i]));
const BG_CODES = new Map(COLORS.map((c, i) => [c, 40 + i]));

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

const ANSI_CODES = new Map(ANSI.map((a, i) => [a, i + 1]));

const esc = (codes, s) => `\x1b[${codes}m${s}\x1b[0m`;

const parsed = new Map();

const parse = (styles) => {
  let codes = parsed.get(styles);
  if (codes !== undefined) return codes;
  const list = [];
  for (const style of styles.split(',')) {
    if (style.length === 1) {
      list.push(ANSI_CODES.get(style));
    } else {
      const [foreground, background] = split(style, '/');
      list.push(FG_CODES.get(foreground), BG_CODES.get(background));
    }
  }
  codes = list.filter((code) => code !== undefined).join(';');
  parsed.set(styles, codes);
  return codes;
};

const stylize = (codes, s) => (codes ? esc(codes, s) : s);

const interleave = (result, val, str) => {
  result.push(val, str);
};

const render = (strings, values, push = interleave) => {
  const result = [strings[0]];
  for (let i = 0; i < values.length; i++) {
    push(result, values[i], strings[i + 1]);
  }
  return result.join('');
};

const tag =
  (styles) =>
  (strings, ...values) => {
    const text =
      typeof strings === 'string' ? strings : render(strings, values);
    return stylize(parse(styles), text);
  };

const theme = (tags) => {
  const styles = (strings, ...values) =>
    render(strings, values, (result, val, str) => {
      for (const name in val) result.push(styles[name](val[name]));
      result.push(str);
    });
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
    const end = str.startsWith('(') ? str.indexOf(')') : -1;
    if (end === -1) {
      interleave(result, val, str);
      return;
    }
    const codes = parse(str.slice(1, end));
    result.push(stylize(codes, val), str.slice(end + 1));
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

for (const color of COLORS) concolor[color] = concolor(color);

module.exports = concolor;
