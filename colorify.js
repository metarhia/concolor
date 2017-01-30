'use strict';

const colors = [
  'BLACK', 'RED', 'GREEN', 'YELLOW', 'BLUE', 'MAGENTA', 'CYAN', 'WHITE'
];

const color = (strings, ...values) => {
  const regex = /:([a-z]+)(\(([^())]+)\))?/g;
  const result = [strings[0]];

  let reMatch, style, color, index, esc, str;
  values.forEach((val, i) => {
    str = strings[i + 1];
    while ((reMatch = regex.exec(str)) !== null) {
      style = reMatch[1];
      color = reMatch[3];
      index = colors.indexOf(color);
      if (style === 'b') esc = '1m';
      else if (style === 'u') esc = '4m';
      else if (style === 'fg') esc = '3' + index + 'm';
      else if (style === 'bg') esc = '4' + index + 'm';
      val = '\x1b[' + esc + val + '\x1b[0m';
    }
    result.push(val, str.replace(regex, ''));
  });

  return result.join('');
};

console.log(color`Client on ${'192.168.1.1'}:fg(BLACK):bg(GREEN) connected to ${'SERVER'}:b:fg(RED) at ${new Date().toUTCString()}:b:fg(BLUE)`);
