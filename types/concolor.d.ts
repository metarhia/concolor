type Strings = string | Array<string>;
type TagFuction = (strings: Strings, ...values: Array<any>) => string;

interface Concolor {
  b: TagFuction;
  i: TagFuction;
  u: TagFuction;
  em: TagFuction;
  error: TagFuction;
  info: TagFuction;
  warn: TagFuction;
  debug: TagFuction;
  succes: TagFuction;
  fail: TagFuction;
  red: TagFuction;
  green: TagFuction;
  yellow: TagFuction;
  blue: TagFuction;
  magenta: TagFuction;
  cyan: TagFuction;
  white: TagFuction;
}

export const concolor: TagFuction | Concolor;

