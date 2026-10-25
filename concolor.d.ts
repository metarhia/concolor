type TagFunction = {
  (text: string): string;
  (strings: TemplateStringsArray, ...values: unknown[]): string;
};

type Color =
  'black' | 'red' | 'green' | 'yellow' | 'blue' | 'magenta' | 'cyan' | 'white';

type Shorthand =
  | 'b'
  | 'i'
  | 'u'
  | 'em'
  | 'error'
  | 'info'
  | 'warn'
  | 'debug'
  | 'success'
  | 'fail'
  | Color;

type Theme = Record<string, TagFunction> & {
  (strings: TemplateStringsArray, ...values: unknown[]): string;
};

declare const concolor: Record<Shorthand, TagFunction> & {
  (strings: TemplateStringsArray, ...values: unknown[]): string;
  (styles: string): TagFunction;
  (theme: Record<string, string>): Theme;
};

export = concolor;
