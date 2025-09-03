type TagFunction = (strings: TemplateStringsArray, ...values: unknown[]) => string;

interface Concolor {
  b: TagFunction;
  i: TagFunction;
  u: TagFunction;
  em: TagFunction;
  
  error: TagFunction;
  info: TagFunction;
  warn: TagFunction;
  debug: TagFunction;
  success: TagFunction;
  fail: TagFunction;
  
  black: TagFunction;
  red: TagFunction;
  green: TagFunction;
  yellow: TagFunction;
  blue: TagFunction;
  magenta: TagFunction;
  cyan: TagFunction;
  white: TagFunction;
}

export declare const concolor: Concolor & {
  (strings: TemplateStringsArray, ...values: unknown[]): string;
  (styles: string): TagFunction;
  (theme: Record<string, string>): Record<string, TagFunction>;
  (styles: string, text: string): string;
};
