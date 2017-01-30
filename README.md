# Concolor
Concolor is a simple library for Node.js for coloring templated strings using tags with annotations

## Usage
- Place tag `color` before templated string to apply coloring on that string

  ```javascript
  console.log(color`Hello ${'World'}(black/green) black on green`);
  ```
  
- Use anotations in brackets after templated string to add bold or underlined style to string or
  to change foreground or background color of a templated string
  
  ```javascript
  console.log(color`Hello ${'World'}(blue) blue`);
  console.log(color`Hello ${'World'}(/red) on red`);
  console.log(color`Hello ${'World'}(white/yellow,b) bold white on yellow`);
  console.log(color`Hello ${'World'}(b) bold`);
  console.log(color`Hello ${'World'}(b,/blue) bold on blue`);
  console.log(color`Hello ${'World'}(b,u,yellow) bold underline yellow`);
  console.log(color`Hello ${'World'}(blue,u) blue underline`);
  console.log(color`Hello ${'World'}(b,black/green) bold black on green`);
  ```

## Examples
```javascript
console.log(color`Client on ${'192.168.1.1'}(black/green) connected to ${'SERVER'}(b,red) at ${new Date().toUTCString()}(b,blue)`);
```