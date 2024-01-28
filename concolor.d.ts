type TagFunctionString = string | TemplateStringsArray | ReadonlyArray<string>;
type TagFunction = (strings: TagFunctionString, ...values: ReadonlyArray<any>) => string;

declare function concolor(strings: string): TagFunction;
declare function concolor(strings: Record<string, string>): TagFunction;
declare function concolor(strings: TemplateStringsArray, ...values: ReadonlyArray<any>): string;
declare namespace concolor {
  export const b: TagFunction;
  export const i: TagFunction;
  export const u: TagFunction;
  export const em: TagFunction;
  export const error: TagFunction;
  export const info: TagFunction;
  export const warn: TagFunction;
  export const debug: TagFunction;
  export const success: TagFunction;
  export const fail: TagFunction;
  export const red: TagFunction;
  export const green: TagFunction;
  export const yellow: TagFunction;
  export const blue: TagFunction;
  export const magenta: TagFunction;
  export const cyan: TagFunction;
  export const white: TagFunction;
}
export = concolor;
