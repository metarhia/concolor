'use strict';

let color = (strings, ...values) => {
  const regex = /:([a-z]+)(\(([^())]+)\))?/g;
  let result = [strings[0]];

  values.forEach((value, i) => {
    let resultValue = value;

    let reMatch;
    while ((reMatch = regex.exec(strings[i + 1])) !== null) {
      if (reMatch[1] === 'b') { // bold
        resultValue = '\x1b[1m' + resultValue + '\x1b[0m';
      }
      if (reMatch[1] === 'u') { // underlined
        resultValue = '\x1b[4m' + resultValue + '\x1b[0m';
      }
      if (reMatch[1] === 'fg') { // foreground
        switch (reMatch[3]) {
          case 'BLACK':
            resultValue = '\x1b[30m' + resultValue;
            break;
          case 'RED':
            resultValue = '\x1b[31m' + resultValue;
            break;
          case 'GREEN':
            resultValue = '\x1b[32m' + resultValue;
            break;
          case 'YELLOW':
            resultValue = '\x1b[33m' + resultValue;
            break;
          case 'BLUE':
            resultValue = '\x1b[34m' + resultValue;
            break;
          case 'MAGENTA':
            resultValue = '\x1b[35m' + resultValue;
            break;
          case 'CYAN':
            resultValue = '\x1b[36m' + resultValue;
            break;
          case 'WHITE':
            resultValue = '\x1b[37m' + resultValue;
            break;
        }
        resultValue += '\x1b[0m';
      }
      if (reMatch[1] === 'bg') { // background
        switch (reMatch[3]) {
          case 'BLACK':
            resultValue = '\x1b[40m' + resultValue;
            break;
          case 'RED':
            resultValue = '\x1b[41m' + resultValue;
            break;
          case 'GREEN':
            resultValue = '\x1b[42m' + resultValue;
            break;
          case 'YELLOW':
            resultValue = '\x1b[43m' + resultValue;
            break;
          case 'BLUE':
            resultValue = '\x1b[44m' + resultValue;
            break;
          case 'MAGENTA':
            resultValue = '\x1b[45m' + resultValue;
            break;
          case 'CYAN':
            resultValue = '\x1b[46m' + resultValue;
            break;
          case 'WHITE':
            resultValue = '\x1b[47m' + resultValue;
            break;
        }
        resultValue += '\x1b[0m';
      }
    }
    result.push(resultValue, strings[i + 1].replace(regex, ''));
  });

  return result.join('');
}

console.log(color`Client on ${`192.168.1.1`}:fg(BLACK):bg(GREEN) connected to ${'SERVER'}:b:fg(RED) at ${new Date().toUTCString()}:b:fg(BLUE)`);
