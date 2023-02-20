'use strict';

const COLORS = [
  /* 1 */ 'black',
  /* 2 */ 'red',
  /* 3 */ 'green',
  /* 4 */ 'yellow',
  /* 5 */ 'blue',
  /* 6 */ 'magenta',
  /* 7 */ 'cyan',
  /* 8 */ 'white',
];

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

const esc = (code, s) => `\x1b[${code}m${s}\x1b[0m`;

const stylize = (styles, s) => {
  const list = styles.split(',');
  let result = s;
  for (const style of list) {
    if (style.length === 1) {
      const code = ANSI.indexOf(style) + 1;
      result = esc(code, result);
    } else {
      const [foreground, background] = style.split('/');
      const index = COLORS.indexOf(foreground);
      if (index > -1) result = esc('3' + index.toString(), result);
      if (background) {
        const index = COLORS.indexOf(background);
        if (index > -1) result = esc('4' + index.toString(), result);
      }
    }
  }
  return result;
};

const tag =
  (styles) =>
  (strings, ...values) => {
    if (typeof strings === 'string') {
      return stylize(styles, strings);
    }
    const result = [strings[0]];
    let i = 1;
    for (const val of values) {
      const str = strings[i++];
      result.push(val, str);
    }
    return stylize(styles, result.join(''));
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
  const result = [strings[0]];
  let i = 1;
  for (const val of values) {
    const str = strings[i++];
    if (str.startsWith('(')) {
      const pos = str.indexOf(')');
      const styles = str.substring(1, pos);
      const value = stylize(styles, val);
      const rest = str.substring(pos + 1);
      result.push(value, rest);
    }
  }
  return result.join('');
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

concolor.red = concolor('red');
concolor.green = concolor('green');
concolor.yellow = concolor('yellow');
concolor.blue = concolor('blue');
concolor.magenta = concolor('magenta');
concolor.cyan = concolor('cyan');
concolor.white = concolor('white');

module.exports = concolor;
