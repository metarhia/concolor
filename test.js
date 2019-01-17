'use strict';

const concolor = require('./concolor.js');

console.log('Examples:\n');

console.log(concolor`  Hello ${'World'}(i,black/green) black on green`);
console.log(concolor`  Hello ${'World'}(blue) blue`);
console.log(concolor`  Hello ${'World'}(/red) on red`);
console.log(concolor`  Hello ${'World'}(white/yellow,b) bold white on yellow`);
console.log(concolor`  Hello ${'World'}(b,i) bold italic`);
console.log(concolor`  Hello ${'World'}(b,/blue) bold on blue`);
console.log(concolor`  Hello ${'World'}(b,u,yellow) bold underline yellow`);
console.log(concolor`  Hello ${'World'}(blue,u) blue underline`);
console.log(concolor`  Hello ${'World'}(b,black/green) bold black on green`);

console.log('\nStyle examples:');

console.log(concolor`
  ${'b for bold'}(b),
  ${'f for faint'}(f),
  ${'i for italic'}(i),
  ${'u for underline'}(u),
  ${'l for blink slow'}(l),
  ${'h for blink rapid'}(h),
  ${'n for negative'}(n)
  ${'s for strikethrough'}(s)`);

console.log('\nComplex examples:');

console.log(concolor`
  Client on ${'192.168.1.1'}(black/white)
  connected to ${'SERVER'}(n,b,red)
  at ${new Date().toUTCString()}(i,b,blue)
  and variable with no style: ${'abc'}
`);

console.log('\nCreate semantic template tags:\n');

const warn = concolor('b,yellow');
const err = concolor('b,yellow/red');
const inf = concolor('i,white');

console.log('  ' + warn`test1 ${'text2'} text3`);
console.log('  ' + err`test4 ${'text5'} text6`);
console.log('  ' + inf`test7 ${'text8'} text9`);

console.log('\nUse tag as a funtion:\n');

console.log('  ' + warn(`test1 ${'text2'} text3`));
console.log('  ' + err(`test4 ${'text5'} text6`));
console.log('  ' + inf(`test7 ${'text8'} text9`));

console.log('\nShorthand:\n');

console.log('  ' + concolor.b('concolor.b'));
console.log('  ' + concolor.i('concolor.i'));
console.log('  ' + concolor.u('concolor.u'));

console.log('  ' + concolor.em('concolor.em'));

console.log('  ' + concolor.error('concolor.error'));
console.log('  ' + concolor.info('concolor.info'));
console.log('  ' + concolor.warn('concolor.warn'));
console.log('  ' + concolor.debug('concolor.debug'));

console.log('  ' + concolor.success('concolor.success'));
console.log('  ' + concolor.fail('concolor.fail'));

console.log('  ' + concolor.red('concolor.red'));
console.log('  ' + concolor.green('concolor.green'));
console.log('  ' + concolor.yellow('concolor.yellow'));
console.log('  ' + concolor.blue('concolor.blue'));
console.log('  ' + concolor.white('concolor.white'));

console.log('\nThemes:\n');

const theme = concolor({
  caption: 'b,white',
  text: 'green',
  link: 'u,yellow',
});

const caption = 'Caption';
const text = 'Here is a text';
const link = 'http://metarhia.com';

console.log(theme`  ${{ caption }}
  ${{ text }}
  ${{ link }}`);

console.log('\nThemes as functions:\n');

console.log('  ' + theme.caption('Caption example'));

console.log('\nPassed\n');
