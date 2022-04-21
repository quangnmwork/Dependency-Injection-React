import { IBinding, IProvider, IToken } from "./Types";

export function createToken<T>(debugName: string): IToken<T> {
  return {
    debugName,
    toString: () => debugName,
  };
}
export function createBinding<T>(
  token: IToken<T>,
  provider: IProvider<T>
): IBinding<T> {
  return { token, provider };
}
