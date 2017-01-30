'use strict';

const color = (strings, ...values) => {
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

console.log(color`Hello ${'World'}(black/green) black on green`);
console.log(color`Hello ${'World'}(blue) blue`);
console.log(color`Hello ${'World'}(/red) on red`);
console.log(color`Hello ${'World'}(white/yellow,b) bold white on yellow`);
console.log(color`Hello ${'World'}(b) bold`);
console.log(color`Hello ${'World'}(b,/blue) bold on blue`);
console.log(color`Hello ${'World'}(b,u,yellow) bold underline yellow`);
console.log(color`Hello ${'World'}(blue,u) blue underline`);
console.log(color`Hello ${'World'}(b,black/green) bold black on green`);

console.log(color`Client on ${'192.168.1.1'}(black/green) connected to ${'SERVER'}(b,red) at ${new Date().toUTCString()}(b,blue)`);
