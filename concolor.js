'use strict';

const concolor = {};
module.exports = concolor;

concolor.color = (strings, ...values) => {
  const colors = [
    'black', 'red', 'green', 'yellow', 'blue', 'magenta', 'cyan', 'white'
  ];
  const result = [strings[0]];
  const esc = s => '\x1b[' + s + '\x1b[0m';

  let pos, styles, index, str, color;
  values.forEach((val, i) => {
    str = strings[i + 1];
    if (str.startsWith('(')) {
      pos = str.indexOf(')');
      styles = str.substring(1, pos).split(',');
      str = str.substring(pos + 1);
      styles.forEach(style => {
        if (style === 'b') val = esc('1m' + val);
        else if (style === 'u') val = esc('4m' + val);
        else {
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
