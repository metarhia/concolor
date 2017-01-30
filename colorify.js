'use strict';

const colors = [
  'BLACK', 'RED', 'GREEN', 'YELLOW', 'BLUE', 'MAGENTA', 'CYAN', 'WHITE'
];

const color = (strings, ...values) => {
  const regex = /:([a-z]+)(\(([^())]+)\))?/g;
  const result = [strings[0]];

  values.forEach((value, i) => {
    let resultValue = value;

    let reMatch, style;
    while ((reMatch = regex.exec(strings[i + 1])) !== null) {
      style = reMatch[1];
      if (style === 'b') { // bold
        resultValue = '\x1b[1m' + resultValue + '\x1b[0m';
      } else if (style === 'u') { // underlined
        resultValue = '\x1b[4m' + resultValue + '\x1b[0m';
      } else if (style === 'fg') { // foreground
        const fgIndex = colors.indexOf(reMatch[3]);
        resultValue = '\x1b[3' + fgIndex + 'm' + resultValue + '\x1b[0m';
      } else if (style === 'bg') { // background
        const bgIndex = colors.indexOf(reMatch[3]);
        resultValue = '\x1b[4' + bgIndex + 'm' + resultValue + '\x1b[0m';
      }
    }
    result.push(resultValue, strings[i + 1].replace(regex, ''));
  });

  return result.join('');
};

console.log(color`Client on ${'192.168.1.1'}:fg(BLACK):bg(GREEN) connected to ${'SERVER'}:b:fg(RED) at ${new Date().toUTCString()}:b:fg(BLUE)`);
