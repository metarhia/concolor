'use strict';

module.exports = (strings, ...values) => {

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

  const result = [strings[0]];
  const esc = s => '\x1b[' + s + '\x1b[0m';

  let pos, styles, index, str, color, code;
  values.forEach((val, i) => {
    str = strings[i + 1];
    if (str.startsWith('(')) {
      pos = str.indexOf(')');
      styles = str.substring(1, pos).split(',');
      str = str.substring(pos + 1);
      styles.forEach(style => {
        if (style.length === 1) {
          code = ansi.indexOf(style) + 1;
          val = esc(code + 'm' + val);
        } else {
          color = style.split('/');
          index = colors.indexOf(color[0]);
          if (index > -1) val = esc('3' + index + 'm' + val);
          if (colors.length > 1) {
            index = colors.indexOf(color[1]);
            if (index > -1) val = esc('4' + index + 'm' + val);
          }
        }
      });
      result.push(val, str);
    }
  });

  return result.join('');
};
