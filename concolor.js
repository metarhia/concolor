'use strict';

const colors = [
  /* 1 */ 'black',
  /* 2 */ 'red',
  /* 3 */ 'green',
  /* 4 */ 'yellow',
  /* 5 */ 'blue',
  /* 6 */ 'magenta',
  /* 7 */ 'cyan',
  /* 8 */ 'white'
];

const ansi = [
  /* 1 */ 'b', // bold (increased intensity)
  /* 2 */ 'f', // faint (decreased intensity)
  /* 3 */ 'i', // italic
  /* 4 */ 'u', // underline
  /* 5 */ 'l', // blink slow
  /* 6 */ 'h', // blink rapid
  /* 7 */ 'n', // negative
  /* 8 */ 'c', // conceal
  /* 9 */ 's'  // strikethrough
];

const esc = s => '\x1b[' + s + '\x1b[0m';

const stylize = (
  // Create escape sequence from concolor style definition
  styles, // String, comma separated styles
  val // String, value to stylize
) => {
  let style, color, index;
  styles = styles.split(',');
  for (style of styles) {
    if (style.length === 1) {
      const code = ansi.indexOf(style) + 1;
      val = esc(code + 'm' + val);
    } else {
      color = style.split('/');
      index = colors.indexOf(color[0]);
      if (index > -1) {
        val = esc('3' + index + 'm' + val);
      }
      if (colors.length > 1) {
        index = colors.indexOf(color[1]);
        if (index > -1) {
          val = esc('4' + index + 'm' + val);
        }
      }
    }
  }
  return val;
};

const tag = (
  // Create tag function
  styles // String, wrap tag into styles
) => (
  strings, // Array of String
  ...values // Array of String
) => {
  const result = [strings[0]];
  let val, str;
  let i = 1;
  for (val of values) {
    str = strings[i++];
    result.push(val, str);
  }
  return stylize(styles, result.join(''));
};

module.exports = (strings, ...values) => {
  if (typeof(strings) === 'string') {
    return tag(strings);
  }

  const result = [strings[0]];
  let val, str, pos, styles;
  let i = 1;
  for (val of values) {
    str = strings[i++];
    if (str.startsWith('(')) {
      pos = str.indexOf(')');
      styles = str.substring(1, pos);
      val = stylize(styles, val);
      str = str.substring(pos + 1);
      result.push(val, str);
    }
  }

  return result.join('');
};
